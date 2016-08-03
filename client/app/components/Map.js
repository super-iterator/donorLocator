// jshint esversion:6

import React from 'react'
import ReactDOM , {render} from 'react-dom'
import {Link} from 'react-router'



import L from 'leaflet'

// import {featureLayer,basemapLayer} from 'esri-leaflet'
import esri from 'esri-leaflet'


export class donorMap extends React.Component{

    constructor(){
        super()
        this.locateMe    = this.locateMe.bind(this)
        this.saveData    = this.saveData.bind(this)
    }

    componentDidMount(){

        var lat = parseFloat('31.528')
        var lng = parseFloat('30.680')

        // var map = L.map(this.refs.mapRef).setView([lat,lng], 4)
        // var map = L.map(this.refs.mapRef).setView( L.latLng([lat,lng]), 3, {reset: true} )


        var map = L.map('map', {
            // crs: rs25832,
            center: [ 50.8805, 7.3389 ],
            zoom: 4,
            // maxZoom: resolutions.length,
            // layers: [ layer ]
        });



        // L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" , {
        //     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        //     maxZoom: 18,
        // }).addTo(map);



        esri.basemapLayer("Streets").addTo(map);

        // console.log("ESRI::",esri);

        // var parks = esri.featureLayer({
        //     url: "https://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/services/Portland_Parks/FeatureServer/0",
        // }).addTo(map)


        // geocoding.geosearch({
        //   providers: [
        //     geocoding.arcgisOnlineProvider(),
        //     geocoding.featureLayerProvider({
        //       url: '//services.arcgis.com/uCXeTVveQzP4IIcx/arcgis/rest/services/gisday/FeatureServer/0/',
        //       searchFields: ['Name', 'Organization'],
        //       label: 'GIS Day Events',
        //       bufferRadius: 20000,
        //       formatSuggestion: function (feature) {
        //         return feature.properties.Name + ' - ' + feature.properties.Organization;
        //       }
        //     })
        //   ]
        // }).addTo(map);


        /// setting the map to props through action -> reducer
        this.props.set_map_to_props(map)
    }


    saveData(event){
        // so the page won't load on submission
        event.preventDefault()

        // reset the errors in session, and set them to
        // session in actions area
        Session.set('errors','')

        var donorInfo = {
            first_name : this.refs.first_name.value,
            last_name  : this.refs.last_name.value,
            phone      : this.refs.phone.value,
            email      : this.refs.email.value,
            blood      : this.refs.blood.value,

        }

        var ipAddress = this.props.ipaddress

        donorInfo.lat       = this.props.latlng.lng
        donorInfo.lng       = this.props.latlng.lng
        donorInfo.ipAddress = this.props.ipaddress

        var {id} = this.props.params

        //Setting the userId in Session
        Session.set('userId',id)

        // adding the donorInfo to the DB
        this.props.add_donor(donorInfo)

        // Hide the data entry popup when the user hits save
        $("#popupModal").modal("hide")

        // Don't show the success modal if the app has errors
        Meteor.wrapAsync(setTimeout(function () {
            if(!Session.get('errors')){
                $("#donorCreateSuccess").modal('show')
            }
        }, 1000))


    }


    locateMe(event){

        var map = this.props.map

        map.locate({setView: true, maxZoom:15});

        // setting latlng to props
        this.props.set_latlng(map)

        console.log(__filename,map);

        // disable the button after hitting it once
        $("#locateMe").prop('disabled',true)
    }


    render(){
        return(
            <div>
                <h1>{this.props.location.pathname == "/" ? "Patients Map" : "Donors Map"}</h1>

                <div id='map' ref="mapRef" style={{height: "480px"}}></div>


                <div class="modal  fade" id="popupModal" role="dialog" aria-labelledby="arealabel" aria-hidden="true">
                  <div class="modal-dialog">

                    <div class="modal-content">

                          <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title" >Please enter your information</h4>
                          </div>


                        <div class="modal-body">
                            <label for="first_name">First Name </label>
                            <input type="text" class="form-control" ref="first_name" id="first_name"  />

                            <label for="last_name">Last Name </label>
                            <input type="text" class="form-control" ref="last_name" id="last_name" />

                            <label for="phone">Phone # </label>
                            <input type="text" class="form-control" ref="phone" id="phone" />

                            <label for="email">Email </label>
                            <input type="text" class="form-control" ref="email" id="email" />

                            <label for="blood">Blood Group </label>
                            <select class="form-control" ref="blood" name="blood">
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                            </select>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={this.saveData}>Save</button>
                        </div>
                </div>
              </div>
            </div>



            <div class="modal fade" id="donorCreateSuccess"  role="dialog" aria-labelledby="arealabel" aria-hidden="true">
              <div class="modal-dialog">

                <div class="modal-content">

                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" >You successfully registered your info</h4>
                      </div>


                    <div class="modal-body">
                        <p>Your info. is updatable through </p>
                        <p style={{color:"#cc6666"}}> http://{this.props.hostname}/update/{Session.get('userId')} </p>
                        <p>Please save it for update</p>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-default"> <a href="/">Home</a> </button>
                    </div>
                </div>
              </div>
            </div>


            <br/>

            <button class="btn btn-primary" id="locateMe" onClick={this.locateMe}>Locate Me</button>

        </div>
        )
    }

}


