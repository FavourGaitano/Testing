import { Router } from "express";
import { checkUserDetails, loginUser, resetPassword } from "../Controller/auth.controller";
import { verifyToken } from "../Middlewares/verifyToken";

const auth_router = Router()

auth_router.post('/', loginUser)
auth_router.post('/checkdetails', verifyToken, checkUserDetails)
auth_router.put('/reset_pwd', resetPassword)

export default auth_router