const express = require('express');
const Razorpay = require('razorpay');
app = express();
const cors = require('cors');
require('dotenv').config();
const params = require('./models/db.connection.js');
const dbConfig = require('./db.config');


app.use(express.json());
app.use(cors());



params.seq_instance.sync();
// params.seq_instance.sync({force: true}).then( () => {
//     console.log("Table Created SUccessfully.....")
// }).catch((err) => {
//     console.log(err);
// })
// .finally( () => {
//     params.seq_instance.close();
// });

app.get('/', (req, res) => {
    res.send('Healthy');
});

require("./routes/cart.routes.js")(app);

const PORT = process.env.PORT || 8003;

app.listen(PORT, () => {
    console.log('Server is Listening at http://localhost:8003/');
});