const express = require('express');
app = express();
const cors = require('cors');
require('dotenv').config();
const params = require('./models/db.connection.js');
const dbConfig = require('./db.config');




app.use(express.json());
app.use(cors());
//app.options('*', cors())
 params.seq_instance.sync();

// params.seq_instance.sync({force: true}).then( () => {
//     console.log("Table Created SUccessfully.....")
// }).finally( () => {
//     conn.close();
// });


// whatsappClient.on('message', message => {
// 	console.log(message.body);
// });



app.get('/', (req, res) => {
    res.send('Healthy');
});

require("./routes/products.routes")(app);

const PORT = process.env.PORT || 8002;

app.listen(PORT, () => {
    console.log('Server is Listening at http://localhost:8001/');
});