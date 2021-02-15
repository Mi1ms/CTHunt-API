import { Request, Response } from 'express';
import { User } from './../entities/User.entity';
import { checkUserAccessibility } from './../helpers/';

type ResError = {
    status: number;
    message: string;
};
class UserController {
    static async getAll(req: Request, res: Response): Promise<Response> {
        const users = await User.find();
        return res.status(200).send({ data: users });
    }

    static async getOneById(req: Request, res: Response): Promise<Response> {
        try {
            const user = await checkUserAccessibility({ req });
            return res.status(200).send({ data: user });
        } catch (error) {
            const { status, message } = error as ResError;
            if (status && message) return res.status(status).send(message);
            else return res.status(400).send('Bad request');
        }
    }

    static async update(req: Request, res: Response): Promise<Response> {
        const data = req.body;
        try {
            const user = await checkUserAccessibility({ req, unauthorizedMsg: 'update' });
            await User.update(user.id, data);
            return res.status(200).send(`User successfully updated`);
        } catch (error) {
            const { status, message } = error as ResError;
            if (status && message) return res.status(status).send(message);
            else return res.status(400).send('Bad request');
        }
    }

    static async delete(req: Request, res: Response): Promise<Response> {
        try {
            const user = await checkUserAccessibility({ req, unauthorizedMsg: 'delete' });
            await User.delete(user.id);
            return res.status(200).send('User successfully deleted');
        } catch (error) {
            const { status, message } = error as ResError;
            if (status && message) return res.status(status).send(message);
            else return res.status(400).send('Bad request');
        }
    }
}

export default UserController;
