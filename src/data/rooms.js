export const rooms = [
	{
		roomId: 'room_1',
		roomName: 'Room 1',
		avatar: 'https://i.pravatar.cc/30',
		lastMessage: {
			content: 'Last message received',
			senderId: 1234,
			username: 'John Doe',
			timestamp: '10:20',
		},
		users: [
			{
				_id: 1234,
				username: 'John Doe',
				avatar: 'https://i.pravatar.cc/30',
			},
			{
				_id: 4321,
				username: 'John Snow',
				avatar: 'https://i.pravatar.cc/30',
			},
		],
	},
]
