// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IUserResponse } from "@/interfaces/user";
import { UserClient } from "@/service/user/userClient";
import type { NextApiRequest, NextApiResponse } from "next";

//data untuk ngeresponse
export type Data = {
  message?: string;
  error?: boolean;
  data?: undefined;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUserResponse>
) {
  if (req.method === "POST") {
    const postSignUp = async () => {
      const response = await UserClient.postSignUp(req.body);
      if (!response?.error) {
        res.status(201).json({
          message: response?.message,
          error: response?.error,
          data: response?.data,
        });
      } else {
        res.status(400).json({
          message: response?.message,
          error: response?.error,
          data: response?.data,
        });
      }
    };
    postSignUp();
  }
}