donorMap.meta = {
    title : "Donors Add themselves",
    description : "Donors can add themselves through this page"
}

export class patientMap extends React.Component{

    constructor(){
        super()

        this.mark_all_donors    = this.mark_all_donors.bind(this)
    }

    componentDidMount(){

        var map = L.map(this.refs.mapRef).setView([31.528, 30.680], 2)

        // L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" , {
        //     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        //     maxZoom: 18,
        // }).addTo(map);


        esri.basemapLayer("Streets").addTo(map)

        // var parks = L.esri.featureLayer({
        //     url: "https://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/services/Portland_Parks/FeatureServer/0",
        //     style: function() {
        //      return {
        //          color: "#70ca49",
        //          weight: 2
        //      };
        //     }
        // }).addTo(map);



        /// setting the map to props through action -> reducer
        this.props.set_map_to_props(map)


        // Instead of calling mark_all_donors in an async
        // action (that runs through thunk), we covert the
        // asyn operations to fibers
        Meteor.wrapAsync(
            setTimeout(
                ()=>{
                    console.log('converting to fiber');
                    // draw donors as markers on the map
                    this.mark_all_donors()
                },
                // call the function after some time so
                // React/Redux components get initizlized
                1000
            )
        )
    }


    mark_all_donors(){

        this.props.donors.map(donor => {

            var map = this.props.map

            L.Icon.Default.imagePath = '/images'

            var marker = L.marker([donor.lat, donor.lng], {title: "Click to show"}).addTo(map);

            marker.on('click', viewPopup )


            function viewPopup(e) {
                // alert("You clicked the map at " + e.latlng);
                // map.setView([51.5, -0.19], 13);  // move to a new location in the map
                var table = `
                    <table>
                        <tr>
                            <td>Name</td>
                            <td>${donor.first_name} ${donor.last_name}</td>
                        </tr>
                        <tr>
                            <td>Blood Grp.</td>
                            <td>${donor.blood}</td>
                        </tr>
                        <tr>
                            <td>Phone #</td>
                            <td>${donor.phone}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>${donor.email}</td>
                        </tr>
                    </table>
                `
                marker.bindPopup(table).openPopup();
            }


        })
    }

    setView( lat , lng , e ){

        this.props.map.setView([lat,lng],10)

    }

    searchUpdated( e ){
        var bloodGroup = e.target.value

        var all_donors = e.target.value ? this.props.donors : []


        // update state/props thorugh action -> reducer
        this.props.updateSearch(bloodGroup , all_donors)
    }

