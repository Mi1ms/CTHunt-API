import { Request, Response } from 'express';
import { User } from '../entities/User.entity';
import { uploadToAwsBucket } from '../helpers/aws';
import { Quest } from './../entities/Quest.entity';

export default class QuestController {
    static async save(req: Request, res: Response): Promise<Response> {
        const fields: string[] = ['title', 'description', 'level', 'latitude', 'longitude'];
        const missingValues = fields.filter(key => !(key in req.body));
        if (!req.file) return res.status(400).send('File is missing');

        if (missingValues.length === 0) {
            try {
                const { originalname, mimetype, buffer } = req.file;
                const { title, description, level, latitude, longitude, tip }: Quest = req.body;
                const { user } = req;

                let quest: Quest = new Quest();
                const { Location } = await uploadToAwsBucket({
                    file: buffer,
                    domain: `${(user as User)?.id}/${title}`,
                    name: originalname,
                    type: mimetype,
                });
                quest.user = user as User;
                quest.title = title;
                quest.description = description;
                quest.level = level;
                quest.latitude = latitude;
                quest.longitude = longitude;
                quest.solution = Location;
                quest.tip = tip;

                quest = await Quest.save(quest);
                return res.status(200).send({
                    data: quest,
                });
            } catch (error) {
                console.log(error);
                return res.status(400).send('Bad request');
            }
        } else {
            return res.status(400).send(`Fields missing : ${missingValues.join(', ')}`);
        }
    }

    static async getOneById(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        try {
            const quest = await Quest.findOneOrFail(id);
            return res.status(200).send({ data: quest });
        } catch (error) {
            return res.status(404).send('Quest not found');
        }
    }

    static async getAll(req: Request, res: Response): Promise<Response> {
        const users = await Quest.find();
        return res.status(200).send({ data: users });
    }

    static async verifySolution(req: Request, res: Response): Promise<void> {}
}
