import { DataTypes } from "sequelize";
import db from "../db/connection";
import Users from "./Users";
// import Subjects from "./Subjects";
// import StudentSubjects from "./StudentSubjects";

const Students = db.define(
  "students",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    ispresent: {
      type: DataTypes.BOOLEAN,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: "id",
      },
    },
  },
  {
    tableName: "students",
    timestamps: true,
  }
);

// Students.belongsToMany(Subjects, { through: StudentSubjects });

export default Students;
