require('dotenv').config()
const Express = require('express');
const app = Express();


const dbConnections = require('./db');
const controllers = require('./controllers');
const middlewares = require('./middleware')

dbConnections.authenticate()
    .then(() => dbConnections.sync())
    // .sync() syncs models or schemas to database
    .then(()=> {
        app.listen(3000, () => {
            console.log('[server] is running on 3000')
        })
    })
    .catch((err)=> {
        console.log(`[server] crashed ${err}`)
    })

/*app.listen(3000, () => {
    console.log(`[server] is running`);
})*/
app.use(Express.json());
app.use(middlewares.CORS);
app.use("/log", controllers.log);
//app.use('/pies', middlewares.validateSession, controllers.piecontroller)
app.use("/user", controllers.user);

/*app.use("/test", (req, res) => {
    res.send("Text endpoint hit!")
})*/