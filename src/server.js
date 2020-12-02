const express = require('express')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')
const { contactsRouter } = require('./contacts/contacts.router')

 require('dotenv').config({path: path.join(__dirname, '../.env')})

exports.CrudServer = class {
    constructor() {
        this.app = null;
    }
    async start() {
        this.initServer();
        await this.initDatabase();
        this.initMiddlewarce();
        this.initRoutes();
        this.initErrorHandling();
        this.startListening();
    }
    initServer() {
        this.app = express();
    }

    
    async initDatabase() {
        try {
            await mongoose.connect(process.env.MONGODB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            });
            console.log("Database connection successful");
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    }
    initMiddlewarce() {
        this.app.use(express.json())
        this.app.use(morgan('tiny'))
        this.app.use(cors());
    }
    initRoutes() { 
        this.app.use('/contacts', contactsRouter)
    }
    initErrorHandling() { 
        this.app.use((err, req, res, next) => {
            console.log('err',err);
            const statusCode = err.status || 500
            return res.status(statusCode).send(err.message)
        })
    }
    startListening() {
        const {PORT}=process.env
        this.app.listen(PORT, () => {
            console.log(`ok ${PORT}`);
        })
    }
}