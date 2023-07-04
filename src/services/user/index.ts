import {Response} from "express";

import {UserValidate} from "~@Validate/user"
import {NewRequest, ResponseOperation} from "~@Types/index";
import {UserStorage} from "./storage";

export class UserServices {

    public static register(req: NewRequest, res: Response): Promise<ResponseOperation> {
        const {name, email, password, house_name} = req.body;


        const fields = {
            isName: UserValidate.isName(name, 6),
            isEmail: UserValidate.isEmail(email),
            isPassword: UserValidate.isPassword(password),
            isHouseName: UserValidate.isName(house_name,4)
        }

        return new Promise((resolve, reject) => {
            for (const key in fields) {
                if (!fields[key].status) {
                    return reject({ status_code: 400, result: fields[key].message });
                }
            }
            UserStorage.register(req.dataSource, {name, email, password, house_name})
                .then(({status_code, result}) => resolve({status_code, result}))
                .catch(({status_code, result}) => reject({status_code, result}))
        })
    }
}