//MongoClient được sử dụng để tạo và quản lý kết nối đến cơ sở dữ liệu MongoDB, 
//nghĩa lớp trợ giúp kết nối đến MongoDB
const {MongoClient} = require("mongodb");

class MongoDB {
    static connect = async (uri) => {
        if(this.client)
            return this.client;
        this.client = await MongoClient.connect(uri);
        return this.client;
    };
}

module.exports = MongoDB;