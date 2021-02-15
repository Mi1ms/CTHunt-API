import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { User } from '../entities/User.entity';
import { config } from '../helpers';

/**
 * JSON Web Token strategy
 */

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.jwtSecret,
        },
        async (jwtPayload, next) => {
            try {
                const { id } = jwtPayload;
                const user: User = await User.findOneOrFail(id);
                next(null, user);
            } catch (err) {
                next(err.message);
            }
        },
    ),
);
