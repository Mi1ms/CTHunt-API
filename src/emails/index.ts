import greetingsTemplate from './templates/greetingsTemplate';
import sgMail from '@sendgrid/mail';
import { SENDGRID_API_KEY } from '../helpers/params';
export async function send(to: string, subject: string, body: string): Promise<boolean> {
    const msg = {
        to,
        from: 'rachidbensaid01@gmail.com',
        subject,
        html: body,
    };

    try {
        if (SENDGRID_API_KEY) {
            sgMail.setApiKey(SENDGRID_API_KEY);
            await sgMail.send(msg);
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
        if (error.response) {
            console.error(error.response.body);
        }
        return false;
    }
}

export async function greetings(to: string): Promise<boolean> {
    return send(to, 'CTHunt: Greetings!', greetingsTemplate());
}

export default {
    send,
    greetings,
};
