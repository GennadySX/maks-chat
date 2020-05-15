import UserTable from '@migration/UserTable';

export default class UsersSocketController {
    users: [];
    userTable: UserTable;

    constructor() {
    }

    addUser(obj: {id: string, username: string, room: string}) {
        obj.username = obj.username.trim().toLowerCase();
        obj.room = obj.room.trim().toLowerCase();

        // валидация данных
        if(!obj.username || !obj.room) {
            return {
                error: 'Username and room are recuired!'
            }
        }

        // проверка данных о пользователе в бд
        const existingUser = this.users.find((user: object) => {
            return user.room === obj.room && user.login === obj.username; // в работе, нужно исправить
        })

        // если пользователь существует
        if (existingUser) {
            return {
                error: 'Пользователь с таким именем существует'
            }
        }

        // добавить пользователя в массив.
        const users = {obj.id, obj.username, obj.room}

    }

    getUser() {

    }

    getUserInRoom() {

    }

    removeUser() {

    }

}