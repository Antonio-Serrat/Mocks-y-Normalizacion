const mongoose = require('mongoose')
const { normalize, desnormalize, schema } = require('normalizr')

class Messages {
    constructor() {
        // Connection Pool
        const authorSchema = new mongoose.Schema({
            email: String,
            firstName: String,
            lastName: String,
            age: Number,
            alias: String,
            avatar: String,
            createdDate: {type: String, default: Date.now()}
        })
        const messageSchema = new mongoose.Schema({
            userId: String,
            author: authorSchema,
            text: String
        })
        this.model = mongoose.model("messages", messageSchema)
    }


// Save new Message
    async save(firstName, email, lastName, alias, age, avatar, message, user_id, createdDate) {
        let msg = {
            userId: user_id,
            author: {
                email: email,
                firstName: firstName,
                lastName: lastName,
                age: age,
                alias: alias,
                avatar: avatar,
                createdDate: createdDate
            },
            text: message 
        }
        try {
            console.log(msg)
            this.model.create(msg)
            return {error:false, errorDescrip:null, createdDate: message.createdDate}
        } catch (error) {
            return {error:true, errorDescrip:error,  createdDate:null};
        }
    }

// Get all Messages
    async getAll(){
        try {
            const messages =  await this.model.find()
            
            const author = new schema.Entity('authors')
            const userId = new schema.Entity('userId')
            const text = new schema.Entity('text')
            const message = new schema.Entity('message', {
                userId: userId,
                author: author,
                text: text
            })
            const msgs = new schema.Entity('messages', {
                id: 'Messages',
                messages: [message]
            })

            const normalizeData = normalize(messages, msgs)

            return {messaes:normalizeData, error:false, errorDescrip: null};
        } catch (error) {
            console.log(error)
            return {messages: null, error:true, errorDescrip:error}
        }
    }
}


module.exports = new Messages();