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
			roomId: 1, //room selectionée dès le début
			rooms: rooms,
			messages: [],
			currentUserId: 1234,
			messagesLoaded: false,
		}
	},
	mounted() {},
	methods: {
		fetchMessages({ room, options }) {
			console.log(room)
			console.log(options)

			//options.reset = je clique sur une nouvelle room
			if (options.reset) {
				this.messagesLoaded = false
			}

			// use timeout to imitate async server fetched data
			setTimeout(() => {
				this.messages = messages
				this.messagesLoaded = true
			}, 0)
		},
		sendMessage(params) {
			console.log(params)
			messages.push({
				_id: new Date().getTime(),
				content: params.content,
				sender_id: this.currentUserId,
			})
		},
	},
}
</script>
