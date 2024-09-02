import type { NextApiRequest, NextApiResponse } from "next";
import * as jose from "jose";
import { CredentialResponse } from "@react-oauth/google";

export type LoginResponseData = {
  error?: string;
  user?: {
    name: string;
  };
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponseData>
) {
  const credentialResponse = req.body as CredentialResponse;
  console.log(req.body);
  if (!credentialResponse) {
    res.status(400).json({ error: "Credential is required." });
  }

  const jwt = jose.decodeJwt(credentialResponse.credential);

  res.status(200).json({
    user: {
      name: jwt.name as string,
    },
  });
}
