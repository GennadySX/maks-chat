
export interface IController {
    getOne: () => Promise<void>;
    getAll: () => Promise<void>;
    create: () => Promise<void>;
    store: () => Promise<void>;
    update: () => Promise<void>;
    delete: () => Promise<void>;
}

class Controller implements IController {


    public async getOne(): Promise<void> {
        return [] as any;
    }


    public async getAll(): Promise<void> {
        return [] as any;
    }


    public async create(): Promise<void> {
        return [] as any;
    }

    public async store(): Promise<void> {
        return [] as any;
    }


    public async update(): Promise<void> {
        return [] as any;
    }


    public async delete(): Promise<void> {
        return [] as any;
    }
}

export default Controller;