    render(){
        return(
            <div>

                <div class="input-group col-xs-3 center-block">
                    <input type="text" class="form-control" placeholder="Find Blood Groups" onChange={ this.searchUpdated.bind(this) } />
                </div>


                <table class="table table-bordered table-striped table-responsive table-hover">
                    <tbody>

                        {
                            this.props.search_state.map( donor => {
                                return(
                                    <tr key={donor._id}>
                                         <td style={{color:"#ef781c"}}> {donor.first_name} </td>
                                         <td style={{color:"#ef781c"}}> {donor.last_name} </td>
                                         <td style={{color:"#ef781c"}}> {donor.phone} </td>
                                         <td style={{color:"#ef781c"}}> {donor.email} </td>
                                         <td style={{color:"#ef781c"}}> {donor.blood} </td>
                                         <td style={{color:"#ef781c"}}> {donor.lng} </td>
                                         <td style={{color:"#ef781c"}}> {donor.lat} </td>
                                         <td><button type="button" class="btn btn-danger" onClick={this.setView.bind(this,donor.lat,donor.lng)}> Go </button></td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>

                </table>


                <h1>{this.props.location.pathname == "/" ? "Patients Map" : "Donors Map"}</h1>

                <div id='map' ref="mapRef" style={{height: "480px"}}></div>

        </div>
        )
    }

}



export class donorUpdate extends React.Component{

    constructor(){
        super()
        this.locateMe      = this.locateMe.bind(this)
        this.updateData    = this.updateData.bind(this)
    }

    componentDidMount(){

        // let map = L.map(element).setView([-41.2858, 174.78682], 14);
        var map = L.map(this.refs.mapRef).setView([31.528, 30.680], 2)

        L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" , {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
        }).addTo(map);




        esri.basemapLayer("Streets").addTo(map)

        // var parks = L.esri.featureLayer({
        //     url: "https://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/services/Portland_Parks/FeatureServer/0",
        //     style: function() {
        //      return {
        //          color: "#70ca49",
        //          weight: 2
        //      };
        //     }
        // }).addTo(map);



        /// setting the map to props through action -> reducer
        this.props.set_map_to_props(map)

    }


    updateData(event){
        event.preventDefault()

        Session.set('errors','')

        var donorInfo = {
            first_name : this.refs.first_name.value,
            last_name  : this.refs.last_name.value,
            phone      : this.refs.phone.value,
            email      : this.refs.email.value,
            blood      : this.refs.blood.value,

        }

        // var ipAddress = Session.get('ipAddress')
        //
        // var {lat} = Session.get('latlng')
        // var {lng} = Session.get('latlng')

        donorInfo.lat       = this.props.latlng.lng
        donorInfo.lng       = this.props.latlng.lng
        donorInfo.ipAddress = this.props.ipaddress

        console.log('donorInfo',donorInfo);

        var {id} = this.props.params

        this.props.update_donor(id,donorInfo)


        /// hide the modal and dimm the screen
        $("#popupModal").modal("hide")


        // check if there are errors after the error
        // message propages to sessions.
        // We use wrapAsync here so we don't need to create
        //  action/reducer/thunk-middleware to handle it
        Meteor.wrapAsync(setTimeout(function () {

            if(!Session.get('errors')){
                $("#updateSuccessModal").modal('show')
            }
        }, 1000))



    }


    locateMe(event){

        $('#popupModal').modal('hide')

        var map = this.props.map

        map.locate({setView: true, maxZoom:18});

        // setting latlng to props
        this.props.set_latlng(map)

        $("#LOCATEME").prop('disabled',true)


    }


    render(){
        return(
            <div>

                <h1>Donor Info Update</h1>


                <div id='map' ref="mapRef" style={{height: "480px"}}></div>


                            <div class="modal fade" id="popupModal"  role="dialog" aria-labelledby="arealabel" aria-hidden="true">
                              <div class="modal-dialog">

                                <div class="modal-content">

                                      <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                        <h4 class="modal-title" >Please enter your information</h4>
                                      </div>


                                    <div class="modal-body">
                                        <label for="first_name">First Name </label>
                                        <input type="text" class="form-control" ref="first_name" id="first_name"  />

                                        <label for="last_name">Last Name </label>
                                        <input type="text" class="form-control" ref="last_name" id="last_name" />

                                        <label for="phone">Phone # </label>
                                        <input type="text" class="form-control" ref="phone" id="phone" />

                                        <label for="email">Email </label>
                                        <input type="text" class="form-control" ref="email" id="email" />

                                        <label for="blood">Blood Group </label>
                                        <select class="form-control" ref="blood" name="blood">
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                        </select>
                                    </div>

                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary" onClick={this.updateData}>Save</button>
                                    </div>


                            </div>
                          </div>
                        </div>


                        <br/>


                        <div class="modal fade" id="updateSuccessModal"  role="dialog" aria-labelledby="arealabel" aria-hidden="true">
                          <div class="modal-dialog">

                            <div class="modal-content">

                                  <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                    <h4 class="modal-title" >Please update your information</h4>
                                  </div>


                                <div class="modal-body">
                                    <p>You Successfully Updated Your Info.</p>
                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-default"> <a href="/"> Home </a> </button>
                                </div>
                            </div>
                          </div>
                        </div>


                <button class="btn btn-primary" id="LOCATEME" onClick={this.locateMe}>My New Location</button>



        </div>
        )
    }

}
