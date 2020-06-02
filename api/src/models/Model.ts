

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

    public findByOption(data:any, options: any = null, callback:any) {
        this.table.findOne(data, options,  callback);
    }


    //populate() does not work!!!
    public findWith(data:any, model: any, foreignObjectElement: any, callback:any) {
        //this.table.findOne(data).populate(model).then((user:any) => callback(user));
        this.table.findOne(data, (err: Error, res: Object|any) => {
            if (!err) {
                model.findById(res[foreignObjectElement], (err1: Error, res1: any) => {
                      res[foreignObjectElement] = res1
                    callback(err1, res)
                    }
                )
            } else {
                //const find:boolean = false
                callback(err, res, false)
            }
        });
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
        this.table.updateOne(by, data, callback);
    }


    public updateById(ID:any, data:any, callback:any) {
        this.table.findByIdAndUpdate(ID, data, {new: true}, callback);
    }



}
