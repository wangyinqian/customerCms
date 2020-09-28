let promise = null;

exports.SQL = {
    /**@property url {stirng} 链接数据库的url */
    url:'mongodb://127.0.0.1:27017',
    /**
     * @method connect 连接数据库
     * @author wyq
     * @date 2020-09-23
     * @param {string} database 数据库名称
     * @param {string} collection 集合名称 
     * @return {SQL} SQL实例
     */
    connect(database,collection){
        const mongodb = require('mongodb');

        const client = mongodb.MongoClient;

        promise = client.connect(this.url,{useUnifiedTopology:true})
        .then(db=>{
            const dbase = db.db(database);
        
            const coll = dbase.collection(collection);

            return [db,coll];
        })
        .catch(err=>err);

        return this;
    },
    query(query){ 
        return promise.then(([db,coll])=>{
            const mise = coll.findOne(query); 

            promise = null;

            return mise.then(data=>(db.close(),data))
        })
    },
    add(doc){ 
        return promise.then(([db,coll])=>{
            const mise = coll.insertOne(doc); 

            promise = null;

            return mise.then(result=>(db.close(),result))
        })
    },
    update(filter,update){ 
        return promise.then(([db,coll])=>{
            const mise = coll.updateOne(filter,update); 

            promise = null;

            return mise.then(result=>(db.close(),result))
       }) 
    },
    save(doc){
        return promise.then(([db,coll])=>{
            const mise = coll.save(doc); 

            promise = null;

            return mise.then(result=>(db.close(),result))
       }) 
    },
    delete(filter){
        return promise.then(([db,coll])=>{
            const mise = coll.deleteOne(filter); 

            promise = null;

            return mise.then(result=>(db.close(),result))
       }) 
    },
    remove(selector){
        return promise.then(([db,coll])=>{
            const mise = coll.remove(selector); 

            promise = null;

            return mise.then(result=>(db.close(),result))
       }) 
    }
}