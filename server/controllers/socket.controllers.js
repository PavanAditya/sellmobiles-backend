const {
	formSchema
} = require('../models/user.model');
const {
	messages
} = require('../models/message.model');
const mongodb = require('mongodb');

class QueryHandler {

	constructor() {
		this.ObjectID = mongodb.ObjectID;
	}

	async getUserByUsername(username) {
		try {
			const result = await formSchema.find({
				firstName: username
			});
			return result[0];
		} catch (error) {
			return error;
		}
	}

	async addSocketId({
		userId,
		socketId
	}) {
		const data = {
			id: userId,
			value: {
				$set: {
					socketId: socketId,
					online: 'Y'
				}
			}
		};
		try {
			const result = await formSchema.findOneAndUpdate({
				_id: this.ObjectID(data.id)
			}, data.value);
			return result;
		} catch (error) {
			return error;
		}
	}

	async getUserInfo({
		userId,
		socketId = false
	}) {
		let queryProjection = null;
		if (socketId) {
			queryProjection = {
				'socketId': true
			};
		} else {
			queryProjection = {
				'firstName': true,
				'online': true,
				'_id': false,
				'id': '$_id'
			};
		}
		try {
			const result = await formSchema.aggregate([{
				$match: {
					'_id': this.ObjectID(userId)
				}
			}, {
				$project: queryProjection
			}]);
			return (socketId ? result[0]['socketId'] : result);
		} catch (error) {
			return error;
		}
	}

	async getChatList(userId) {
		try {
			const result = await formSchema.aggregate([{
				$match: {
					'socketId': {
						'$ne': userId
					}
				}
			}, {
				$project: {
					'firstName': true,
					'online': true,
					'_id': false,
					'id': '$_id'
				}
			}]);
			return result;
		} catch (error) {
			return error;
		}
	}

	async insertMessages(messagePacket) {
		try {
			const result = await messages.insertMany(messagePacket);
			return result;
		} catch (error) {
			return error;
		}
	}

}

module.exports = new QueryHandler();