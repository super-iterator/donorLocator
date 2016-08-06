/* jshint esversion:6 */

import React from 'react'
import {render} from 'react-dom'

// import Markdown from 'react-markdown'
// import markdownString from '../documentation/docs'
// markDownDocumentation = fs.readFileSync('../documentation/docs.md','utf-8').toString()
//<Markdown source={markdownString()} />


class About extends React.Component{

    constructor(){
        super()

    }

    render(){
        return(
            <div style={{ marginLeft:30 , marginRight:30}}>
                <h1>About the project</h1>

                <p>

                    This project's main purpose is to connect blood donors to patiens who need them, where donors goes to donors tab in the web app, register their contact info. and blood group along with donor's IP address and geographic location.
                </p>
                <p>
                    On the main page, patients now can view them across the map, click on donor's mark located in some geographic area to show all the relivant details.
                </p>

                <p>
                    Seaching a specific blood group is possible as well, with instant real-time results, you can find all donors with the required blood group, and navigate to their location with a click of a button.
                </p>

                <p>
                    When donors register their info, they get direct link they can save it and use it later to modify thier information in case there is a change.
                </p>

                <p>
                    Additional panel has been provided for admins to view all donors and their corresponding info., and admins ability to delete any of them.
                </p>

                <p> This application is provided as a showcase for a set of technologies to build a real-time web application in every aspect, and not meant to be a complete application with authentication and authorization. </p>

                <p>
                    This project emplolys a set of technologies to empower this project:
                </p>

                <div>
                    <ul>
                        <li>ReactJS</li>
                        <li>Bootstrap/jQuery</li>
                        <li>Redux</li>
                        <li>Meteor</li>
                        <li>Chimp/Mocha for testing</li>
                        <li>LeafletJS / ESRI-Leaflet (for ArchGIS maps)</li>
                        <li>Heroku hosting</li>
                    </ul>

                </div>




            </div>
        )
    }

}

export default About
