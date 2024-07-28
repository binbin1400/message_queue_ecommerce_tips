'use strict'

const amqplib = require('amqplib')

const connectToRabbitMq = async () => {
    try {
        const connection = await amqplib.connect(
            'amqp://rabbitmq:rabbitmq@localhost:5672'
        )

        if (!connection) throw new Error('Rabbitmq connection error')
        const channel = await connection.createChannel()
        return {
            channel,
            connection,
        }
    } catch (err) {
        console.error(`[connectToRabbitMq] err:: ${err}`)
    }
}

const consumerQueue = async (channel, queueName) => {
    try {
        await channel.assertQueue(queueName, {
            duarable: true,
        })
        console.log(`Waiting for messages....`)
        channel.consume(queueName, msg => {
            console.log(`Received ${queueName} msg: ${msg.content.toString()}`)
        }, {
            /*
            * NHẬN TIN NHẮN -> GỬI RỒI
            * NẾU NOACK = FALSE -> GỬI LẠI */
            noAck: true
        })
    } catch (err) {
        console.error(`[consumerQueue] err:${err}`)
    }
}

const testFuncConnectToRabbitMq = async () => {
    try {
        const {channel, connection} = await connectToRabbitMq()
        // publish message to a queue
        const queue = 'test-queue'
        const message = 'Hello shopDev tips javascript'

        await channel.assertQueue(queue)
        await channel.sendToQueue(queue, Buffer.from(message))

        // close connection
        await connection.close()
    } catch (err) {
        console.error(`[testFuncConnectToRabbitMq] err:: ${err}`)
    }
}

module.exports = {
    connectToRabbitMq,
    testFuncConnectToRabbitMq,
    consumerQueue
}
