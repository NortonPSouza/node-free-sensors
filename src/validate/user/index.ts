type ErrorMessage = {
    status: boolean
    message: string
}

export class UserValidate {
    private static EMPTY_FIELD = "FIELD cannot be empty";

    public static isEmail(value: string): ErrorMessage {
        const email = /\S+@\S+\.\S+/;
        if (!value) {
            return {
                status: false,
                message: this.EMPTY_FIELD.replace("FIELD", "Email")
            };
        }
        if (!email.test(value)) {
            return {
                status: false,
                message: "Email is invalid"
            }
        }
        return { status: true, message: '' };
    }

    public static isName(value: string): ErrorMessage {
        const name = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;
        if (!value) {
            return {
                status: false,
                message: this.EMPTY_FIELD.replace("FIELD", "Name")
            }
        }
        if (!name.test(value)) {
            return {
                status: false,
                message: "Name must be a string"
            }
        }
        if (value.length < 6) {
            return {
                status: false,
                message: "Name must have minimun 6 caracters"
            }
        }
        return { status: true, message: '' };
    }

    public static isPassword(value: string): ErrorMessage {
        const password = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#!/?\.])[0-9a-zA-Z$*&@!#?\.]{6,}$/;
        if (!value) {
            return {
                status: false,
                message: this.EMPTY_FIELD.replace("FIELD", "password")
            }
        }
        if (!password.test(value)) {
            return {
                status: false,
                message: "Password is not strong enough"
            }
        }
        return { status: true, message: '' };
    }

    public static isUserId(value: string): ErrorMessage {
        const idUser = /^[1-9]\d*(\.\d+)?$/;

        if (!value) {
            return {
                status: false,
                message: this.EMPTY_FIELD.replace("FIELD", "id")
            }
        }
        if (!idUser.test(value)) {
            return {
                status: false,
                message: "ID user is invalid"
            }
        }
        return { status: true, message: '' };
    }
}