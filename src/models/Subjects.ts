import { DataTypes, Sequelize, Model } from "sequelize";
import db from "../db/connection";
// import Students from "./Students";
// import StudentSubjects from "./StudentSubjects";

class Subjects extends Model {}

Subjects.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    sub_name: {
      type: DataTypes.STRING,
    },
    cred_hours: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db,
    modelName: "subjects",
    timestamps: true,
  }
);

// Subjects.belongsToMany(Students, { through: StudentSubjects });

export default Subjects;
