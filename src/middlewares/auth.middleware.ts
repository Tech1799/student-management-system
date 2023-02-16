import { Request, Response, NextFunction } from "express";
import { sign, SignOptions, verify, VerifyOptions } from "jsonwebtoken";

export function generateToken(userObject: any) {
  const payload = {
    name: userObject.username,
    userId: userObject.id,
    roles: userObject.roles_id,
  };
  const secret: any = "this_is_a_secret";
  const signInOptions: SignOptions = {
    algorithm: "HS256",
    expiresIn: "1h",
  };
  return sign(payload, secret, signInOptions);
}

// interface TokenPayload {
//   name: string;
//   userId: number;
//   roles: string;
//   iat: number;
//   exp: number;
// }

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.auth_token;
  verify(token, "this_is_a_secret");
}
