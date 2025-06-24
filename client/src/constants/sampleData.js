export const sampleChat = [
    {
        avatar: ['https://avatars.githubusercontent.com/u/16500619?v=4'],
        name: 'Itachi Uchiha',
        _id: '1',
        groupChat: false,
        members: ['1', '2'],
    },
    {
        avatar: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6ByIbVUUpeyPQbwHBGF01UMfOBb1BYLRXgg&s'],
        name: 'Heisenberg',
        _id: '2',
        groupChat: false,
        members: ['1', '2'],
    }
]

export const sampleUsers = [
    {
        avatar: ['https://avatars.githubusercontent.com/u/16500619?v=4'],
        name: 'Itachi Uchiha',
        _id: '1',
    },
    {
        avatar: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnTGQ9qENyTQURr5wi2oK-6Bc-qgJRXdxgvZ4bSyMGw1jnULbiCoE_UQXWGLdN2ADVzAk&usqp=CAU'],
        name: 'Gojo Satoru',
        _id: '2',
    }
]

export const sampleNotifications = [
    {
        sender: {
            avatar: 'https://avatars.githubusercontent.com/u/16500619?v=4',
            name: 'Itachi Uchiha',
        },

        _id: '1',
    },
    {
        sender: {
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnTGQ9qENyTQURr5wi2oK-6Bc-qgJRXdxgvZ4bSyMGw1jnULbiCoE_UQXWGLdN2ADVzAk&usqp=CAU',
            name: 'Gojo Satoru',
        },
        _id: '2',
    }
]

export const sampleMessage = [
    {
        attachments: [{
            public_id: 'asdscexxx',
            url: 'https://static.wikia.nocookie.net/villains/images/6/65/Walter_White2.jpg'
        },
        ],
        content: `I'm not in Danger, I am the Danger 🪰`,
        _id: 'saaasscoebciervvvv',
        sender: {
            _id: 'sender._id',
            name: 'Heisenberg',
        },
        chat: 'chatId',
        createdAt: '2025-06-24T02:20:07.000Z'
    },
    {
        attachments: [{
            public_id: 'asdscexxx_2',
            url: 'https://i.pinimg.com/564x/58/48/65/584865dde411406b245f6674f6d6e375.jpg'
        },
        ],
        content: `Yo yo yo. 148-3 to the 3 to the 6 to the 9, representing the ABQ, what up, biatch?!`,
        _id: 'saaasscoebciervvvv_2',
        sender: {
            _id: 'curr_user_82hn',
            name: 'Jesse',
        },
        chat: 'chatId',
        createdAt: '2025-06-24T02:22:07.000Z'
    },
    {
        attachments: [],
        content: `Your Meth Is Good Jesse. As Good As Mine.`,
        _id: 'saaasscoebciervvvv_3',
        sender: {
            _id: 'sender._id',
            name: 'Heisenberg',
        },
        chat: 'chatId',
        createdAt: '2025-06-24T02:23:07.000Z'
    },
    {
        attachments: [],
        content: `This Is My Own Private Domicile, And I Will Not Be Harassed.`,
        _id: 'saaasscoebciervvvv_4',
        sender: {
            _id: 'curr_user_82hn',
            name: 'Jesse',
        },
        chat: 'chatId',
        createdAt: '2025-06-24T02:29:07.000Z'
    },
];

export const sampleUser = {
    _id:'curr_user_82hn',
    name:'Yash'
}