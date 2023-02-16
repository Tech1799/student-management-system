import { NextFunction, Request, Response } from "express";
import { QueryTypes } from "sequelize";
import { hash, genSalt, compare } from "bcrypt";
import db from "../db/connection";
// import Users from "../models/Users";
import HttpException from "../utils/exceptions/http.exception";
import { generateToken } from "../middlewares/auth.middleware";
import { verify } from "jsonwebtoken";

// controller for some request-response testing
export const testController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const jwt_token = generateToken({});
    const verify_token = verify(jwt_token, "this_is_a_secret");
    res.json({
      token: jwt_token,
      token_verification_status: verify_token,
    });
  } catch (err: any) {
    next(new HttpException(400, err.message));
  }
};

// ------- create a role ---------
export const createRole = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const raw: string = `
      INSERT INTO roles (name)
      VALUES (:role_name)
    `;
    await db.query(raw, {
      replacements: {
        role_name: req.body.roleName,
      },
      type: QueryTypes.INSERT,
    });
    res.send({
      message: "role successfully created",
    });
  } catch (err: any) {
    next(new HttpException(500, err.message));
  }
};

// ------- user sign up --------
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const raw: string = `
      INSERT INTO users (username, email, password, role_id, "createdAt")
      VALUES (:username, :email, :password, :roleId, now())
    `;
    const salt = await genSalt();
    const hashedPass = await hash(req.body.password, salt);
    await db.query(raw, {
      replacements: {
        username: req.body.username,
        email: req.body.email,
        password: hashedPass,
        roleId: req.body.roleId,
      },
      type: QueryTypes.INSERT,
    });
    res.send({
      message: "user sign up successfully.",
    });
  } catch (err: any) {
    next(new HttpException(500, err.message));
  }
};

// ------ login user ------
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const raw = `
      SELECT users.username,
      users.email, users.password,
      roles.name as roles
      FROM users
      left outer join roles
      on users.role_id = roles.id
      and
      email=:email
    `;
    const data: any = await db.query(raw, {
      replacements: {
        email: req.body.email,
      },
      type: QueryTypes.SELECT,
    });
    const checkPass = await compare(req.body.password, data[0].password);
    if (checkPass) {
      const token = generateToken(data[0]);
      res.send({
        message: "user login successfully!",
        token,
      });
    } else {
      throw new Error("password incorrect.");
    }
  } catch (err: any) {
    next(new HttpException(500, err.message));
  }
};
