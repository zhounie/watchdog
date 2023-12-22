import { test, describe, jest, it, expect } from '@jest/globals'
import request from 'supertest'
import app from '../src/index'
import jwt from 'jsonwebtoken'

describe('测试Login', () => {
    test('登录成功', async () => {
            const response = await request(app)
                .post('/user/login')
                .send({
                    username: 'admin',
                    password: '123456'
                })
                expect(response.status).toBe(200)
                expect(response.body.code).toBe(200)
                expect(
                    jwt.verify(response.body.data, 'wocao')
                ).toHaveProperty("username", 'admin')
    })
    test('登录失败', async () => {
        const response = await request(app)
            .post('/user/login')
            .send({
                username: 'admin',
                password: '1234566'
            })
        expect(response.status).toBe(200)
    })
})
