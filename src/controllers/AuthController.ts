import { Request, Response } from 'express';
import jwt, { decode } from 'jsonwebtoken';
import { config, validateEmail } from '../helpers';
import { User } from './../entities/User.entity';
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'camila.hermiston@ethereal.email',
        pass: 'yecY7UZwDB2epkZykz'
    }
});

//TODO: remove password from the returned user object
type TokenType = {
    id: string;
    email: string;
};

class AuthController {

    static async  register(req: Request, res: Response): Promise<Response> {
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
                const emailToken  = jwt.sign({ id: user.id, email: user.email }, config.EMAIL_SECRET, {
                    expiresIn: '1d', 
                });

                const url = `http://localhost:3004/auth/confirmation/${emailToken}`;

                await transporter.sendMail({
                    to: user.email,
                    subject: 'Confirm Email',
                    html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
                });

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
        const fields: string[] = ['email', 'password'];
        const missingValues = fields.filter(key => !(key in req.body));
        if (missingValues.length === 0) {
            const { email, password }: User = req.body;
            try {
                const user = await User.findOneOrFail(
                    { email },
                    { select: ['id', 'email', 'password'] },
                );

                if (!user.isPasswordValid(password)) {
                    return res.status(401).send('Email or password invalid');
                }

                if (!user.confirmed){
                    return res.status(401).send('Please confirm your email to login');
                }

                const token = jwt.sign({ id: user.id, email: user.email }, config.jwtSecret);

                return res.send({ token, data: user });
            } catch (error) {
                return res.status(404).send('User not found');
            }
        }
        return res.status(400).send(`${missingValues.join(', ')} are missing`);
    }

    static async resetPassword(req: Request, res: Response): Promise<Response> {
        const { email } = req.body;
        if (!email) {
            return res.status(400).send('Email is required');
        }

        let user: User;
        try {
            user = await User.findOneOrFail({
                email,
            });
        } catch (error) {
            return res.status(404).send('User not found');
        }

        try {
            const token = jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
                expiresIn: '10m',
            });
            return res.status(200).send('Email successfully sent');
        } catch (error) {
            return res.status(500).send();
        }
    }

    static async changePassword(req: Request, res: Response): Promise<Response> {
        const { token } = req.params;
        let id;
        try {
            const decoded = jwt.verify(token, config.jwtSecret);
            id = (decoded as TokenType).id;
        } catch (err) {
            return res.status(401).send('Invalid token');
        }

        const fields: string[] = ['oldPassword', 'newPassword'];

        const missingValues: string[] = fields.filter(key => !(key in req.body));
        if (missingValues.length === 0) {
            const { oldPassword, newPassword } = req.body;
            if (!(oldPassword && newPassword)) {
                return res.status(400).send();
            }
            let user: User;
            try {
                user = await User.findOneOrFail(id, {
                    select: ['id', 'email', 'password'],
                });
            } catch (error) {
                return res.status(404).send('User');
            }

            if (!user.isPasswordValid(oldPassword)) {
                return res.status(401).send();
            }

            user.password = newPassword;

            await User.save(user);
            try {
                return res.status(200).send('Password successfully changed');
            } catch (error) {
                return res.status(500).send();
            }
        }
        return res.status(400).send(`${missingValues.join(', ')} are missing`);
    }

    static async confirmAccount(req: Request, res: Response): Promise<Response> {
        const { emailToken } = req.params;
        let id;
        try{
            const decoded = jwt.verify(emailToken, config.EMAIL_SECRET);
            id = (decoded as TokenType).id;
        } catch (err) {
            return res.status(401).send('Invalid token');
        }

        let user: User;

        try {
            user = await User.findOneOrFail(id, {
                select: ['id', 'email', 'password'],
            });
        } catch (error) {
            return res.status(404).send('User');
        }
        user.confirmed = true;

        await User.save(user);
        try {
            return res.status(200).send('Account is verified');
        } catch (error) {
            return res.status(500).send();
        }
    }
}

export default AuthController;
