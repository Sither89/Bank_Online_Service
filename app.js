var express = require('express');
const path = require('path')
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//models
const userModel = require('./models/User');
const tranModel = require('./models/Transaction');




const setupDB = require("./setupDB");

setupDB();
var port = 8080;
const SECRET_KEY = 'CLICKNEXT';


app.use('/assets', express.static(__dirname + '/assets'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));



//========================== FOR HTML =================================//

app.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/redirect.html');
})

app.get('/check', function (req, res, next) {
    res.sendFile(__dirname + '/check.html');
})

app.get('/logout', function (req, res, next) {
    res.sendFile(__dirname + '/logout.html');
})

app.get('/login', function (req, res, next) {
    res.sendFile(__dirname + '/login.html');
})

app.get('/profile', function (req, res, next) {
    res.sendFile(__dirname + '/profile.html');
})

app.get('/deposit', function (req, res, next) {
    res.sendFile(__dirname + '/deposit.html');
})

app.get('/withdraw', function (req, res, next) {
    res.sendFile(__dirname + '/withdraw.html');
})
app.get('/transfer', function (req, res, next) {
    res.sendFile(__dirname + '/transfer.html');
})

app.get('/transfer_history', function (req, res, next) {
    res.sendFile(__dirname + '/transfer_history.html');
})

app.get('/receive_history', function (req, res, next) {
    res.sendFile(__dirname + '/receive_history.html');
})

app.post('/login_db', jsonParser, async function (req, res, next) {
    const { user, password } = req.body;
    // console.log(user);
    // console.log(password);
    const existingUser = await userModel.findOne({ Username: user });
    try {
        if (!existingUser) {
            res.status(404).json({ message: "User not found" });
            console.log("Login Error : no user found")

        } else {
            bcrypt.compare(password, existingUser.Password).then(function (isLogin) { //decode password
                if (isLogin === true) {
                    const token = jwt.sign({ user: existingUser.Username, id: existingUser._id }, SECRET_KEY, { expiresIn: "1h" });//create token
                    res.json({ status: 'ok', message: 'login success', user: existingUser, token: token });
                    console.log(`Logined from ${user}`);

                } else {
                    res.json({ status: 'error', message: 'wrong password' });

                }
            });
        }
    } catch (error) {
        res.json({ status: 'error', message: error });
        console.log("Login Error")

    }
});

app.post('/getinfo_db', jsonParser, async function (req, res, next) {
    try {
        var checktoken = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(checktoken, SECRET_KEY);
        // console.log(decoded);
        let user_check = decoded.user;
        const existingUser = await userModel.findOne({ Username: user_check });
        if (!existingUser) {
            res.status(404).json({ message: "User not found" });
            console.log("no user found")

        } else {
            // console.log("Founded user");
            // console.log(existingUser);
            res.json({ status: 'ok', user: existingUser.Username, firstName: existingUser.firstName, lastName: existingUser.lastName, Amount: existingUser.Account_Amount });
        }
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});

app.post('/gettran_db', jsonParser, async function (req, res, next) {
    try {
        var checktoken = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(checktoken, SECRET_KEY);
        // console.log(decoded);
        let user_check = decoded.user;
        const existingUser = await userModel.findOne({ Username: user_check });
        var existingTran
        // console.log(existingTran);
        if (!existingUser) {
            res.json({ status: 'error', message: "User not found" });
            console.log("no user found");
        } else {
            if (req.body.Page === 'transfer_his') {
                existingTran = await tranModel.find({ From: user_check, Action: 'transfer' });
            }else{
                existingTran = await tranModel.find({ User: user_check, Action: 'transfer' });
            }
            // console.log("Founded user");
            // console.log(existingUser);
            res.json({ status: 'ok', existingTran });
        }
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});

app.post('/addtransaction_db', jsonParser, async function (req, res, next) {
    try {
        var checktoken = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(checktoken, SECRET_KEY);
        console.log(req.body);
        var User;
        if (req.body.Action === 'transfer') {
            const existingUser = await userModel.findOne({ Username: req.body.Username });
            if (!existingUser) {
                res.json({ status: 'error', message: "User not found" });
                console.log("Transfer error : no user found")
            }
            User = existingUser.Username;
        } else {
            User = decoded.user;
        }
        //Create new transaction for save
        const newtransaction = new tranModel({
            Datetime: new Date(),
            User: User,
            Remain: req.body.Remain,
            Action: req.body.Action,
            From: decoded.user,
            Amount: req.body.Amount
        });
        //Save transaction to Transaction Collection
        newtransaction.save();
        //Update Account_Amount to From User collection
        const fromUser = await userModel.findOne({ Username: decoded.user });
        fromUser.Account_Amount = req.body.Remain;
        await fromUser.save();
        //In condition Action == transfer will Update Account_Amount to User
        if (req.body.Action === 'transfer') {
            const existingUser = await userModel.findOne({ Username: req.body.Username });
            let remain = Number(existingUser.Account_Amount) + Number(req.body.Amount);
            existingUser.Account_Amount = remain + '';
            await existingUser.save();
        }
        res.json({ status: 'ok' });
    } catch (error) {
        res.json({ status: 'error', message: error });
    }
})

app.post('/authen_db', jsonParser, function (req, res, next) {
    try {
        var checktoken = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(checktoken, SECRET_KEY);
        res.json({ status: 'ok', decoded });
    } catch (err) {
        res.json({ status: 'error', message: err.message });
    }

})





app.listen(port, function () {
    console.log(`web server listening on port ${port}`)
})
