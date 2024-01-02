import { beforeEach, describe, it, jest } from '@jest/globals'
import { ErrorModel } from '../../src/models'
import Errors from '../../src/db/errors'

// jest.mock('../../src/db/errors', () => {
//     return {
//         __esModule: true,
//         insertMany: jest.fn()
//     }
// })

describe('Error Model', () => {
    const params = []

    Errors.insertMany = jest.fn().mockResolvedValue(params)

    let errorModel
    beforeEach(() => {
        errorModel = new ErrorModel()
    })

    it('save', async () => {
        const result = await errorModel.save(params)
        console.log(result);
    })

    it('get', () => {
        
    })
})