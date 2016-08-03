var donorsSchema = new SimpleSchema({
    first_name : {
        type   : String,
        max   : 10,
        label : 'First Name',

    },
    last_name : {
        type  : String,
        max   : 10,
        label : 'Last Name',

    },
    blood : {
        type  : String,
        max   : 10,
        label : 'Blood Group',
        allowedValues : ['A+','A-','B+','B-','O+','O-','AB+','AB-']

    },
    phone : {
        type  : Number,
        max : 99999999999,
        label : 'Phone #'

    },
    email : {
        type  : String,
        max   : 40,
        label : 'Email Address',
        regEx : SimpleSchema.RegEx.Email
    },

    lng : {
        type : String,
        max : 20,
        label : "longitude"
    },
    ipAddress : {
        type : String,
        max : 15,
        label : "IP Address"
    },
    lat : {
        type : String,
        max : 20,
        label : "latitude"
    }
})

//maxCount: 2
// type: anotherSchema
// optional
Donors.attachSchema(donorsSchema)
