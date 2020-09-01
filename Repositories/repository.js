const fs = require("fs");
const crypto = require("crypto")
module.exports = class Repository {
    

    constructor(filename){
        if(!filename)
        throw new Error("creating a user requires a repository")
    
    this.filename = filename;
    try{
        fs.accessSync(this.filename)
    }catch(err){
        fs.writeFileSync(this.filename,"[]")
    }
    }
    

async create(attrs){
    attrs.id = await this.getRandomId();
    const records = await this.getAll();
    records.push(attrs);
    await this.writeAll(records);
    return attrs;
}

async getAll(){
return JSON.parse(await fs.promises.readFile(this.filename,{encoding : "utf8"}));
}


async writeAll(records){
    await fs.promises.writeFile(this.filename,JSON.stringify(records,null,2));
}

getRandomId(){
    return crypto.randomBytes(4).toString("hex");
}


async findById(id){
    const records = await this.getAll();
    return records.find((record)=> id=== record.id)
}

async delete(id){
    const records = await this.getAll();
   const newRecords=  records.filter(record=> record.id!==id)
   await this.writeAll(newRecords);
}
 

async update(id,attr){
    const records = await this.getAll();
    const rec = records.find(record=> record.id===id)
    if(!rec)
    throw new Error(`there is no record with the id ${id}`)
    Object.assign(rec,attr);
    await this.writeAll(records);
}

async  filter(filters){
    const records = await this.getAll();
    for(let record of records){
        let found =true;
        for(let key in filters)
        if(filters[key]!==record[key])
        found = false;
        if(found)
        return record;
    }
}


}
