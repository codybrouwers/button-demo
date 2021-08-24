import Redis from "ioredis";
import { NextApiRequest, NextApiResponse } from "next";
import { getPastDate } from "@utils";
import { ISavedClickRecord } from "./write.api";

// == Types ================================================================

export interface IReadResponse {
  timestamp: string;
  totalClicks: ITotalClicks;
}

interface ITotalClicks {
  total: number;
  [id: string]: number;
}

// == Constants ============================================================

const client = new Redis(process.env.REDIS_URL);

// == Functions ============================================================

function parseTimestampParam(param: string | string[]): Date {
  // Default to 10 minutes ago
  if (typeof param !== "string") return getPastDate({ interval: "minutes", duration: 10 });

  const timestampNumber = Date.parse(param);
  if (Number.isNaN(timestampNumber)) {
    return new Date(parseInt(param, 10));
  }
  return new Date(timestampNumber);
}

// == Request ==============================================================

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const timestampParam = req.query.timestamp;
    const timestamp = parseTimestampParam(timestampParam);

    const clickEventsResponse = await client.zrangebylex("games:clicks", `[${timestamp.getTime()}`, "+");
    const totalClicks: ITotalClicks = { total: 0 };
    for (const clickEvent of clickEventsResponse) {
      try {
        const [, json] = clickEvent.split("::");
        const { count, user } = JSON.parse(json) as Partial<ISavedClickRecord>;
        if (user?.id && count) {
          totalClicks[user.id] ||= 0;
          totalClicks[user.id] += count ?? 0;

          totalClicks.total += count ?? 0;
        }
      } catch (error) {
        console.warn(error);
      }
    }

    const response: IReadResponse = {
      timestamp: timestamp.toISOString(),
      totalClicks,
    };
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  } finally {
    // await client.quit();
  }
};
