import type { NextApiRequest, NextApiResponse } from "next";
import * as jose from "jose";

type ResponseData = {
  error?: string;
  user?: {
    name: string;
  };
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const credential = req.body.credential;
  if (!credential) {
    res.status(400).json({ error: "Credential is required." });
  }

  const jwt = jose.decodeJwt(credential);

  res.status(200).json({
    user: {
      name: jwt.name as string,
    },
  });
}
