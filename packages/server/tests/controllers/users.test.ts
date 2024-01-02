import { describe, it, afterEach, beforeEach, jest } from '@jest/globals'
import request from 'supertest'
import app from '../../src/index'


const mockData = [
    { id: 1, username: 'admin', password: 123456 },
    { id: 2, username: 'super', password: 123456 },
]

describe('Users Controllers', () => {
    afterEach(() => {
        app.close()   
    })
    it('getUsers', async () => {
        const response = await request(app)
                .post('/users')
                .send({})
    })
})

