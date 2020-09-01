const fs = require("fs");
const crypto = require("crypto")
const util = require('util');
const scrypt = util.promisify(crypto.scrypt);
const Repository = require("./repository")
class UserRepository extends Repository{

    async create(attrs){
        attrs.id = await this.getRandomId();
    
        const salt = crypto.randomBytes(8).toString('hex');
        const buf = await scrypt(attrs.password, salt, 64);
    
    
        const records = await this.getAll();
        const record = {
            ...attrs,
            password: `${buf.toString('hex')}.${salt}`
          };
          
        records.push(record);
        await this.writeAll(records);
        return record;
    }




    async comparePassword(saved,supplied){
        const [hashed,salt]= saved.split(".")
        const hashedSupplied = await scrypt(supplied,salt,64);
       
        return  hashedSupplied.toString("hex")===hashed;
    }
}


module.exports = new UserRepository("users.json");