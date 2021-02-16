<template>
	<chat-window
		:current-user-id="currentUserId"
		:room-id="roomId"
		:rooms="rooms"
		:messages="messages"
		:rooms-loaded="true"
		:messages-loaded="messagesLoaded"
		@fetch-messages="fetchMessages"
		@send-message="sendMessage"
		@add-room="addRoom"
	/>
</template>

<script>
import ChatWindow from 'vue-advanced-chat'
import 'vue-advanced-chat/dist/vue-advanced-chat.css'
import { rooms } from './data/rooms'
import { messages } from './data/messages'

export default {
	components: {
		ChatWindow,
	},
	data() {
		return {
			roomId: 'room_1', //room selectionée dès le début
			rooms: rooms,
			messages: [],
			currentUserId: 1234,
			messagesLoaded: false,
		}
	},
	mounted() {},
	methods: {
		fetchMessages({ room, options }) {
			//options.reset = je clique sur une nouvelle room
			if (options.reset) {
				this.messagesLoaded = false
				this.roomId = room.roomId
			}

			// use timeout to imitate async server fetched data
			setTimeout(() => {
				this.messages = messages[this.roomId]
				this.messagesLoaded = true
			}, 0)
		},
		sendMessage(params) {
			const date =
				new Date().getDate() +
				' ' +
				new Date().toLocaleString('default', { month: 'long' }) +
				' ' +
				new Date().getFullYear()

			const timestamp = new Date().toLocaleString('default', {
				hour: 'numeric',
				minute: 'numeric',
				hour12: false,
			})

			messages[this.roomId].push({
				_id: new Date().getTime(),
				content: params.content,
				senderId: this.currentUserId,
				date: date,
				timestamp: timestamp,
				distributed: true,
			})
			console.log(params.content)

			const roomIndex = rooms.findIndex((room) => room.roomId === this.roomId)

			rooms[roomIndex].lastMessage = {
				content: params.content,
				senderId: 1234,
				username: 'John Doe',
				timestamp: timestamp,
			}
		},
		addRoom() {
			const roomId = 'room_' + new Date().getTime()

			rooms.push({
				roomId: roomId,
				roomName: 'Room 2',
				avatar: 'https://i.pravatar.cc/30',
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
			})
			//création d'une nouvelle room dans les messages
			messages[roomId] = []

			this.roomId = roomId
			this.messages = []
		},
	},
}
</script>

<style></style>
