



const port = 3000

    // dev version
const domain = "http://localhost:"+port;
const ws = `ws://localhost:${port}`;


    // prod version
//const domain = "https://gennadysx.com:"+port;
//const ws = `ws://gennadysx.com:${port}`;

    //simple api uri and does not be changed!
const api = `${domain}/api/`;

const Api = {
    //Original urls
    domain: domain,
    url: api,
    ws: ws,

    //Sign
    register:  `${api}auth/register`,
    login:  `${api}auth/login`,

    //after Sign
    invitations: api+'user/invitations',
    news: api+'user/news',
    chatList:  api+'user/chatlist',
    friendList: api+'user/friends',
    groupList:  api+'user/groups',


    ///Personal Data
    profile:  api+'profile/account/', // after this will be :id user`s
    settings:  api+'profile/settings/', // after this will be :id user`s
    crud: {
        create:  api+'crud/create/',
        read:  api+'crud/read/',
        update: api+ 'crud/update/',
        delete: api+ 'crud/delete/',
        type: {
            group: 'group',
            user: 'user',
        }
    }
}

const WSList = {
    ws: ws,
    commonChat:  "commonChat",
    commonEvent:  "common-event",
    send: "send",
    receive: "message",
    subscribe: "subscribe",
    unsubscribe: "unsubscribe",

}


export  {
    Api,
    WSList
}
