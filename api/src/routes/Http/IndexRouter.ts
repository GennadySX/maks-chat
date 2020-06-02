import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';

import { paramMissingError } from '@const/constants';

// Init globals
const router = Router();


/******************************************************************************
 *                    Data init (get data ) -"GET"
 ******************************************************************************/

router.get('/', async (req: Request, res: Response) => {
    return res.status(OK).json({test: true});
});


/******************************************************************************
 *                     Creating - "POST"
 ******************************************************************************/

router.post('/', async (req: Request, res: Response) => {
    return res.status(CREATED).end();
});


/******************************************************************************
 *                       Update - "PUT /api/users/update"
 ******************************************************************************/

router.put('/', async (req: Request, res: Response) => {
    return res.status(OK).end();
});


/******************************************************************************
 *                    Delete - "DELETE"
 ******************************************************************************/

router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;
    return res.status(OK).json({id: id});
});




export default router;
