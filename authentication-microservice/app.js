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

app.get('/', (req, res) => {
    res.send('Healthy');
});

require("./routes/auth.routes")(app);

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
    console.log('Server is Listening at http://localhost:8001/');
});