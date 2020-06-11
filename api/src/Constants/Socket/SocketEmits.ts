export const SocketEmits = {
    sendMessage: 'send message',
    message: 'message',
    upload: 'upload',
    connection: 'connection',
    disconnect: 'disconnect',
    chat: 'chat',
    joinRoom: 'joinRoom',
    join: 'join',
    welcome: 'welcome',
    err: 'err',
    success: 'success',
    commonChatData: "commonChatData",
    errors: {
        auth: 'not_auth',
    },
    groups: {
        init: 'group_init',
        send: 'group_send',
        receive: 'group_receive',
        file: 'group_file',
        search: 'group_search',
    },
    rooms: {
        init: 'room_init',
        send: 'room_send',
        receive: 'room_receive',
        file: 'room_file',
        search: 'room_search',
    }

}



export const systemMessages = (text: any) => {
    return {
        text,
        createdAt: new Date().getTime()
    }
}
