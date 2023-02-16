import { DataTypes } from "sequelize";
import db from "../db/connection";
import Roles from "./Roles";

const Users = db.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    role_id: {
      type: DataTypes.STRING,
      references: {
        model: Roles,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);

export default Users;
