import { Request, Response } from "express";
import db from "../db/connection";
import { QueryTypes } from "sequelize";

export const studSubLink = async (req: Request, res: Response) => {
  try {
    const student_id: string = req.body.student_id;
    const subject_id: string = req.body.subject_id;
    const score: string = req.body.score;
    const remarks: string = req.body.remarks;
    const raw = `
      INSERT INTO student_subjects (student_id, subject_id, score, remarks)
      VALUES (:student_id, :subject_id, :score, :remarks)
    `;
    await db.query(raw, {
      replacements: { student_id, subject_id, score, remarks },
      type: QueryTypes.INSERT,
    });
    res.send("student_subjects link created successfully!");
  } catch (err: any) {
    res.status(500).json({
      message: err.message || "something went wrong!",
    });
  }
};

export const studOfSub = async (req: Request, res: Response) => {
  try {
    const subject_id = req.body.subject_id;
    const filteredData: any = [];
    const raw: string = `
      SELECT students.id as stud_id,
      students.name,
      subjects.id as sub_id,
      subjects.sub_name,
      student_subjects.score,
      student_subjects.remarks
      from students
      left outer join student_subjects
      on students.id = student_subjects.student_id
      and
      student_subjects.subject_id = :subject_id
      left outer join subjects
      on student_subjects.subject_id = subjects.id      
    `;
    await db
      .query(raw, {
        replacements: { subject_id },
        type: QueryTypes.SELECT,
      })
      .then((data) => {
        data.forEach((obj: any) => {
          if (obj.sub_id) {
            filteredData.push(obj);
          }
        });
        res.send(filteredData);
      });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || "something went wrong!",
    });
  }
};

export const subOfStud = async (req: Request, res: Response) => {
  try {
    const student_id = req.body.student_id;
    const filteredData: any = [];
    const raw: string = `
      SELECT students.id as stud_id,
      students.name,
      subjects.id as sub_id,
      subjects.sub_name,
      student_subjects.score,
      student_subjects.remarks
      from students
      left outer join student_subjects
      on student_subjects.student_id = students.id
      and
      student_subjects.student_id = :student_id
      left outer join subjects
      on subjects.id = student_subjects.subject_id
    `;
    await db
      .query(raw, {
        replacements: { student_id },
        type: QueryTypes.SELECT,
      })
      .then((data: any) => {
        data.forEach((obj: any) => {
          if (obj.sub_id) {
            filteredData.push(obj);
          }
        });
        res.send(filteredData);
      });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || "something went wrong!",
    });
  }
};
