import {NewRequest} from "~@Types/index";
import {UserServices} from "~@Services/user"
import {Response} from "express";

export class UserController {
    public static register(req: NewRequest, res: Response): void {
        UserServices.register(req, res)
            .then(({status_code, result}) => res.status(status_code).send(result))
            .catch(({status_code, result}) => res.status(status_code).send({error: result}));
    }
}