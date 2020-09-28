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
        const data = this.model.login(req.body.userName);

        if(data)
        {   //
            if(data.password == req.body.password)
            {   //返回webtoken
                res.send('{"msg":"登陆成功","webtoken":""}')
            }
            else{ res.send('{"msg":"密码输入错误"}'); }
        }
        else{ res.send('{"msg":"账号输入错误"}'); } 
    }
}

exports.Login = Login;