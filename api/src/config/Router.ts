import {NextFunction, Request, Response, Router} from 'express';
const router = Router();

import {fileUploadingConfig, fileUploadingRules} from "@config/FileStore";

const multer  = require('multer'),
    upload = multer(fileUploadingConfig).fields(fileUploadingRules)


const get = (url:string, controller:any) => router.get(url, (req: Request, res: Response, next: NextFunction) => controller(req, res, next));

const post = (url:string, controller:any) => router.post(url, (req: Request, res: Response, next: NextFunction) => controller(req, res, next));

const file = (url:string, controller:any) => router.post(url, upload, (req: Request, res: Response, next: NextFunction) => controller(req, res, next));

const put = (url:string, controller:any) => router.put(url, (req: Request, res: Response, next: NextFunction) => controller(req, res, next));

const del = (url:string, controller:any) => router.delete(url, (req: Request, res: Response, next: NextFunction) => controller(req, res, next));






export {
    router,
    get,
    post,
    put,
    del,
    file
}
