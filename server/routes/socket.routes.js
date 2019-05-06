const helper = require('../controllers/socket.controllers');

class Socket {

	constructor(socket) {
		this.io = socket;
	}

	socketEvents() {
		this.io.on('connection', (socket) => {
			// ! Get the user's Chat list
			socket.on('chat-list', async (data) => {
				if (data.userId === '') {
					this.io.emit('chat-list-response', {
						error: true,
						message: 'User Not Found'
					}); // TODO: Change response format
				} else {
					try {
						const [UserInfoResponse, chatlistResponse] = await Promise.all([
							helper.getUserInfo({ // TODO
								userId: data.userId,
								socketId: false
							}),
							helper.getChatList(socket.id)
						]);
						this.io.to(socket.id).emit('chat-list-response', {
							error: false,
							singleUser: false,
							chatList: chatlistResponse
						}); // TODO: Change response format
						// * Brodcast emit removed (socket for only one user at a time)
					} catch (error) {
						this.io.to(socket.id).emit('chat-list-response', {
							error: true,
							chatList: []
						}); // TODO: Change response format
					}
				}
			});

			// ! send the messages to the user
			socket.on('add-message', async (data) => {
				if (data.message === '') {
					this.io.to(socket.id).emit('add-message-response', {
						error: true,
						message: 'Message Not found'
					}); // TODO: Change response format
				} else if (data.fromUserId === '') {
					this.io.to(socket.id).emit('add-message-response', {
						error: true,
						message: 'Bad Request'
					}); // TODO: Change response format
				} else if (data.toUserId === '') {
					this.io.to(socket.id).emit('add-message-response', {
						error: true,
						message: 'Bad Request'
					}); // TODO: Change response format
				} else {
					try {
						const [toSocketId, messageResult] = await Promise.all([
							helper.getUserInfo({
								userId: data.toUserId,
								socketId: true
							}), // TODO: Change response format
							helper.insertMessages(data)
							// messages.insertMany(data)
						]);
						this.io.to(toSocketId).emit('add-message-response', data); // TODO: Change response format
					} catch (error) {
						this.io.to(socket.id).emit('add-message-response', {
							error: true,
							message: 'Message is not stored. Bad Request'
						}); // TODO: Change response format
					}
				}
			});

			// TODO: Needs to be verified and should be removed completely
			// ! Logout the user
			socket.on('logout', async (data) => {
				try {
					const userId = data;
					// await helper.logout(userId);
					this.io.to(socket.id).emit('logout-response', {
						error: false,
						message: 'User Not Logged in',
						userId: userId
					});
					socket.broadcast.emit('chat-list-response', {
						error: false,
						userDisconnected: true,
						userid: userId
					});
				} catch (error) {
					this.io.to(socket.id).emit('logout-response', {
						error: true,
						message: 'Bad Request',
						userId: ''
					});
				}
			});

			// TODO: Needs to be verified and should be removed completely
			// ! Login the user
			socket.on('login', async (data) => {
				try {
					const userId = data;
					// await helper.logout(userId);
					this.io.to(socket.id).emit('login-response', {
						error: false,
						message: 'User Not Logged in',
						userId: userId
					});
					socket.broadcast.emit('chat-list-response', {
						error: false,
						userConnected: true,
						userid: userId
					});
				} catch (error) {
					this.io.to(socket.id).emit('login-response', {
						error: true,
						message: 'Bad Request',
						userId: ''
					});
				}
			});

			// ! sending the disconnected user to all socket users.
			socket.on('disconnect', async () => {
				socket.broadcast.emit('chat-list-response', {
					error: false,
					userDisconnected: true,
					userid: socket.request._query['userId']
				}); // TODO: Change response format

			});

		});
	}

	// ! Socket Configuration
	socketConfig() {
		this.io.use(async (socket, next) => {
			try {
				await helper.addSocketId({
					userId: socket.request._query['userId'],
					socketId: socket.id
				});
			} catch (error) {
				return error;
			}
			next();
		});

		this.socketEvents();
	}

}

module.exports = Socket;