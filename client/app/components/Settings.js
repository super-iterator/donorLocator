/* jshint esversion:6 */

import React from 'react'
import {render} from 'react-dom'

class Settings extends React.Component{

    constructor(){
        super()

        this.handle_click = this.handle_click.bind(this)
    }

    handle_click(event){
        event.preventDefault()

        this.props.get_users()
    }

    render(){
        return(
            <div>
                <h1>Settings Page</h1>

                <button type="button" class="btn btn-default" onClick={this.handle_click}>Receive Data</button>
            </div>
        )
    }

}

export default Settings
