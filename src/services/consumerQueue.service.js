'use strict'
const {
    connectToRabbitMq,
    consumerQueue
} = require('../dbs/init.rabbitmq')

class HandleMessagesRabbitMqService {
    async consumerToQueue(queueName) {
        try {
            console.log(`[handleMessagesRabbitmqReceive][consumerToQueue] queueName:${queueName}`)
            const {channel, connection} = await connectToRabbitMq()
            await consumerQueue(channel, queueName)
        } catch (err) {
            console.error(`[handleMessagesRabbitmqReceive][consumerToQueue] err::  ${err}`)
        }
    }
}

module.exports = new HandleMessagesRabbitMqService()