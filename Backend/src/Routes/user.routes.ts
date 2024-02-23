import {Router} from "express"
import {createUser, getAllUsers, getOneUser, updateUser, deleteUser} from "../Controller/user.controller"
import { verifyToken } from "../Middlewares/verifyToken";

const userRouter = Router()

userRouter.post('/', createUser)
userRouter.get('/' , verifyToken, getAllUsers)
userRouter.get("/:user_id" , verifyToken, getOneUser)
userRouter.put("/:user_id" , verifyToken, updateUser);
userRouter.delete("/:user_id" , verifyToken, deleteUser);


export default userRouter