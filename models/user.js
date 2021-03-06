/**
 * Created by sghaida on 5/11/2017.
 */

var mongo   = require('mongoose'),
    Schema  = mongo.Schema;

var userSchema = new Schema({
    employeeid: String,
    name: String,
    mail: String,
    title: String,
    department: String,
    office: String,
    country: String,
    listOfApps: [{
        type: Schema.Types.ObjectId,
        ref: 'Application'
    }],
    role: {
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Role'
        },
        roleName: {type: String, default: 'User'},
        listOfCountries: [],
        listOfSites: []
    },
    accountEnabled: Boolean
});

module.exports = mongo.model('User', userSchema);
