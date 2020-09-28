class Server {
    constructor(){
        const express = require('express');

        this.server = express();
   
        this.server.listen(8080);

        this.main();
    }
    main(){
        this.allowOringin();
        //登陆模块
        this.login();
    }
    allowOringin(){
        this.server.all('*',(req,res,next)=>{
            
            res.header('Access-Control-Allow-Origin', 'http://localhost');

            res.header('Access-Control-Allow-Headers', 'Content-Type');

            res.header('Access-Control-Allow-Methods', '*');

            next();
        })
    }
    login(){
        const path = '../controller/login/login';

        const modelPath = '../model/login/login';

        const {Login} = require(path);

        const {Login:Model} = require(modelPath);

        new Login(this.server,new Model());
    }

}

new Server()