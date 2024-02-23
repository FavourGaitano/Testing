import dotenv from 'dotenv'
import mssql from 'mssql'


dotenv.config();


export const sqlConfig = {

    user: process.env.DB_USER || 'sa', 
    password: process.env.DB_PWD || 'SQL-SERVER' ,
    database: process.env.DB_NAME || 'Jitu',
    server :'FAVOUR\\FAVOUR',
    SECRET: "IUTR87GJWEF",

  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false, 
    trustServerCertificate: false 
    }
};

console.log(sqlConfig);

let connect = async () =>{
    let pool = await mssql.connect(sqlConfig)

    if(pool.connected){
        console.log("connected");

        // let query = 'CREATE TABLE Users(User_id VARCHAR(100) NOT NULL, Name VARCHAR(100) NOT NULL, Email VARCHAR(255) NOT NULL UNIQUE, Role VARCHAR(20), Password VARCHAR(200) NOT NULL, Specialization_area VARCHAR(200))'

        // // let query2 = 'DROP TABLE Users'
        // let result = (await (await pool.connect()).query(query)).rowsAffected

        // console.log(result);
        
    }else{
        console.log('not connected');
        
    }
}

connect()
