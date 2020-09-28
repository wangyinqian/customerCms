class Login {
    constructor(server,model){
        const parser = require('body-parser')

        this.server = server;

        this.model = model;

        this.login = this.login.bind(this);
        //使用中间件来处理请求数据，以保证可以获取到请求发送过来的x-www-form-urlencoded
        this.server.use(parser.urlencoded({ extended: true }));
        //监听post请求
        this.server.post('/login',this.login)
    }
    login(req,res){
        console.log(req.body.userName);
        
        res.send('{"msg":"登陆成功"}')
    }
}

exports.Login = Login;