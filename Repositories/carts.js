const Repository  = require("./repository");
const { report } = require("../routes/products");
class Cart extends Repository{

}

module.exports = new Cart("carts.json")