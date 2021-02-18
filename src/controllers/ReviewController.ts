import { Request, Response } from 'express';
import { Review } from '../entities/Review.entity';

type ResError = {
    status: number;
    message: string;
};

export default class ReviewController {
    static async save(req: Request, res: Response): Promise<Response> {
        const fields: string[] = ['player', 'mission', 'comment', 'rating'];
        const missingValues = fields.filter(key => !(key in req.body));

        if (missingValues.length === 0) {
            const { player, mission, comment, rating }: Review = req.body;
            const notice: Review = new Review();

            notice.player = player;
            notice.mission = mission;
            notice.comment = comment;
            notice.rating = rating;

            try {
                await Review.save(notice);
                return res.status(200).send(`Commented successfully`);
            } catch (error) {
                const { status, message } = error as ResError;
                if (status && message) return res.status(status).send(message);
                else return res.status(400).send('Bad request');
            }
        } else {
            return res.status(400).send(`Fields missing : ${missingValues.join(', ')}`);
        }
    }
}
