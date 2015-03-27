var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    //var nodemailer = require('node-mailer');
    //var hbs = require('nodemailer-express-handlebars');
    //var options = {
    //    viewEngine: {
    //        extname: '.hbs',
    //        layoutsDir: 'views/email/',
    //        defaultLayout : 'template',
    //        partialsDir : 'views/partials/'
    //    },
    //    viewPath: 'views/email/',
    //    extName: '.hbs'
    //};
    //var transporter = new nodemailer.Mail({
    //    service: 'gmail',
    //    auth: {
    //        user: 'admin@dsoft.eu',
    //        pass: 'pusapusa44'
    //    }
    //});
    ////var sgTransport = require('nodemailer-sendgrid-transport');
    //////using sendgrid as transport, but can use any transport.
    ////var send_grid = {
    ////    auth: {
    ////        api_user: 'api_user',
    ////        api_key: 'api_key'
    ////    }
    ////};
    //var mailer = nodemailer.createTransport(transporter);//sgTransport(send_grid));
    //mailer.use('compile', hbs(options));
    //mailer.sendMail({
    //    from: 'admin@dsoft.eu',
    //    to: 'gustav.hlavac@gmail.com',
    //    subject: 'Any Subject',
    //    template: 'email_body',
    //    context: {
    //        variable1 : 'value1',
    //        variable2 : 'value2'
    //    }
    //}, function (error, response) {
    //    console.log('mail sent to ' + to);
    //    mailer.close();
    //});
    res.send('<head><h1>Tu bude nejake menu</h1></head><iframe src="https://docs.google.com/document/d/13bNm9pGc3rdvgK6Z8_HHggzjp598PMUh2rLm0yhauyE/edit?usp=sharing" name="google_doc" allowTransparency="true" scrolling="yes" frameborder="0" style="margin-top: 50px; width: 100%; height: 100%;"></iframe>');
    //res.send('ok');
});



router.get('/test2', function(req, res){
    var hogan = require('hogan');
    var basketballPlayers = [
        {name: 'Lebron James', team: 'the Heat'},
        {name: 'Kevin Durant', team: 'the Thunder'},
        {name: 'Kobe Jordan',  team: 'the Lakers'}
    ];

    var days = [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ];

    var data = {
        basketballPlayers: basketballPlayers,
        days: days
    };

    var template = hogan.compile("@{{data}}");
    res.render('loop', template);
});

module.exports = router;