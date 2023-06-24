import {Response} from "express";

import {UserValidate} from "~@Validate/user"
import {NewRequest, ResponseOperation} from "~@Types/index";
import {UserStorage} from "./storage";

export class UserServices {

    public static register(req: NewRequest, res: Response): Promise<ResponseOperation> {
        const {name, email, password, house_name} = req.body;

        const fields = {
            isName: UserValidate.isName(name),
            isEmail: UserValidate.isEmail(email),
            isPassword: UserValidate.isPassword(password),
            isHouseName: UserValidate.isName(house_name)
        }

        return new Promise((resolve, reject) => {
            for (const key in fields) {
                if (!fields[key].status) {
                    return reject(fields[key].message);
                }
            }
            UserStorage.register(req.dataSource, {name, email, password, house_name})
                .then(({status_code, result}) => resolve({status_code, result}))
                .catch(({status_code, result}) => reject({status_code, result}))
        })
    }
}