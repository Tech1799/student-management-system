import express, { Application } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";

// importing middleware
import errorMiddleware from "./middlewares/error.middleware";

// importing routers
import studentRouter from "./routers/students.router";
import subjectRouter from "./routers/subjects.router";
import StudentSubjects from "./routers/studentSubjects.router";
import usersRouter from "./routers/users.router";

class App {
  public express: Application;
  public port: number;

  constructor(port: number) {
    this.express = express();
    this.port = port;
    this.initialiseMiddleware();
    this.initialiseRouters();
    this.initialiseErrorHandling();
    dotenv.config({ path: "../.env" });
  }
  private initialiseMiddleware(): void {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(cookieParser());
    this.express.use(morgan("dev"));
  }
  public initialiseRouters(): void {
    this.express.use("/api", studentRouter);
    this.express.use("/api", subjectRouter);
    this.express.use("/api", StudentSubjects);
    this.express.use("/api", usersRouter);
  }
  private initialiseErrorHandling(): void {
    this.express.use(errorMiddleware);
  }
  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`Express server is running on port ${this.port}`);
    });
  }
}

export default App;
