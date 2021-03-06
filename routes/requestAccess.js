/**
 * Created by sghaida on 5/24/2017.
 */

var express         = require('express'),
    breadcrumbs     = require('express-breadcrumbs'),
    router          = express.Router(),
    middleware      = require('../middleware/authentication'),
    passport        = require('passport'),
    auth            = require('connect-ensure-login'),
    Application     = require('../models/application'),
    mailer          = require('nodemailer');


router.get('/', auth.ensureLoggedIn('/login'), function (req, res, next) {
    Application.find({requirePermission: true}).populate('owner author').exec(function (err, apps) {
        if(err){
            console.log(err);
        } else {
            req.breadcrumbs([{name: 'Access Request', url: '/request/access'}]);
            res.render('requests/app',{applications: apps, breadcrumbs: req.breadcrumbs()});
        }
    });
});

router.post('/', auth.ensureLoggedIn('/login'), function (req, res, next) {
    var smtpConfig = {
        /* add SMPT config */
        host: 'SMTP-HOSTNAME',
        port: 25,
        secure: false
    };

    var transporter = mailer.createTransport(smtpConfig);
    var mailOptions = {
        from: req.user.mail,
        to: 'admin@admin.com',
        subject: 'Access reques for : ' + req.body.application,
        html: 'Dear <strong>helpdesk : <strong>' +
              '<p></p><p></p>' +
              '<p>' +
                  'kinldy grant access for  <strong>' + req.user.mail + '</strong>' +
                  ' based on the below mentioned reasons: ' +
                  '<div>' +
                      req.body.reason +
                  '</div>' +
              '</p>'
    };

    transporter.sendMail(mailOptions, function (err, info) {
       if(err){
           console.log(err);
       } else {
           console.log('Message %s sent: %s', info.messageId, info.response);
       }
    });
});

module.exports = router;
