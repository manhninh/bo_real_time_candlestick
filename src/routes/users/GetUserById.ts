import UserController from '@src/controllers/UserController';
import {Router} from 'express';

/**
 * @api {get} /users/get_user_by_id 5. Get User infor
 * @apiVersion 0.1.0
 * @apiGroup I. Users
 *
 * @apiHeader {String} Authorization The token can be generated after user login.
 * @apiHeader {String} Content-Type application/json.
 * @apiHeader {String} Accept application/json.
 *
 * @apiHeaderExample {Header} Header-Example
 *      "Authorization": "Bearer fc4262627f14ec090ebc5b2b4bc7c3d7f528de4c0ef2a8e48"
 *      "Content-Type": "application/json"
 *      "Accept": "application/json"
 *
 * @apiParam {String} _id
 *
 * @apiSuccess {Object} data
 *
 * @apiSuccessExample {json} Success
 *  HTTP/1.1 200 OK
 *  {
 *      "data": [
 *            {
 *             "is_virtual": true,
 *              "_id": "5fbe0f803252b8487841c417",
 *              "fullname": "DanhNguyen",
 *              "username": "coldblooda9",
 *              "email": "coldblooda9@gmail.com",
 *              "phone": "313113131",
 *              "avatar": "",
 *              "total_amount": 10000,
 *              "status": 'ACTIVE',
 *              "__v": 0
 *            }
 *        ]
 *  }
 *
 * @apiError (404 Not Found) NotFound API not found
 * @apiErrorExample {json} 404 Not Found Error
 *      HTTP/1.1 404 Not Found
 *
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 * @apiErrorExample {json} 500 Internal Server Error
 *  HTTP/1.1 500 Internal Server Error
 *  {
 *    "message": "error message"
 *  }
 */
export default (route: Router) => route.get('/get_user_by_id', new UserController().getUserById);
