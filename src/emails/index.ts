import nodemailer from 'nodemailer';
import greetingsTemplate from './templates/greetingsTemplate';

export async function send(to: string, subject: string, body: string): Promise<boolean> {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',

        port: 587,
        auth: {
            user: 'camila.hermiston@ethereal.email',
            pass: 'yecY7UZwDB2epkZykz',
        },
    });

    try {
        await transporter.sendMail({
            to,
            subject,
            html: body,
        });
        return Promise.resolve(true);
    } catch (error) {
        if (error.response) {
            console.error(error.response.body);
        }
        return Promise.reject(error);
    }
}

export async function greetings(to: string): Promise<boolean> {
    return send(to, 'Reset your password', greetingsTemplate());
}

export default {
    send,
    greetings,
};
