import Model from "@models/Model";
import { createSchema, Type, typedModel } from 'ts-mongoose';
import {RoomConst} from "@const/Model/RoomConst";
import {RoomSchema} from "@migration/RoomTable";


export default class Room extends Model {
    constructor(props = typedModel(RoomConst.table, RoomSchema)) {
        super(props);
    }

}
