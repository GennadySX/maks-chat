/**
 * Created by GennadySX on @2020
 */
import Controller from "@controllers/Controller";
import Room from "@models/Room";


export default class ChatController extends Controller{
    constructor() {
        super(new Room());
    }
}