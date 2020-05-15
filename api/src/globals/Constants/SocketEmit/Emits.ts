export const Emits = {
    sendMessage: 'send message',
    message: 'message',
    upload: 'upload',
    connection: 'connection',
    disconnect: 'disconnec',
    chat: 'chat',
    join: 'join',
}

export const systemMessages = (text: any) => {
    return {
        text,
        createdAt: new Date().getTime()
    }
}