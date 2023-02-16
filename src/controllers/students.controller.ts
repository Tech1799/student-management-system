import { Request, Response } from "express";
import Students from "../models/Students";
import db from "../db/connection";
import { QueryTypes } from "sequelize";

export const createStudent = async (req: Request, res: Response) => {
  try {
    const raw: string = `
      INSERT INTO students (name, address, ispresent, "createdAt")
      VALUES (:name, :address, :ispresent, now())
    `;
    const data = await db.query(raw, {
      replacements: {
        name: req.body.name,
        address: req.body.address,
        ispresent: req.body.ispresent,
      },
      type: QueryTypes.INSERT,
    });
    res.send({
      message: "new entry created!",
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || "some error occured while creating the student.",
    });
  }
};

export const findAllStudents = async (req: Request, res: Response) => {
  try {
    const raw = "SELECT * FROM students";
    const data = await db.query(raw, {
      type: QueryTypes.SELECT,
    });
    res.send(data);
  } catch (err: any) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving students.",
    });
  }
};

export const findOneStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const raw = "SELECT * FROM students where id=:id";
    await db
      .query(raw, {
        replacements: { id },
        type: QueryTypes.SELECT,
      })
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).json({
            message: `Cannot find student with id = ${id}`,
          });
        }
      });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || "something went wrong",
    });
  }
};

export const updateById = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const name: string = req.body.name;
    const address: string = req.body.address;
    const ispresent: string = req.body.ispresent;
    const raw: string = `
      UPDATE students
      SET name = :name, address = :address,
      ispresent = ${ispresent}, "updatedAt" = now()
      WHERE id = :id
    `;
    await db.query(raw, {
      replacements: { id, name, address },
      type: QueryTypes.UPDATE,
    });
    res.send("updated successfully!");
  } catch (err: any) {
    res.status(500).json({
      message: err.message || "Something went wrong!",
    });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const raw: string = `
      
    `;
    await db.query(raw, {
      replacements: { id },
      type: QueryTypes.DELETE,
    });
    res.json({
      message: `deleted entity of id = ${id}`,
    });
  } catch (err: any) {
    res.status(500).send({
      message: err.message || "something went wrong!",
    });
  }
};
