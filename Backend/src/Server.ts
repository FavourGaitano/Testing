import express,  {NextFunction, Request, Response, json} from 'express'
import cors from 'cors'
import userRouter from './Routes/user.routes'
import auth_router from './Routes/auth.router'


const app = express()

app.use(cors())
app.use(json())

app.use('/users', userRouter)
app.use('/auth', auth_router)




app.use((error: Error, req: Request, res: Response, next: NextFunction)=>{
    res.json({
        message: error.message
    })
})

let port:number = 4001;

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`); 
})

console.error('This is an error message');