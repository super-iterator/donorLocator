/* jshint esversion:6 */


import React from 'react'
import {render} from 'react-dom'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import L from 'leaflet'


class Main extends React.Component {

    componentWillMount(){
        console.log('subscribing ...');
        Meteor.subscribe('donors')
    }

    componentWilUnmount(){
        console.log('unsubscribing ...');
        Meteor.subscribe('donors').stop()
    }

    componentDidMount(){
        Session.set('errors','')

        // setting ip address to Session
        this.props.returnIp()

        // getting the hostname, and set it to props
        this.props.get_hostname()


        // update the users from the DB on app start
        this.props.show_all_donors()

    }


    render(){
        return(

            <div style={{textAlign:"center"}} >

                <nav class="navbar navbar-default" role="navigation">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar">
                                <span class="icon-bar" />
                                <span class="icon-bar" />
                                <span class="icon-bar" />
                            </button>

                            <Link to="/" class="navbar-brand">Dispatchr</Link>
                        </div>


                        <div class="collapse navbar-collapse" id="navbar">
                            <ul class="nav navbar-nav">
                                <li> <Link to="/"> Patients </Link> </li>
                                <li> <Link to="donors"> Donors </Link> </li>
                                <li> <Link to="about"> About Me </Link> </li>
                                <li> <Link to="show"> Show Donors </Link> </li>
                            </ul>
                        </div>
                    </div>
                </nav>


                { Session.get('errors') ? <h6 style={{color:"red"}}> {Session.get('errors').error}</h6>  : "" }

                {React.cloneElement(this.props.children,this.props)}


            </div>
        )
    }

}

export default Main
