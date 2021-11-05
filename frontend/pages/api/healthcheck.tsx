import type { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json({
    status: "healthy",
    timestamp: Date.now(),
    uptime: process.uptime(),
  });
};
