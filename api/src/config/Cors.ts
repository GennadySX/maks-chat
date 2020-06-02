import {Request, Response, NextFunction} from "express";

const Cors = (req: Request, res: Response, next: NextFunction) => {

     /*if (req.headers.origin.indexOf('http://localhost') > -1 ) {

    }*/

    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header('Access-Control-Allow-Headers', 'origin, content-type, accept');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
}


export {
    Cors
};
