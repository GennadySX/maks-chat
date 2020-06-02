import Model from "@models/Model";
import {typedModel} from "ts-mongoose";

import {TokensConts} from "@const/Model/TokensConst";
import {TokenSchema} from "@migration/TokensTable";


class Tokens extends Model{
    constructor(props = typedModel(TokensConts.table, TokenSchema)) {
        super(props);

    }

}

export default Tokens;
