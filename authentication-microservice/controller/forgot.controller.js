const params = require('../models/db.connection');
const Auth = params.Auth;
const Otp = params.Otp;
const Op = params.sequelize.Op;
const bcrypt = require('bcryptjs');

let phoneToVerify = '';

exports.forgot = (req, res) => {
    let data = Auth.findOne({where:{phone: req.body.phone}});

    data.then(user => {
        if(!user) {
            res.status(500).send({
                message: "User Data does not Exist"
            });
        }
        else {
            let _otp = Math.floor(100000 + Math.random() * 900000);
            let data = Otp.create({
                otp: _otp,
                phone: req.body.phone,
                status: 'active'
            });

            data.then(otpData => {
                sendOtp(req.body.phone, _otp);
                phoneToVerify = req.body.phone;
                res.status(200).send({
                    message: "OTP sent by SMS"
                });
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Error Occured white generating OTP. Try again"
                })
            })
        }
    })
};

exports.reset = (req, res) => {
    let user = Otp.findOne({
        where: {phone: phoneToVerify, status: 'active'}
    });

    user.then(result => {
        if(!result){
            res.status(400).send({
                message: 'Invalid OTP or OTP Expired'
            });
        } 
        else {
            let updateRecord = Auth.update({
                password: bcrypt.hashSync(req.body.password, 8)
            }, {
                where: {phone: phoneToVerify}
            });
            updateRecord.then(user => {
                res.status(200).send({
                    message: "Password Changed Successfully"
                });
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while verifying otp, Try again."
                });
            })

            let updateOtpRecord = Otp.update({
                status: 'invalid'
            }, {
                where: {phone: phoneToVerify}
            });
            updateOtpRecord.then(data => {
                res.status(200).send({message: 'Otp Table Update'});
                phoneToVerify = '';
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Error in otp table update"
                });
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occured while verufying OTP. Try Again"
        });
    });
};




//sending otp vis SMS
const accountSid = 'AC67e72313f1cbdbdf6df5560f45f91b8e';
const authToken = '972fee337e64241caf65104b89bc93f5';
const client = require('twilio')(accountSid, authToken);

// client.messages
//   .create({
//      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//      from: '+18452373209',
//      to: '+917490041220'
//    })
//   .then(message => console.log(message.sid));

function sendOtp(phone, otp){
    client.messages
      .create({
         body: `Otp to reset password is: ${otp}`,
         from: '+18452373209',
         to: `+91${phone}`
       })
      .then(message => console.log(message.sid));
}


