class Login {
    constructor(database,collection){
        const {SQL} = require('../../util/sql');

        this.sql = SQL;
    }
    login(){
        this.sql.connect('customer','')
    }

}

exports.Login = Login;