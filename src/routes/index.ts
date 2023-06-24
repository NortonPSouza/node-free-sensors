import express, {Router} from "express";
import {Buttons} from "~@Controller/buttons";
import {UserController} from "~@Controller/user";

export class Routes{

    private router = express.Router();

    constructor() {
        this.redisRoutes();
        this.userRoutes();
    }

    public getRouter(): Router{
        return this.router;
    }
    public redisRoutes(): void {
        this.router
            .get("/buttons", Buttons.get)
            .delete("/buttons/:device/:button", Buttons.deleteButton)
    }

    public userRoutes(): void {
        this.router
            .post("/user",UserController.register)
    }
}