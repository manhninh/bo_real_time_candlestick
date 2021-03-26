import IAccessTokenModel from '@src/models/cpAccessToken/IAccessTokenModel';
import ClientEntities from '@src/models/cpClient/IClientModel';
import AccessTokenRepository from '@src/repository/AccessTokenRepository';
import AdminRepository from '@src/repository/AdminRepository';
import ExpertRepository from '@src/repository/ExpertRepository';
import RealUserRepository from '@src/repository/RealUserRepository';
import UserRepository from '@src/repository/UserRepository';
import { contants, security } from '@src/utils';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import { createServer, exchange, ExchangeDoneFunction } from 'oauth2orize';
import passport from 'passport';

// initialization token
const initToken = async (client: ClientEntities, clientModel: any, type: string, done: ExchangeDoneFunction) => {
  try {
    const _accessTokenRepository = new AccessTokenRepository();

    if (type === contants.TYPE_OF_CLIENT.ADMIN) {
      const result = await _accessTokenRepository.findOne({
        client_id: client.client_id,
        id_client: clientModel._id,
      });
      if (result) {
        await _accessTokenRepository.delete(result._id);
      }
      const tokenValue = randomBytes(128).toString('hex');
      await _accessTokenRepository.create({
        client_id: client.client_id,
        id_client: clientModel._id,
        type: contants.TYPE_OF_CLIENT.ADMIN,
        token: tokenValue,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as IAccessTokenModel);
      done(null, tokenValue);
    }

    if (type === contants.TYPE_OF_CLIENT.USER) {
      const expertResult = await _accessTokenRepository.findOne({
        client_id: client.client_id,
        id_client: clientModel._id,
      });
      if (expertResult) {
        const result = await _accessTokenRepository.findOne({
          client_id: client.client_id,
          id_client: clientModel._id,
        });
        if (result) {
          await _accessTokenRepository.delete(result._id);
        }
        const tokenValue = randomBytes(128).toString('hex');
        await _accessTokenRepository.create({
          client_id: client.client_id,
          id_client: clientModel._id,
          type: contants.TYPE_OF_CLIENT.USER,
          token: tokenValue,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as IAccessTokenModel);
        done(null, tokenValue);
      } else {
        const tokenValue = randomBytes(128).toString('hex');

        await _accessTokenRepository.create({
          client_id: client.client_id,
          id_client: clientModel._id,
          type: contants.TYPE_OF_CLIENT.USER,
          token: tokenValue,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as IAccessTokenModel);
        done(null, tokenValue);
      }
    }

    // if (type === contants.TYPE_OF_CLIENT.EXPERT) {
    // }
  } catch (error) {
    done(error);
  }
};

// Create OAuth 2.0 server
const server = createServer();

// Exchange username & password for an access token.
server.exchange(
  exchange.password(
    {},
    async (client, username: string, password: string, _scope, body, issused: ExchangeDoneFunction) => {
      try {
        if (body.type === contants.TYPE_OF_CLIENT.ADMIN) {
          const _adminRepository = new AdminRepository();
          const admin = await _adminRepository.findOne({ username: username.toLowerCase() });
          if (!admin) {
            const emailAdmin = await _adminRepository.findOne({ email: username.toLowerCase() });
            if (!emailAdmin) {
              return issused(new Error('The account or password is incorrect!'));
            } else {
              if (
                !security.checkPassword(
                  password.toString(),
                  emailAdmin.salt.toString(),
                  emailAdmin.hashed_password.toString(),
                )
              )
                return issused(new Error('Password is incorrect!'));
              else {
                if (emailAdmin.status === contants.STATUS.ACTIVE) {
                  initToken(client, emailAdmin, body.type, issused);
                } else if (emailAdmin.status === contants.STATUS.DELETE)
                  return issused(new Error('The account is deleted'));
                else return issused(new Error('The account not active'));
              }
            }
          } else {
            if (!security.checkPassword(password.toString(), admin.salt.toString(), admin.hashed_password.toString()))
              return issused(new Error('Password is incorrect!'));
            else {
              if (admin.status === contants.STATUS.ACTIVE) {
                initToken(client, admin, body.type, issused);
              } else if (admin.status === contants.STATUS.DELETE) return issused(new Error('The account is deleted'));
              else return issused(new Error('The account not active'));
            }
          }
        } else if (body.type === contants.TYPE_OF_CLIENT.USER) {
          const _expertRepository = new ExpertRepository();
          const expert = await _expertRepository.findOne({
            $or: [
              { username: username.toLowerCase() },
              { email: username.toLowerCase() }
            ]
          });

          if (expert) {
            if (!security.checkPassword(password.toString(), expert.salt.toString(), expert.hashed_password.toString()))
              return issused(new Error('Password is incorrect!'));
            else {
              if (expert.status === contants.STATUS.ACTIVE) {
                initToken(client, expert, body.type, issused);
              } else if (expert.status === contants.STATUS.DELETE) return issused(new Error('The account is deleted'));
              else return issused(new Error('ExpertT_ACTIVE'));
            }
          } else {
            const _userRepository = new UserRepository();
            const _realUserRepository = new RealUserRepository();
            const real = await _realUserRepository.findOne({ username: username.toLowerCase() });
            const emailReal = await _realUserRepository.findOne({ email: username.toLowerCase() });

            if (real) {
              const isValid = bcrypt.compareSync(password, real.password);
              if (!isValid) {
                return issused(new Error('Password is incorrect!'));
              } else {
                const user = await _userRepository.findOne({ id_user_trading: real._id });

                initToken(client, user, body.type, issused);
              }
            } else if (emailReal) {
              const isValid = bcrypt.compareSync(password, emailReal.password);
              if (!isValid) {
                return issused(new Error('Password is incorrect!'));
              } else {
                const user = await _userRepository.findOne({ id_user_trading: emailReal._id });

                initToken(client, user, body.type, issused);
              }
            } else {
              const user = await _userRepository.findOne({ username: username.toLowerCase() });
              if (!user) {
                const emailUser = await _userRepository.findOne({ email: username.toLowerCase() });
                if (!emailUser) {
                  return issused(new Error('The account or password is incorrect!'));
                } else {
                  if (
                    !security.checkPassword(
                      password.toString(),
                      emailUser.salt.toString(),
                      emailUser.hashed_password.toString(),
                    )
                  ) {
                    return issused(new Error('Password is incorrect!'));
                  } else {
                    if (emailUser.status === contants.STATUS.ACTIVE) {
                      initToken(client, emailUser, body.type, issused);
                    } else if (emailUser.status === contants.STATUS.DELETE)
                      return issused(new Error('UseUserEEN_DELETED'));
                    else return issused(new Error('The account not active'));
                  }
                }
              } else {
                if (!security.checkPassword(password.toString(), user.salt.toString(), user.hashed_password.toString()))
                  return issused(new Error('Password is incorrect!'));
                else {
                  if (user.status === contants.STATUS.ACTIVE) {
                    initToken(client, user, body.type, issused);
                  } else if (user.status === contants.STATUS.DELETE) return issused(new Error('UseUserEEN_DELETED'));
                  else return issused(new Error('The account not active'));
                }
              }
            }
          }
        } else {
          return issused(new Error('ACCOUNT_NOT_EXIST'));
        }
      } catch (error) {
        issused(error);
      }
    },
  ),
);

/**
 * @api {post} /oauth/token 1. Sign in
 * @apiVersion 0.1.0
 * @apiGroup VII. Authorization
 *
 * @apiHeader {String} Content-Type application/json.
 * @apiHeader {String} Accept application/json.
 *
 * @apiHeaderExample {Header} Header-Example
 *    "Content-Type": "application/json"
 *    "Accept": "application/json"
 *
 * @apiParam {String} username
 * @apiParam {String} password
 * @apiParam {String} type (ADMIN/USER/EXPERT)
 * @apiParam {String} grant_type password
 * @apiParam {String} client_id b109f3bbbc244eb82441917ed06d618b9008dd09b3bef
 * @apiParam {String} client_secret password
 * @apiParam {String} scope offline_access
 *
 * @apiSuccess {Object} data
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "access_token": "d8e52612c0015c818fc76b007797e342bad3a6959f4241f11642c4249be7dae31d023112e0",
 *      "token_type": "Bearer"
 *    }
 *
 * @apiError (404 Not Found) NotFound API not found
 * @apiErrorExample {json} 404 Not Found Error
 *    HTTP/1.1 404 Not Found
 *
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 * @apiErrorExample {json} 500 Account not exist
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *       {
 *          "error": "server_error",
 *          "error_description": "Account not exist"
 *       }
 *    }
 * @apiErrorExample {json} 500 Login Fail
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *       {
 *          "error": "server_error",
 *          "error_description": "Login Fail"
 *       }
 *    }
 * @apiErrorExample {json} 500 Account not active
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *       {
 *          "error": "server_error",
 *          "error_description": "ACCOUNT_NOT_ACTIVE"
 *       }
 *    }
 */

const token = [
  passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
  server.token(),
  server.errorHandler(),
];

const isAuthenticated = passport.authenticate('bearer', { session: false });

export { token, isAuthenticated };

