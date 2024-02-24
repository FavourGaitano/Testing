import bcrypt from 'bcrypt'
import mssql from 'mssql'
import { Request } from "express";
import Connection from "../../DbHelper/dbhelper";
import { createUser, getAllUsers, getOneUser, updateUser, deleteUser  } from '../user.controller'

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

jest.mock("../../DbHelper/dbhelper");

const mockRequest = (params = {}, body = {}, query = {}) =>
  ({
    params,
    body,
    query,
  } as Request);

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res;
};

describe("Users Controller Test Suite", () => {
  let res: any;
  let user: any;
  let users: any;

  beforeEach(() => {
    res = mockResponse();

    user = {
        name: "Pascal Gaitano",
        email: "andabwa@thejitu.com",
        password: "123456",
        cohort: "22"
      
    };

    users = {
      recordset: [user],
    };
    
});
it("gets all users successfully", async () => {
    const req = mockRequest();

    (Connection.execute as jest.Mock).mockResolvedValueOnce(users);

    await getAllUsers(req, res);

    expect(res.json).toHaveBeenCalledWith({ users: users.recordset });
  });

  it("gets one user by ID successfully", async () => {
    const req = mockRequest({ id: user.user_id });

    (Connection.execute as jest.Mock).mockResolvedValueOnce({
      recordset: [user],
    });

    await getOneUser(req, res);

    expect(res.json).toHaveBeenCalledWith({ user: [expect.any(Object)] });

  });

  it("updates a user successfully", async () => {
    const req = mockRequest({ id: user.User_id }, { name: "Updated Test User" });

   
    (Connection.execute as jest.Mock).mockResolvedValueOnce({
      rowsAffected: [1], 
    });

    await updateUser(req, res);

    
    expect(res.json).toHaveBeenCalledWith({
      message: "User updated successfully",
    });
    expect(res.status).toHaveBeenCalledWith(200); 
  });

  it("deletes a user by ID successfully", async () => {
    const req = mockRequest({ id: user.user_id });

    (Connection.execute as jest.Mock).mockResolvedValueOnce({
      rowsAffected: [1],
    });

    await deleteUser(req, res);

    expect(res.json).toHaveBeenCalledWith({ message: "User deleted successfully" });

  });
})
  