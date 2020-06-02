/**
 * Created by GennadySX on @2020
 */
import Controller from "@controllers/Controller";
import Tokens from "@models/Tokens";

export default class TokensController extends Controller {
    constructor() {
        super(new Tokens());
    }

}