//Helpers
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import { paramMissingError } from '@const/constants';

//Main
import {post,get, put, file, del, router} from "@config/Router";
import AuthController from "@controllers/Auth";

// Init globals



/******************************************************************************
 *                    Data init (get data ) -"GET"
 ******************************************************************************/

get('/', new AuthController().index);


/******************************************************************************
 *                     Creating - "POST /api/auth/""
 ******************************************************************************/

post('/register', new AuthController().register);
post('/login', new AuthController().login);
post('/forgot-password', new AuthController().forgot);



/******************************************************************************
 *                       Update - "PUT /api/auth/update"
 ******************************************************************************/



/******************************************************************************
 *                    Delete - "DELETE"
 ******************************************************************************/





export default router;
