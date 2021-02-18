import { Request, Response } from 'express';
import { Notice } from './../entities/Notice.entity';

type ResError = {
    status: number;
    message: string;
};

export default class NoticeController {
    static async save(req: Request, res: Response): Promise<Response> {
        const data = req.body;
        try {
            await Notice.save(data);
            return res.status(200).send(`Commented successfully`);
        } catch (error) {
            const { status, message } = error as ResError;
            if (status && message) return res.status(status).send(message);
            else return res.status(400).send('Bad request');
        }
    }
}