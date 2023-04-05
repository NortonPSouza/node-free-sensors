import express, {Router} from "express";
import {Buttons} from "../controller/buttons";

export class Routes{

    private router = express.Router();

    constructor() {
        this.redisRoutes();
    }

    public getRouter(): Router{
        return this.router;
    }
    public redisRoutes(): void {
        this.router
            .get("/buttons", Buttons.get)
            .delete("/buttons/:device/:button", Buttons.deleteButton)
    }
}