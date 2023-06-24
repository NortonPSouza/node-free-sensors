import express, {Express, NextFunction, Request, Response} from "express";
import cors from "cors";
import morgan from "morgan";

import {Routes} from "../routes/";
import Database from "../../connections/database";
import {NewRequest} from "~@Types/index";

export class Application {
    private app: Express;
    private database = new Database();
    private routes = new Routes();
    private readonly PORT = 3000;


    constructor() {
        this.app = express();
        //
        this.setupConfig();
        this.setupDatabase();
        this.setupRoutes();
        this.initServer();
    }

    private useDataSource(req: NewRequest, res: Response, next: NextFunction): void {
        req.dataSource = this.database.connection;
        next();
    }

    private setupConfig(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors({origin: "*"}));
        this.app.use(morgan("dev"));
        this.app.use(this.useDataSource.bind(this));
    }

    private setupRoutes(): void {
        this.app.get("/", (req: Request, res: Response) => res.status(204).send());
        this.app.get("/health", (req: Request, res: Response) => res.status(204).send("OK"));
        this.app.use("/api/v1", this.routes.getRouter());
    }

    private initServer(): void {
        this.app.listen(this.PORT, () => {
            console.log(`⚡️[server]: is running at http://localhost:${this.PORT}/api/v1`);
        });
    }

    private setupDatabase(): void {
        this.database.initConnection()
            .then(() => {
                console.log("⚡️[database]: has been initialized!");
            });
    }
}