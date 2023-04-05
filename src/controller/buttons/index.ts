import {Request, Response} from "express";

import {RedisHelper} from "../../helpers/redis";

export class Buttons {
    public static async get(req: Request, res: Response): Promise<void> {
        let formattedButtons = [];
        const client = new RedisHelper();
        await client.initConnection();

        const buttons = await client.getAll();

        buttons.map(item => {
            const [device, name] = item.split(":");
            formattedButtons.push({device, name});
        });

        await client.disconnect();
        res.status(200).send(formattedButtons);
    }

    public static async deleteButton(req: Request, res: Response): Promise<void> {
        const client = new RedisHelper();
        await client.initConnection();
        const buttonDelete = `${req.params.device}:${req.params.button}`;
        try {
            await client.delete(buttonDelete);
            res.status(200).send({message: "ok"});
            return;
        } catch (err) {
            res.status(500).send({message: err});
        } finally {
            await client.disconnect();
        }
    }
}