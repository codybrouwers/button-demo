import Redis from "ioredis";
import { NextApiRequest, NextApiResponse } from "next";
import { IS_DEVELOPMENT } from "config";
import { maybeFail } from "utils";

// == Types ================================================================

export type TEventsData =
  | {
      event: "clicks";
      timestamp: string;
      meta: { data: Record<string, number>; user: IUser };
    }
  // Example events
  | { event: "join"; timestamp: string; meta: { user: IUser } };

export interface ISavedClickRecord {
  count: number;
  user: IUser;
}

// == Constants ============================================================

const client = new Redis(process.env.REDIS_URL);

const SUCCESS_PROBABILITY = IS_DEVELOPMENT ? 1 : 0.8;

// == Functions ============================================================

async function saveClickEvents({ event, meta }: TEventsData) {
  try {
    if (event !== "clicks" || !("data" in meta)) throw new Error("Invalid clicks event data");

    const { data, user } = meta;
    const entries = Object.entries(data);
    // Batch calls to Upstash
    const pipeline = client.pipeline();
    for (const [timestamp, count] of entries) {
      pipeline.hincrby("games:total-clicks", timestamp, count);
      const clickEvent: ISavedClickRecord = { count, user };
      pipeline.zadd("games:clicks", 0, `${timestamp}::${JSON.stringify(clickEvent)}`);
    }
    await pipeline.exec();
  } catch (error) {
    console.error("Error saving click event", error);
  }
}

// == Request ==============================================================

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const eventData = JSON.parse(req.body) as TEventsData;
    const { timestamp, event } = eventData;
    await maybeFail(async () => {
      if (typeof timestamp !== "string" || !Date.parse(timestamp)) throw new Error("Invalid timestamp");

      switch (event) {
        case "clicks":
          await saveClickEvents(eventData);
          break;
        default:
          throw new Error("Invalid event name");
      }
    }, SUCCESS_PROBABILITY);
    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  } finally {
    // await client.quit();
  }
};
