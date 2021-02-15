import moment from 'moment';
import dotenv from 'dotenv';
import path from 'path';
import { User } from '../entities/User.entity';
import { Request } from 'express';
import { isEmpty } from 'lodash';
import { existsSync } from 'fs';

moment.locale('fr');

const dateUtils = {
    currentDate: (formatedDate: string): string => {
        return moment().format(formatedDate);
    },
    formatDate: (date: string, formatedDate: string): string => {
        return moment(new Date(date)).format(formatedDate);
    },
};

function prelude(): void | never {
    const envPathName = path.join(process.cwd(), '.env');
    const appConfig = require(path.join(process.cwd(), 'app.config.json'));

    if (existsSync(envPathName)) {
        dotenv.config();

        const missingValues = appConfig.env.filter((key: string) => process.env[key] === undefined);
        if (!isEmpty(missingValues)) {
            throw new Error(
                `Sorry [ ${missingValues.join(', ')}] value(s) are missings on your .env file`,
            );
        }
    } else {
        throw new Error('Sorry your .env file is missing');
    }
}

const formatError = (status: number, message: string): object => {
    return {
        status,
        message,
    };
};

const checkUserAccessibility = async ({
    req,
    user,
    unauthorizedMsg = 'access',
}: {
    req: Request;
    user?: User;
    unauthorizedMsg?: string;
}): Promise<User> | never => {
    const { id, user_id } = req.params;
    const { user: currentUser } = req;
    const userId = id || user_id;
    const newUser = user || (await User.findOne(userId));
    if (!newUser) throw formatError(404, 'User not found');
    if (!newUser.checkId((currentUser as User).id))
        throw formatError(401, `You cannot ${unauthorizedMsg} this data`);
    return newUser;
};

const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+/;
    return re.test(email.toLowerCase());
};

export { dateUtils, prelude, checkUserAccessibility, formatError, validateEmail };
