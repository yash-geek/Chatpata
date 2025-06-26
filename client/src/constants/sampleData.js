import moment from "moment";

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
    _id: 'curr_user_82hn',
    name: 'Yash'
}
export const dashboardData = {
    users: [
        {
            _id: '1',
            avatar: ['https://avatars.githubusercontent.com/u/16500619?v=4'],
            name: 'Itachi Uchiha',
            username:'uchiha_here',
            friends:20,
            groups:5,
            joindate:moment().format('DD MM YYYY'),
        },
        {
            name: 'Gojo Satoru',
            avatar: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnTGQ9qENyTQURr5wi2oK-6Bc-qgJRXdxgvZ4bSyMGw1jnULbiCoE_UQXWGLdN2ADVzAk&usqp=CAU'],
            _id: '2',
            username:'the_honored_one',
            friends:35,
            groups:2,
            joindate:moment().format('DD MM YYYY'),
        }
    ],
    chats:[
        {
            name: 'Friends Forever',
            _id: '1',
            avatar: ['https://avatars.githubusercontent.com/u/16500619?v=4',
                'https://avatars.githubusercontent.com/u/16500619?v=4',
                'https://static.wikia.nocookie.net/villains/images/6/65/Walter_White2.jpg'

            ],
            members:[
                {
                _id:'1',
                avatar:'https://avatars.githubusercontent.com/u/16500619?v=4'
                },
                {
                _id:'2',
                avatar:'https://avatars.githubusercontent.com/u/16500619?v=4'
                }
            ],
            totalMembers:2,
            totalMessages:20,
            creator:{
                name:'john Doe',
                avatar:'https://www.w3schools.com/howto/img_avatar.png'
            }
        },
        {
            name: 'Group Number 1',
            _id: '2',
            avatar: ['https://avatars.githubusercontent.com/u/16500619?v=4'],
            members:[
                {
                _id:'1',
                avatar:'https://avatars.githubusercontent.com/u/16500619?v=4'
                },
                {
                _id:'2',
                avatar:'https://avatars.githubusercontent.com/u/16500619?v=4'
                },
                {
                _id:'3',
                avatar:'https://avatars.githubusercontent.com/u/16500619?v=4'
                },
                {
                _id:'4',
                avatar:'https://avatars.githubusercontent.com/u/16500619?v=4'
                }
            ],
            totalMembers:4,
            totalMessages:244,
            creator:{
                name:'john Wick',
                avatar:'https://www.w3schools.com/howto/img_avatar.png'
            }
        }
    ],
    messages:[
        {
            attachments:[],
            content:'A guy opens his door ans gets shot, and you think that of me? No. I am the one who knocks!',
            _id:'wugegw9hce',
            sender:{
                avatar:'https://www.massappealdesigns.com/wp-content/uploads/2013/10/BREAKING-BAD-INSPIRED-DESIGN-ARTWORK1.jpg',
                name:'Walter White',
            },
            chat:'chatId',
            groupChat:false,
            createdAt:'2024-02-12',
        },
        {
            attachments:[
                {
                    public_id:'cwe9hech38',
                    url:'https://www.massappealdesigns.com/wp-content/uploads/2013/10/BREAKING-BAD-INSPIRED-DESIGN-ARTWORK1.jpg'
                }
            ],
            content:'A guy opens his door ans gets shot, and you think that of me? No. I am the one who knocks!',
            _id:'wugegvw9hce',
            sender:{
                avatar:'https://www.massappealdesigns.com/wp-content/uploads/2013/10/BREAKING-BAD-INSPIRED-DESIGN-ARTWORK1.jpg',
                name:'Walter White',
            },
            chat:'chatId',
            groupChat:true,
            createdAt:'2024-02-12',
        },


    ]
}