const knex = require('knex')

class Products {
    constructor() {
        
        // Connection Pool
        this.db = knex({
            client:"mysql",
            connection:{
                host:"localhost",
                port:3306,
                user:"root",
                password:"rootpass",
                database:"products_db"
            }
        })
    }

// Create table for Products
    async createTable(){
        try {
            await this.db.schema.dropTableIfExists('products')
            await this.db.schema.createTable('products', (table) => {
                table.increments('id')
                table.string('name')
                table.string('date')
                table.double('price')
                table.string('thumbnail')
            })
            return {error: false, errorDescrip:false}
        } catch (error) {
            return {error: true, errorDescrip:error}
        }
    }


// Save new Product
    async save(title, date, price, thumbnail) {
        let producto = {
            date: date,
            name: title,
            thumbnail: thumbnail,
            price: price
        };
        try {
            await this.db("products").insert(producto)
            return {error:false, product:producto, createdDate: producto.date}
        } catch (error) {
            return {error:true, errorDescrip:error, id:null, createdDate:null};
        }
    }

// Get all Products
    async getAll() {
        try {
            const products = await this.db.select().from('products')
            return {products:products, error:false, errorDescrip: null};
        } catch (error) {
            return {products: null, error:true, errorDescrip:error}
        }
    }

// Get Product by ID
    async getById(id) {
        try {
            const product = await this.db('products').where({ id }).first()
            return {product:product, error:false, errorDescrip: null};
        } catch (error) {
            return {product: null, error:true, errorDescrip:error}

        }
    }

// Delet Product by ID
    async deleteById(id) {
        try {
            await this.db('products').where({ id }).del()
            return {error:false, errorDescrip:null}
        } catch (error) {
            return {error:true, errorDescrip:error}

        }
    }

// Delete all Products
    async deleteAll() {
        try {
            this.createTable()
            return {error:false, errorDescrip:null}
        } catch (error) {
            return {error:true, errorDescrip:error}
        }
    }

// Update Product by ID
    async updateById(id, newProduct) {
        try {
            await this.db('products').where({ id }).update(newProduct)
            return {error:false, errorDescrip:null}
        } catch (error) {
            return {error:true, errorDescrip:error}
        }
    }
}


module.exports = new Products();