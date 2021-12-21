const params = require('../models/db.connection');
const Auth = params.Auth;
const Op = params.sequelize.Op;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


    

//Register User
exports.register = (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: bcrypt.hashSync(req.body.password, 8)
    }

    Auth.create(user).then( data => {
        res.status(200).send({
            message: 'User Created Successfully'
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error in Registration Process"
        });
    });
};

//Login User
exports.login = (req, res) => {
    Auth.findOne({
        where: {
            phone: req.body.phone
        }
    }).then(data => {
        if(!data){
            return res.status(404).send({
                message: "User Not Found"
            })
        }

        const isValidPassword = bcrypt.compareSync(req.body.password, data.password)

        if (!isValidPassword) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password!"
            });
        }

        const token = jwt.sign({ phone: data.phone}, 'secret', { expiresIn: 7200 });
        res.status(200).send({
            phone: data.phone,
            email: data.email,
            name: data.name,
            token: token
        });
    }).catch(err => {
        res.status(500).send({
            message: "Error Retrieving User"
        })
        console.log(err);
    })
}

exports.forgot = (req, res) => {
    
}



const mailer = (email, name) => {
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: 'demouser179301213@gmail.com',
            pass: 'demo@1234'
        }
    });
  
    var mailOptions = {
        from: 'demouser179301213@gmail.com',
        to: email,
        subject: 'Welcome Mail',
        text: 'Thank you '+ name +' for Registering with us. We will be happy to serve you.'
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    }
  
  
    );
  }

 