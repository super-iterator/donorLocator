/* jshint esversion:6 */

export function set_map_to_props(map) {
    console.log("map",map);
    return {
        type : 'SET_MAP',
        map : map
    }
}

export function set_latlng(map) {

    console.log("latlng in action");


    return dispatch => {
        var options = {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 0
        }

        navigator.geolocation.getCurrentPosition(success, error, options);

        function success(pos){
            var lng = pos.coords.longitude
            var lat = pos.coords.latitude
            console.log('successfully foud location:',lat,lng)

            // Setting latlng globally to props/state to refer to them later on saving user data
            Session.set('latlng',{lat,lng} )


            L.Icon.Default.imagePath = '/images/'


            //// Adding a marker in that location -- both work
            // var marker = new L.Marker([lat,lng],{title: "CLICK TO EDIT"})
            var marker = L.marker([lat,lng],{title: "CLICK TO EDIT"})

            marker.addTo(map)

            marker.on('click', function(e) {
              $("#popupModal").modal("show")
            })

          // on success, set the location
          dispatch(LATLNG({lat,lng}))
        }



        function error(err){
            console.log('error locating the user',err);
        }


    }

}

function LATLNG(latlng) {
    return {
        type : 'SET_LATLNG',
        latlng : latlng,
    }
}

export function show_all_donors() {

    return dispatch =>{
        var donors = Donors.find().fetch()
        dispatch(getDonors(donors))
    }
}

function getDonors(donors) {
    return {
        type : 'SHOW_ALL_DONORS',
        donors : donors,
    }
}

export function add_donor(donorInfo){

    return dispatch => {
        Meteor.call('addDonor',donorInfo,(err,userId)=>{

            if (err) {
                Session.set('errors',err)
                return
            }
            Session.set('userId',userId)
        })
    }
}

export function update_donor(id,donorInfo){

    return dispatch => {
        Meteor.call('updateDonor',id,donorInfo,(err,data)=>{

            if (err) {
                Session.set('errors',err)
                return
            }

            console.log('successfully updated');
        })
    }
}

export function remove_donor(id) {
    return dispatch => {
        Meteor.call('removeDonor', id , (err)=>{
            if (err) {
                Session.set('errors',err)
                console.log('problem deleting the item');
                return
            }
            console.log('successfully removed');
        })
    }
}

export function returnIp() {

    return dispatch => {
        Meteor.call('returnIp', (err,ipaddress)=> {
            if (err) {
                return console.log('error getting ipadd',err);
            }
            console.log('getting ip address ',ipaddress);
            // Session.set('ipAddress',ipaddress)
            dispatch( ipAddr(ipaddress) )
        })
    }
}

function ipAddr(ipaddress) {
    return {
        type : 'GET_IPADDRESS',
        ipAddress : ipaddress
    }
}

export function get_hostname() {

    return dispatch => {
        Meteor.call('hostname', (err,hostname)=> {
            if (err) {
                return console.log('error getting hostname',err);
            }
            console.log('getting hostname ',hostname);
            dispatch( hostName(hostname) )

        })
    }
}

function hostName(hostname) {
    return {
        type : 'GET_HOSTNAME',
        hostName : hostname
    }
}

export function updateSearch( bloodGroup , all_donors ) {

    let found_donors = []

    all_donors.filter(donor => {
        if (donor.blood.indexOf(bloodGroup.toUpperCase()) !== -1) {
            found_donors.push(donor)
        }
    })

    return {
        type : 'UPDATE_SEARCH_STATE',
        found_donors : found_donors
    }
}
