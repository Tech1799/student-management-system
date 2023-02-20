import { Request, Response, NextFunction } from "express";
import { sign, SignOptions, verify, VerifyOptions } from "jsonwebtoken";
import db from "../db/connection";
import { QueryTypes } from "sequelize";

const secret: string = "this_is_a_secret";
export function generateToken(userObject: any) {
  const payload = {
    name: userObject.username,
    userId: userObject.id,
    roles: userObject.roles_id,
  };
  // const secret: any = "this_is_a_secret";
  const signInOptions: SignOptions = {
    algorithm: "HS256",
    expiresIn: "1h",
  };
  return sign(payload, secret, signInOptions);
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.auth_token;
  if (token) {
    verify(token, secret, (err: any, decodedToken: any) => {
      if (err) {
        console.log(err.message);
        res.status(400).json({
          message: err.message,
          custom: "something wrong with user credentials!",
        });
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(400).send({
      message: "something wrong with token!",
    });
  }
}

// interface TokenPayload {
//   name: string;
//   userId: number;
//   roles: string;
//   iat: number;
//   exp: number;
// }

export function checkUser(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.auth_token;
  if (token) {
    verify(token, secret, async (err: any, decodedToken: any) => {
      if (err) {
        res.locals.null;
        next();
      } else {
        const raw = `
          select users.username, users.email,
          users.password, roles.name as roles
          from users
          left outer join roles
          on users.role_id = roles.id
          and
          users.id=:userId
        `;
        const user = await db.query(raw, {
          replacements: {
            userId: decodedToken.userId,
          },
          type: QueryTypes.SELECT,
        });
        console.log("yeah baby! check user is working!!");
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    console.log("still working though!");
    next();
  }
}
