const express = require('express')
const mongoose = require('mongoose')
const { Server } = require('socket.io')
const http = require('http')
const productsRouter = require("./routes/products")
const messagesRouter = require("./routes/messages")
const testRouter = require('./routes/test')
const { engine } = require('express-handlebars');
const path = require('path');

const { local } = require('./config')
const { cloud } = require('./config')



// Connect to LOCAL 
const localConnection=  `${local.SCHEMA}://${local.HOSTNAME}:${local.DBPORT}/${local.DATABASE}`
// Connect to CLOUD 
const cloudConnection = `${cloud.SCHEMA}://${cloud.USER}:${cloud.PASSWORD}@${cloud.HOSTNAME}/${cloud.DATABASE}?retryWrites=true&w=majority`
mongoose.connect(cloudConnection).then(() => {
  console.log('connected to mongo')


  const app = express();
  const server = http.createServer(app)
  const PORT = process.env.PORT | 8080
  const io = new Server(server)


  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });
  app.use(express.json())
  app.use(express.urlencoded({extended:true}))

  app.use("/api/productos", productsRouter)
  app.use('/api/mensajes', messagesRouter)
  app.use('/api/productos-test', testRouter)


  app.engine('handlebars', engine({
    layoutsDir: path.join(__dirname, './views'),
    defaultLayout: 'index'
  }));

  app.set('view engine', 'handlebars')
  app.use("/static", express.static(path.join(__dirname, 'public')))

  app.get("/", async (req, res) => {
    res.render(path.join(__dirname, './views/index.handlebars'))
  });

  app.use(function(req,res){
    res.status(404).send({error:-2, descripcion:'la ruta solicitada o el metodo no se encuentra implementado'})
  })

  io.on("connection", (socket) => {
    console.log(`Nuevo usuario conectado: ${socket.id}`)

    io.sockets.emit('index', null)

    socket.on('reload', ()=> {
      io.sockets.emit('refresh', null)
    })

    socket.on('message', ()=>{
      io.sockets.emit('new-messages', null)
    })


  })

  server.listen(PORT, () => console.log(`listening on port: ${PORT}`))

})