const messageModel = require('../models/messages')

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
            const { name, message, user_id } = req.body;
            const date = Date.now()
            const response = await messageModel.save(name, message, user_id, date);
            if (!response.error){
                res.status(201).send({
                    success: 'mensaje guardado con exito'
                })
            }else{
                res.status(404).send({
                    error: 'Hubo un porblema al tratar enviar el mensaje',
                    description: response.error
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
                    description: response.error
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