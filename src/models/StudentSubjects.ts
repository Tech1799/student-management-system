import { DataTypes } from "sequelize";
import Students from "./Students";
import Subjects from "./Subjects";
import db from "../db/connection";

//intermediate relationships or junction table
const StudentSubjects = db.define(
  "student_subjects",
  {
    student_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Students,
        key: "id",
      },
    },
    subject_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Subjects,
        key: "id",
      },
    },
    score: {
      type: DataTypes.INTEGER,
    },
    remarks: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

// hasOne() and belongsTo() are Sequelize association methods that enable you to create a relation between two Sequelize models.

Students.belongsToMany(Subjects, { through: StudentSubjects });
Subjects.belongsToMany(Students, { through: StudentSubjects });

export default StudentSubjects;
