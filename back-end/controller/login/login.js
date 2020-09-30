class Login {
    constructor(server,model){
        const {Webtoken} = require('../../util/webtoken'); 

        this.server = server;

        this.model = model;

        this.webtoken = Webtoken;

        this.login = this.login.bind(this);

        this.middleware();
        //监听post请求
        this.server.post('/login',this.login)
    }
    middleware(){
        const parser = require('body-parser')
        //使用中间件来处理请求数据，以保证可以获取到请求发送过来的x-www-form-urlencoded
        this.server.use(parser.urlencoded({ extended: true }));  

        this.server.all('*',(req,res,next)=>{
            
            res.header('Access-Control-Allow-Origin', 'http://localhost');

            res.header('Access-Control-Allow-Headers', 'Content-Type');

            res.header('Access-Control-Allow-Methods', '*');
            //验证token
            this.validate(req,res,next);
        })
    }
    login(req,res){
        const data = this.model.login(req.body.userName);

        if(data)
        {   //
            if(data.password == req.body.password)
            {

                //返回webtoken
                res.send('{"msg":"登陆成功","webtoken":""}')
            }
            else{ res.send('{"msg":"密码输入错误"}'); }
        }
        else{ res.send('{"msg":"账号输入错误"}'); } 
    }
    validate(req,res,next){

        if(this.webtoken.check())
        {
            next();
        }
        else
        { res.send('{"msg":""}'); }
    }
}

exports.Login = Login;