class Login {
    constructor(server){
        this.server = server;

        this.login = this.login.bind(this);
        //监听post请求
        this.server.get('/login',this.login)
    }
    login(req,res){
        res.send('{"msg":"登陆成功"}')
    }
}

exports.Login = Login;