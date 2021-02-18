import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config, validateEmail } from '../helpers';
import { User } from './../entities/User.entity';
import emails from './../emails';

class AuthController {
    static async register(req: Request, res: Response): Promise<Response> {
        const fields: string[] = ['username', 'email', 'password'];
        const missingValues = fields.filter(key => !(key in req.body));
        if (missingValues.length === 0) {
            const { username, email, password }: User = req.body;
            if (!validateEmail(email)) return res.status(400).send('Invalid email provided');
            let user: User = new User();
            user.username = username;
            user.email = email;
            user.password = password;

            try {
                user = await User.save(user);
                const token = jwt.sign({ id: user.id, email: user.email }, config.jwtSecret);
                const emailStatus = await emails.greetings(user.email);
                if (!emailStatus) return res.status(502).send('Email not send');
                return res.status(200).send({
                    token,
                    data: user,
                });
            } catch (error) {
                return res.status(409).send('Email already used');
            }
        }
        return res.status(400).send(`${missingValues.join(', ')} are missing`);
    }

    static async login(req: Request, res: Response): Promise<Response> {
        const fields: string[] = ['identifier', 'password'];
        const missingValues = fields.filter(key => !(key in req.body));

        if (missingValues.length === 0) {
            const { identifier, password } = req.body;
            try {
                const user = await User.findOneOrFail({
                    where: [{ email: identifier }, { username: identifier }],
                    select: ['id', 'email', 'password'],
                });

                if (!user.isPasswordValid(password)) {
                    return res.status(401).send('Identifier or password invalid');
                }

                const token = jwt.sign({ id: user.id, email: user.email }, config.jwtSecret);

                return res.send({ token, data: user });
            } catch (error) {
                return res.status(404).send('User not found');
            }
        }
        return res.status(400).send(`${missingValues.join(', ')} are missing`);
    }
}

export default AuthController;
