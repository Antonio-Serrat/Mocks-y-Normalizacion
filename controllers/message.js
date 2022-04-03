const messageModel = require('../models/messages')
const path = require('path');

module.exports = {

    // Drop and create table
    dropCreateTable: async (req, res) => {
        try {
            const response = await messageModel.createTable()
            if (!response.error){
                res.status(200).send({
                    success: 'tabla creada correctamente'
                })            
            }else{
                res.status(404).send({
                    error: 'Hubo un porblema al tratar de crear la tabla',
                    description: response.error
                })
            }
        } catch (error) {
            res.status(400).send({
                error: 'No se pudo crear la tabla',
                description: error
            })
        }
    },
    
    // Add new message
    newMessage: async (req, res) =>{
        try {
            const { firstName, email, lastName, alias, age, message, user_id } = req.body;
            const createdDate = Date.now()
            const avatar = path.join("static/img/" + req.file.filename)
            console.log(avatar)
            const response = await messageModel.save(firstName, email, lastName, alias, age, avatar, message, user_id, createdDate);
            if (!response.error){
                res.status(201).send({
                    success: 'mensaje guardado con exito'
                })
            }else{
                res.status(404).send({
                    error: 'Hubo un porblema al tratar enviar el mensaje',
                    description: response.errorDescrip
                })
            }
        } catch (error) {
            res.status(400).send({
                error:'Problema al tratar de guardar el mensaje', 
                description : error    
            })
        }
      },
    
    // Get all messages
    getAll: async (req, res) =>{
        try {
            const response = await messageModel.getAll()
            if (!response.error){
                res.status(201).send(response.messages)
            }else{
                res.status(404).send({
                    error: 'Hubo un porblema al intentar cargar todos los mensajes',
                    description: response.errorDescrip
                })
            }
        } catch (error) {
            res.status(400).send({
                error:'Problema al tratar de traer todos los mensajes', 
                description : error    
            })
        }
    },
}