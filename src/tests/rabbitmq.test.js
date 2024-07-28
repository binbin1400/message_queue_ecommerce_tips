'use strict'

const { testFuncConnectToRabbitMq } = require('../dbs/init.rabbitmq')

describe('Rabbit MQ connection', () => {
  it('should connect to successful RabbitMQ', async () => {
    const result = await testFuncConnectToRabbitMq()
    expect(result).toBeUndefined()
  })
})
