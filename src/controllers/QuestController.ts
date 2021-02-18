import { Request, Response } from 'express';
import { Quest } from './../entities/Quest.entity';

type ResError = {
    status: number;
    message: string;
};

export default class QuestController {
    static async save(req: Request, res: Response): Promise<Response> {
        const fields: string[] = [
            'idQuest',
            'creator',
            'title',
            'description',
            'level',
            'latittude',
            'longitude',
            'solution',
            'tips',
        ];
        const missingValues = fields.filter(key => !(key in req.body));

        if (missingValues.length === 0) {
            const {
                idQuest,
                creator,
                title,
                description,
                level,
                latittude,
                longitude,
                solution,
                tips,
            }: Quest = req.body;
            const quest: Quest = new Quest();

            quest.idQuest = idQuest;
            quest.creator = creator;
            quest.title = title;
            quest.description = description;
            quest.level = level;
            quest.latittude = latittude;
            quest.longitude = longitude;
            quest.solution = solution;
            quest.tips = tips;

            try {
                await Quest.save(quest);
                return res.status(200).send(`Quest saved successfully`);
            } catch (error) {
                const { status, message } = error as ResError;
                if (status && message) return res.status(status).send(message);
                else return res.status(400).send('Bad request');
            }
        } else {
            return res.status(400).send(`Fields missing : ${missingValues.join(', ')}`);
        }
    }

    static async getOneById(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        try {
            const quest = await Quest.findOne(id);
            return res.status(200).send({ quest });
        } catch (error) {
            const { status, message } = error as ResError;
            if (status && message) return res.status(status).send(message);
            else return res.status(400).send('Bad request');
        }
    }

    static async getAll(req: Request, res: Response): Promise<Response> {
        const users = await Quest.find();
        return res.status(200).send({ data: users });
    }

    static verifySolution(req: Request, res: Response) {}
}
