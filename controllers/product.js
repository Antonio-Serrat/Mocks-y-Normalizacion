
const path = require('path');
const productModel = require('../models/products')
const mock = require('../models/fakerProducts')

admin = true
module.exports = {

    // Drop and create table
    dropCreateTable:  async (req, res) => {
        try {
            const response = await productModel.createTable()
            if(!response.error){
                res.status(200).send({
                    success: 'tabla creada correctamente'
                })
            }else {
                res.status(404).send({
                    error: 'Hubo un porblema al tratar de crear la tabla',
                    description: error
                })            }
        } catch (error) {
            res.status(400).send({
                error: 'No se pudo crear la tabla',
                description: error
            })
        }
    },
    
    // Get all produts
    get: async (req, res) => {
        try {
            const response =  await productModel.getAll()
            if(response.error) {
                res.status(404).send({
                    error:'Hubo un inconveniente al tratar de recuperar todos los prodcutos, trate nuevamente en unos minutos.',
                    errorDesription: response.errorDescrip
                })
             }else { 
                res.status(200).send(response.products)    
             }
        } catch (error) {
            res.status(400).send({
                error:'Problema al intentar obtener todos los productos', 
                description : error    
            })
        }
    },
    
    // Get product by id
    getById: async (req, res)=> {
        try {
            const response = await productModel.getById(req.params.id)
            if(response.error) { 
                res.status(404).send({
                    error:'El producto no existe o el id es erroeo',
                    errorDesription: response.errorDescrip
                })
             }else  {
                res.status(200).send(response.product)
             }
        } catch (error) {
            res.status(400).send({
                error:'Problema al tratar de obtener el producto', 
                description : error    
            })
        }
    },
    
    // Add new product
    create: async (req, res) =>{
        try {
            if(!admin){
                res.status(403)
                .send({
                    error: 'Usted no posee el permiso de administrador para realizar esta llamda'
                })
            }else{
                const { title, price} = req.body;
                const date = Date.now()
                const thumbnail = path.join("static/img/" + req.file.filename)
                await productModel.save(title, date, parseFloat(price), thumbnail).then( response => {
                    if(response.error){
                        res.status(404).send({
                            error: 'No fue posible agregar el producto',
                            errorDesription: response.errorDescrip
                        })
                    }else {
                        res.status(201).send({
                            success: 'Producto creado con exito', 
                            product:response.product, 
                            createdDate:response.createdDate
                        })
                    }
                });
            }
        } catch (error) {
            res.status(400).send({
                error:'Problema al tratar de agregar un nuevo prodcuto', 
                description : error    
            })
        }
      },
    
    
    // Update product by id
    update: async (req, res) => {
        try {     
            if(!admin){
                res.status(403)
                .send({
                    error: 'Usted no posee el permiso de administrador para realizar esta llamda'
                })
            }else{
                const newProduct = {}
                const { Name, price, description, code, stock} = req.body;
                const thumbnail = path.join("static/img/" + req.file.filename)
                newProduct.date = Date.now()
                newProduct.Name = Name
                newProduct.description = description
                newProduct.code = code
                newProduct.thumbnail = thumbnail
                newProduct.price = price
                newProduct.stock = stock
                const response = await productModel.updateById(req.params.id, newProduct)
                if(response.error){
                    res.status(404).send({
                        error: 'No fue posible actualizar el producto',
                        errorDesription: response.errorDescrip
                    })
                }else {
                    res.status(200).send({
                        success: 'Producto actualizado'
                    })
                }
            }
        } catch (error) {
            res.status(400).send({
                error:'Problema al tratar de actualizar el producto', 
                description : error    
            })
        }
    },
    
    // Delete product by id
    deleteById: async (req, res)=> {
        try {
            if(!admin){
                res.status(403)
                .send({
                    error: 'Usted no posee el permiso de administrador para realizar esta llamda'
                })
            }else{
                const response = await productModel.deleteById(req.params.id)
                if(response.error){
                    res.status(404).send({
                        error:'No se encontro el producto',
                        description : error
                    })
                } else {
                    res.status(200).send({
                        success: 'Producto eliminado con exito'
                    })
                }
            }
        } catch (error) {
            res.status(400).send({
                error:'Problema al tratar de eliminar el producto', 
                description : error    
            })
        }
    },

    // test with Faker mocks data
    testing: (req, res)=> {
        try{
            const response =  mock.createData()
            if(response.error){
                res.status(404).send({
                    error: 'Problema al traer data dummy',
                    description: response.errorDescrip
                })
            }else{
                res.status(201).send(response.products)
            }
        }catch(error){
            res.status(400).send({
                error:'Problema al tratar de eliminar el producto', 
                description : error    
            })
        }
    }
}
