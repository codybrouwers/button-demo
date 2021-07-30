import Redis from "ioredis";
import { NextApiRequest, NextApiResponse } from "next";

// == Types ================================================================

// == Constants ============================================================

const client = new Redis(process.env.REDIS_URL);

// == Functions ============================================================

// == Request ==============================================================

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await client.set(new Date().toString(), 1);
    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  } finally {
    // await client.quit();
  }
};
