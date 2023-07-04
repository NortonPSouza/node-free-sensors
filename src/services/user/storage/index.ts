import {User} from "~@Entity/user";
import {Login} from "~@Entity/login"
import {DataSource} from "typeorm";
import {ResponseOperation} from "~@Types/index";

type registerFieldsProps = {
    name: string
    house_name: string
    email: string
    password: string
}

export class UserStorage {
    public static async register(dataSource: DataSource, registerFields: registerFieldsProps): Promise<ResponseOperation> {
        const user = new User();
        const login = new Login();

        const userRepository = dataSource.getRepository(User);
        const loginRepository = dataSource.getRepository(Login);

        const existsUserLogin = await loginRepository.findBy({email: registerFields.email});

        if(existsUserLogin.length){
            return {status_code: 409, result: 'User already exist'};
        }

        user.name = registerFields.name;
        user.house_name = registerFields.house_name;

        login.email = registerFields.email;
        login.password = registerFields.password;
        login.user = user;

        try {
            await userRepository.save(user);
            await loginRepository.save(login);
            return {status_code: 204, result: 'user registered!'};
        } catch (error) {
            return {status_code: 400, result: error};
        }
    }
}