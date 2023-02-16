import { Request, Response } from "express";
import Subjects from "../models/Subjects";

export const createSubject = async (req: Request, res: Response) => {
  try {
    if (!req.body.sub_name) {
      res.status(400).json({
        message: "input field is empty!",
      });
      return;
    }
    const subject = {
      sub_name: req.body.sub_name,
      cred_hours: req.body.cred_hours,
    };
    await Subjects.create(subject).then((data) => res.send(data));
  } catch (err: any) {
    res.status(500).json({
      message: err.message || "some error occured while creating the subject.",
    });
  }
};

export const findAllSubjects = async (req: Request, res: Response) => {
  try {
    const subjects = await Subjects.findAll();
    res.send(subjects);
  } catch (err: any) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving subject.",
    });
  }
};

export const findOneSubject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Subjects.findByPk(id).then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).json({
          message: `Cannot find subject with id = ${id}`,
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
    const id = req.params.id;
    await Subjects.update(req.body, {
      where: { id: id },
    }).then((num) => {
      // @ts-ignore
      if (num == 1) {
        res.json({
          message: "Subject was updated successfully.",
        });
      } else {
        res.json({
          message: `Cannot update Subject with id=${id}. Maybe Subject was not found or req.body is empty.`,
        });
      }
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || "Something went wrong!",
    });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Subjects.destroy({
      where: { id: id },
    }).then((num) => {
      if (num == 1) {
        res.json({
          message: "Subject was deleted successfully!",
        });
      } else {
        res.json({
          message: `Cannot delete Subject with id=${id}. Subject was not found!`,
        });
      }
    });
  } catch (err: any) {
    res.status(500).send({
      message: err.message || "something went wrong!",
    });
  }
};
