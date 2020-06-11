import User from "@models/User";
import Controller from "@controllers/Controller";
import Bcrypt from "bcryptjs"
import {uid} from 'rand-token'
import {NextFunction, Request, Response} from "express";
import Tokens from "@models/Tokens";

export default class AuthController extends Controller {
    constructor() {
        super(new User());
    }

    //Test Auth Controller
    public async index(req: Request, res: Response, next: NextFunction) {
        return res.json({test: "success"});
    }


    public async register(req: Request, res: Response, next: NextFunction) {
        if (req.body && (req.body.email) && req.body.password) {
            req.body.password = Bcrypt.hashSync(req.body.password, 10)
        }
        new User().create(req.body, (err: Error, data: any, reply: any) => {
            console.log('data is', data);
            (!data) ? res.json({status: false, err: data.err})
                : res.json({status: true, user: data})
        })
    }


    public async login(req: Request, res: Response, next: NextFunction) {
        if (req.body.email || req.body.login) {
            const findBy = req.body.email ? {email: req.body.email} : {login: req.body.login}
            new User().findOne(findBy, (not: Error, user: any) => {
                if (user) {
                    if (Bcrypt.compareSync(req.body.password, user.password)) {
                        const token = uid(70);
                        const now = new Date()
                        new Tokens().create({
                            user_id: user._id,
                            token: token,
                            expireAfter: new Date(now.getDate() + 30).getDate(),
                            userAgent: {
                                deviceName: 'Android'
                            },
                            updatedAt: now.getDate(),
                        }, (err: Error, token: any) => {
                            return res.json({
                                status: true,
                                user: user,
                                token: token.token
                            });
                        })
                    } else
                        return res.json({status: false, mess: "Логин или пароль неверный"})
                } else res.json({status: false, mess: "Аккаунт не найден", data: req.body})
            })
        }
    }


    public async forgot(req: Request, res: Response, next: NextFunction) {
        return [] as any;
    }


    public async logout(req: Request, res: Response, next: NextFunction) {
        return {} as any;
    }


}
