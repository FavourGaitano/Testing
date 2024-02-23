import bcrypt from 'bcrypt'
import mssql from 'mssql'
import { createUser } from '../user.controller'

describe("User Registration", ()=>{

    let res: any

    beforeEach(()=>{
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    it('successfully registers a user', async()=>{
        const req ={
            body:{
                name: "admin",
                email: "favour@thejitu.com",
                cohort:"22",
                password: "admin"
                
            }
        }

        jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce("HashedPwdkjshghgksjgkj" as never)

        const mockedInput = jest.fn().mockReturnThis() //makes it chainable

        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: []})

        const mockedRequest = {
            input: mockedInput,
            execute: mockedExecute
        }

        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)

        await createUser(req as any, res)

        expect(res.json).toHaveBeenCalledWith({message: "Account created successfully"})
        expect(res.status).toHaveBeenCalledWith(200)

    })


})