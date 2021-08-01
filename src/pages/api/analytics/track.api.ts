import Redis from "ioredis";
import { NextApiRequest, NextApiResponse } from "next";
import { maybeFail } from "utils";

// == Types ================================================================

type TEventsData =
  | { event: "click"; meta: { count: string }; timestamp: string }
  | { event: "login"; meta: { userId: string }; timestamp: string };

// == Constants ============================================================

const client = new Redis(process.env.REDIS_URL);

const SUCCESS_PROBABILITY = 0.8;

// == Functions ============================================================

async function saveClickEvent({ event, meta, timestamp }: TEventsData) {
  try {
    if (event !== "click" || !("count" in meta) || !timestamp) throw new Error("Invalid click event data");
    const count = parseFloat(meta.count);
    if (typeof count !== "number") throw new Error("Invalid click event count");

    await client.zadd("analytics:clicks", count, `${timestamp.substring(0, 16)}`);
  } catch (error) {
    console.error("Error saving click event", error);
  }
}

// == Request ==============================================================

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const eventData = JSON.parse(req.body) as TEventsData;
    const { timestamp, event } = eventData;
    const saveEvent = async () => {
      if (typeof timestamp !== "string" || !Date.parse(timestamp)) throw new Error("Invalid timestamp");

      switch (event) {
        case "click":
          await saveClickEvent(eventData);
          break;
        default:
          throw new Error("Invalid analytics event name");
      }
    };
    await maybeFail(saveEvent, SUCCESS_PROBABILITY);
    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  } finally {
    // await client.quit();
  }
};
