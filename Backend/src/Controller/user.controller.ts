import { Request, Response } from "express";
import {v4} from 'uuid'
import { User } from "../Interface/user.interface";
import mssql from 'mssql';
import bcrypt from 'bcrypt'
import { sqlConfig } from '../Config/sql.Config';
import Connection from '../DbHelper/dbhelper';
import { registerUserSchema } from '../Validators/users.validators';

const dbhelper = new Connection

export const createUser = async(req: Request, res: Response)=>{
    try {
        const id = v4()

        
        
        const {name, email, cohort, password,}:User = req.body
        
        console.log(req.body);
        const hashed_pwd = await bcrypt.hash(password, 5)

     

        

        let {error} = registerUserSchema.validate(req.body)

        if(error){
          return res.status(404).json({
              error: error.details[0].message
          })
        }

      const pool = await mssql.connect(sqlConfig)

        let result = (await pool.request()

        .input('user_id', mssql.VarChar, id)
        .input('name', mssql.VarChar, name)
        .input('email', mssql.VarChar, email)
        .input('cohort', mssql.VarChar, cohort)
        .input('password', mssql.VarChar, hashed_pwd)
        .execute('registerUser')).rowsAffected

        console.log(result);

        return res.status(200).json({

            message: 'Account created successfully',
            // user: newUser
        })


    } catch (error) {
        return res.json({error: error})
    }

}

//Dbhelper get all users
export const getAllUsers = async(req:Request, res: Response)=>{
    try {
        

    //   let {error} = registerUserSchema.validate(req.body)

    //   if(error){
    //     return res.status(404).json({
    //         error: error.details[0].message
    //     })
    // }

        let users = (await dbhelper.execute("getAllUsers")).recordset
        

        if(users.length > 0){
            return res.json({
                users
            })
        }else{
            return res.json({
                message: "No users found"
            })
        }
        
    } catch (error:any) {
        return res.json({
            error: error.originalError.info.message
        })
    }
}

//Dbhelper get user by id

export const getOneUser = async (req: Request, res: Response) => {
    try {
      const id = req.params.user_id;
      console.log("User ID:", id);
      let user = (await dbhelper.execute("getOneUser", { user_id: id })).recordset;
  
      return res.json({ user });
    } catch (error) {
      console.log("Error in getting data from database", error);
      return res
        .status(400)
        .json({ message: "There was an issue retrieving user" });
    }
  };

//Dbhelper update user

export const updateUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.user_id;

        const {name, email, cohort, password,}:User = req.body

      console.log("User ID:", id);

      const hashed_pwd = await bcrypt.hash(password, 5)


      let user = await (dbhelper.execute("updateUser", { user_id:id, name, email, password:hashed_pwd, cohort}));
  
      return res.json({ 
        
        message: "User updated successfully"
     });

    } catch (error) {
      console.log("Error in updating data from database", error);
      return res
        .status(400)
        .json({ message: "There was an issue updating user" });
    }
  };

    //Dbhelper delete user

    export const deleteUser = async (req: Request, res: Response) => {
        try {
          const id = req.params.user_id;
          console.log("User ID:", id);
          let user = await dbhelper.execute("deleteUser", { user_id: id });
      
          return res.json({  message: "User deleted successfully" });
        } catch (error) {
          console.log("Error in getting data from database", error);
          return res
            .status(400)
            .json({ message: "There was an issue deleting user" });
        }
      };