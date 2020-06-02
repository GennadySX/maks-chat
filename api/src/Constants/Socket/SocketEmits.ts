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

}



export const systemMessages = (text: any) => {
    return {
        text,
        createdAt: new Date().getTime()
    }
}
