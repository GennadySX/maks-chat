import {IUser} from "@models/User";

export interface IAuthController {
    register: (email: string,  password: string) => Promise<IUser | null>;
    login: (email: string, password: string) => Promise<IUser[]>;
    logout: (user: IUser) => Promise<void>;
}



export default class AuthController implements IAuthController{

    /**
     * @param email
     */
    public async register(email: string, password: string): Promise<IUser | null> {
        // TODO
        return [] as any;
    }


    /**
     *
     */
    public async login(email: string, password: string): Promise<IUser[]> {
        // TODO
        return [] as any;
    }



    public async logout(user: IUser): Promise<void> {
        // TODO
        return {} as any;
    }





}
