export interface User{
    user_id:string;
    name:string;
    email:string;
    role:string;
    password:string;
    cohort: number;
   
}

export interface loginUserDetails{
    user_id: string,
    name: string,
    email: string,
    role: string,
    isWelcomed: boolean,
}