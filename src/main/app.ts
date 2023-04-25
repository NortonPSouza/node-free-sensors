import express, {Express, Request, Response} from "express";
import cors from "cors";
import morgan from "morgan";

import {Routes} from "../routes/";

export  class Application {

    private app: Express;
    private routes = new Routes();
    private readonly PORT = 3000;


    constructor(){
        this.app = express();
        //
        this.setupConfig();
        this.setupRoutes();
        this.initServer();
    }

    private setupConfig(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded());
        this.app.use(cors({origin: "*"}));
        this.app.use(morgan("dev"));
    }

    private setupRoutes(): void {
        this.app.get("/", (req: Request, res:Response) => res.status(204).send());
        this.app.get("/health", (req: Request, res:Response) => res.status(204).send("OK"));
        this.app.use("/api/v1", this.routes.getRouter());
    }

    private initServer(): void {
        this.app.listen(this.PORT, () => {
            console.log(`⚡️[server]: is running at http://localhost:${this.PORT}/api/v1`);
        });
    }
}