import { DataTypes } from "sequelize";
import db from "../db/connection";

const Roles = db.define(
  "roles",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    tableName: "roles",
    timestamps: false,
  }
);

export default Roles;
