const mongoose = require('mongoose')
const { normalize, desnormalize, schema } = require('normalizr')

class Messages {
    constructor() {
        // Connection Pool
        const authorsMsg = new mongoose.Schema({
            email: String,
            firstName: String,
            lastName: String,
            age: Number,
            alias: String,
            avatar: String,
            createdDate: {type: Number, default: Date.now()}
        })
        const messageSchema = new mongoose.Schema({
            author: [authorsMsg],
            text: String
        })
        this.model = mongoose.model("messages", messageSchema)
    }


// Save new Message
    async save(firstName, lastName, age, alias, email, message, createdDate) {
        let msg = {
           author:{
               email: email,
               firstName: firstName,
               lastName: lastName,
               age: age,
               alias: alias,
               avatar: avatar,
               createdDate: createdDate
           },
           text:message 
        }
        try {
            await this.model.create(msg)
            return {error:false, errorDescrip:null, createdDate: msg.date}
        } catch (error) {
            return {error:true, errorDescrip:error,  createdDate:null};
        }
    }

// Get all Messages
    async getAll(){
        try {
            const messages =  await this.model.find()
            
            const author = new schema.Entity('authors')
            const text = new schema.Entity('text')
            const message = new schema.Entity('message', {
                author: author,
                text: text
            })
            const Messages = new schema.Entity('messages', {
                id: 'Messages',
                messages: [message]
            })

            const normalizeData = normalize(messages, Messages)
            return {messaes:normalizeData, error:false, errorDescrip: null};
        } catch (error) {
            return {messages: null, error:true, errorDescrip:error}
        }
    }
}


module.exports = new Messages();