import Redis from "ioredis";
import { NextApiRequest, NextApiResponse } from "next";
import { ISavedClickRecord } from "./write.api";

// == Types ================================================================

// == Constants ============================================================

const client = new Redis(process.env.REDIS_URL);

// == Functions ============================================================

function parseTimestampParam(param: string | string[]): Date {
  if (typeof param !== "string") return new Date();

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

    const clickEvents = await client.zrangebylex("games:clicks", `[${timestamp.getTime()}`, "+");
    const formattedClickEvents = [];
    const totalClicks: Record<string, number> = { total: 0 };
    for (const clickEvent of clickEvents) {
      try {
        const [eventTime, json] = clickEvent.split("::");
        const { count, user } = JSON.parse(json) as Partial<ISavedClickRecord>;
        if (user?.id) {
          totalClicks[user.id] ||= 0;
          totalClicks[user.id] += count ?? 0;
        }
        totalClicks.total += count ?? 0;
        formattedClickEvents.push({
          user,
          count,
          timestamp: eventTime,
        });
      } catch (error) {
        console.warn(error);
      }
    }

    res.status(200).json({
      timestamp,
      totalClicks,
      formattedClickEvents,
    });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  } finally {
    // await client.quit();
  }
};
