// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IUserResponse } from "@/interfaces/user";
import { UserClient } from "@/service/user/userClient";
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUserResponse>
) {
  if (req.method === "POST") {
    const postLogin = async () => {
      const response = await UserClient.login(req.body);
      const accessToken = response?.data?.accessToken;
      const accessTokenCookie = serialize("accessToken", accessToken!, {
        path:"/",
        maxAge: 60*60*24
      });
      
      if (!response?.error) {
        res.setHeader("Set-Cookie", accessTokenCookie);
        res.status(200).json({
          message:"Login Success",  
          error: response?.error,
          data: response?.data
        })
      } else {
        res.status(400).json({
          message: response?.message,
          error: response?.error,
          data: response?.data,
        });
      }
    };

    postLogin();

  } else {
    res.status(405).json({
      message: `Method ${req.method} Not Allowed`,
      error: true,
      data: null,
    });
  }
}
