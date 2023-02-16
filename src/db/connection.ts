import { Sequelize } from "sequelize";

const config = {
  host: "localhost",
  user: "me",
  password: "password",
  db: "pgcrud1",
};

const db = new Sequelize(config.db, config.user, config.password, {
  host: config.host,
  dialect: "postgres",
});

// const db: any = {};
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;
// import Students from "../models/Students";
// import Subjects from "../models/Subjects";
// import StudentSubjects from "../models/StudentSubjects";
// db.students = Students;
// db.subjects = Subjects;
// db.studentSubjects = StudentSubjects;

export default db;
