class Server {
    constructor(){
        const express = require('express');

        this.server = express();
   
        this.server.listen(8080);

        this.main();
    }
    main(){                                                                                           
        //登陆模块
        this.login();
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