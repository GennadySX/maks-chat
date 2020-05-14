

export default class Model{
    state: any;
    table: any;
    constructor(modelTable: any) {
        this.table = modelTable
        this.state = {
            data: null
        }
    }

    public is() {
        return this.table
    }

    public all(callback: any) {
        this.table.find({}, callback)
    }

    public find(where:any,callback:any) {
        this.table.find(where, callback)
    }

    public create(data:any, callback:any) {
        const newRoom = new this.table(data);
        newRoom.save(callback);
    };

    public findOne(data:any, callback:any) {
        this.table.findOne(data, callback);
    }

    public findById(id:any, callback:any) {
        this.table.findById(id, callback);
    }

    public delete(data:any, callback:any) {
        this.table.findOneAndDelete(data, callback);
    }

    public updateBy(by:any, data:any, callback:any) {
        this.table.findOneAndUpdate(by, data, {new: true}, callback);
    }

    public update(by:any, data:any, callback:any) {
        this.table.update(by, data, callback);
    }

    public updateById(ID:any, data:any, callback:any) {
        this.table.findByIdAndUpdate(ID, data, {new: true}, callback);
    }



}
