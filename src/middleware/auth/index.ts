import AccessTokenRepository from '@src/repository/AccessTokenRepository';
import AdminRepository from '@src/repository/AdminRepository';
import ClientRepository from '@src/repository/ClientRepository';
import ExpertRepository from '@src/repository/ExpertRepository';
import RealUserRepository from '@src/repository/RealUserRepository';
import UserRepository from '@src/repository/UserRepository';
import {contants, security} from '@src/utils';
import {createHash} from 'crypto';
import passport from 'passport';
import {BasicStrategy} from 'passport-http';
import {Strategy as BearerStrategy} from 'passport-http-bearer';
import {Strategy as ClientPasswordStrategy} from 'passport-oauth2-client-password';

export default () => {
  passport.use(
    new BasicStrategy(async (username, password, done) => {
      try {
        const adminRepository = new AdminRepository();
        const admin = await adminRepository.findOne({username});
        if (!admin) return done(null, false);
        if (!security.checkPassword(password, admin.salt, admin.hashed_password)) return done(null, false);
      } catch (error) {
        done(error);
      }
    }),
  );
  passport.use(
    new ClientPasswordStrategy(async (clientId, clientSecret, done) => {
      try {
        const clientRes = new ClientRepository();
        const result = await clientRes.findOne({
          client_id: clientId,
        });
        if (!result) return done(null, false);
        const hashClientSecret = createHash('sha512').update(clientSecret).digest('hex');
        if (result.client_secret !== hashClientSecret) return done(null, false);
        return done(null, result);
      } catch (error) {
        done(error);
      }
    }),
  );
  passport.use(
    new BearerStrategy(async (token, done) => {
      try {
        const accessTokenRes = new AccessTokenRepository();
        const accessToken = await accessTokenRes.findOne({token});
        if (!accessToken) return done({code: 403, type: 'invalidToken', message: 'Token invalid'});
        if (accessToken.type === contants.TYPE_OF_CLIENT.ADMIN) {
          const adminRepository = new AdminRepository();
          const admin = await adminRepository.findById(accessToken.id_client);
          if (!admin) return done(null, false, {message: 'Unknown Admin', scope: '*'});
          done(null, admin);
        }
        if (accessToken.type === contants.TYPE_OF_CLIENT.USER) {
          const userRepository = new UserRepository();
          const realUserRepository = new RealUserRepository();
          const expertRepository = new ExpertRepository();
          const expert = await expertRepository.findById(accessToken.id_client);
          if (!expert) {
            const realUser = await userRepository.findById(accessToken.id_client);
            if (realUser) {
              done(null, realUser);
            } else {
              const user = await userRepository.findById(accessToken.id_client);
              if (!user) return done(null, false, {message: 'Unknown User', scope: '*'});
              else done(null, user);
            }
          } else {
            done(null, expert);
          }
        }
      } catch (error) {
        done({code: 403, type: 'invalidToken', message: 'Token invalid'});
      }
    }),
  );
};
