const aMessage =[
    {
        from: "me",
        to: "him",
        text: "Example text ",
        created_at: "2020-02-17 18:11:40"
    },

]




const rooms = [
    {
        _id: 0,
        type: 'group',
        group: {
            title: 'Avengers',
            avatar: require('../assets/images/avengers.png').default,
        },
        last_message: {
            message: 'Hey dude!',
            sent_at: '2020-02-12 18:14:45'
        },
    },
    {
        _id: 1,
        type: 'user',
        user: {
            title: 'Bill Gates',
            avatar: require('../assets/images/biilG.jpg').default,
        },
        last_message: {
            message: 'Hey dude!',
            sent_at: '2020-02-12 18:14:45'
        },
    },
    {
        _id: 2,
        type: 'user',
        user: {
            title: 'Pavel Durov',
            avatar: require('../assets/images/durov.jpg').default,
        },
        last_message: {
            message: 'Hey !',
            sent_at: '2020-02-12 18:14:45'
        },
    },
    {
        _id: 3,
        type: 'group',
        user: null,
        group: {
            title: 'Vikings',
            avatar: require('../assets/images/vikings.jpg').default
        },
        last_message: {
            message: 'Hey dude!',
            sent_at: '2020-02-12 18:14:45'
        },
    },
    {
        _id: 4,
        type: 'user',
        user: {
            title: 'Mark Zuckerberg',
            avatar: require('../assets/images/zucker.jpg').default,
        },
        last_message: {
            message: 'Hi from facebook!',
            sent_at: '2020-02-12 18:14:45'
        },
    }
]