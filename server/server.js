import { Meteor } from 'meteor/meteor';


Meteor.methods({


    addDonor : function (donor) {
        id = Donors.insert(donor, (error,userId) => {
            if (error) {
                console.log('server error on insertion',error);

                throw new Meteor.Error(String(error))
            }
            // We cant return it to the client, becuase it's asynchronous
            console.log('userId',userId)

        })

        // we can return this user id to the calling client
        return id
    },

    removeDonor : function (id) {
        Donors.remove(id, function (error) {
            if (error) {
                console.log('server error on user remove',error);

                throw new Meteor.Error(String(error))

            }
            console.log('successfully removed');
        })
    },

    updateDonor : function (id, donorInfo) {
        Donors.update({_id:id},{$set:donorInfo} ,function (err) {
            if (err) {
                console.log('Failed to update',err);
                throw new Meteor.Error(String(err))
            }

            console.log('Successfully Update.');

        })
    },

   returnIp : function(){
       return this.connection.clientAddress
   },

   hostname : function(){
       return this.connection.httpHeaders.host
   }

})

Meteor.publish('donors', function() {
  return Donors.find({});
});


Meteor.startup(() => {
  // code to run on server at startup
});
