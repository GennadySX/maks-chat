import Model from "@models/Model";
import {typedModel } from 'ts-mongoose';
import {GroupSchema} from "@migration/GroupTable";
import {GroupConst} from "@const/Model/GroupConst";


export default class Groups extends Model {
    constructor(props = typedModel(GroupConst.table, GroupSchema)) {
        super(props);
    }

}
