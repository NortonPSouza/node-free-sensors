import {Request} from "express";
import {DataSource} from "typeorm";

export interface NewRequest  extends Request {
    dataSource: DataSource
}

export type ResponseOperation = {
    status_code: number
    result: string
};