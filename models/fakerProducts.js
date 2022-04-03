const faker = require('faker')


module.exports = {
    
    createData: ()=>{
        const Products = []
        try {
            for(let i = 0 ; i < 5 ; i++){
                Products.push({
                    id: faker.datatype.uuid(),
                    name: faker.commerce.product(),
                    price: faker.commerce.price(),
                    date : faker.date.past(),
                    thumbnail: faker.image.image(),
                })
            }
            return {error: false, errorDescrip:null, products:Products}
        } catch (error) {
            return {error: true, errorDescrip:error, products:null}

        }
    }
}