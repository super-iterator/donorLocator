import React from 'react'
import {render} from 'react-dom'



class ShowDonors extends React.Component {

    remove(id,event){
        event.preventDefault()
        this.props.remove_donor(id)
    }

    render(){
        return(
            <div>

                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th class="text-center">First Name</th>
                            <th class="text-center" >Last Name</th>
                            <th class="text-center" >Blood Group</th>
                            <th class="text-center" >Phone</th>
                            <th class="text-center" >Email</th>
                            <th class="text-center" >Latitude</th>
                            <th class="text-center" >Longitued</th>
                            <th class="text-center" >IP Address</th>
                            <th class="text-center" >Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.donors.map( donor => {
                            return(
                                <tr key={donor._id}>
                                    <td> {donor.first_name} </td>
                                    <td> {donor.last_name}  </td>
                                    <td> {donor.blood}  </td>
                                    <td> {donor.phone}      </td>
                                    <td> {donor.email}      </td>
                                    <td> {donor.lat}        </td>
                                    <td> {donor.lng}        </td>
                                    <td> {donor.ipAddress}  </td>

                                    <td> <button type="button" class="btn btn-danger" onClick={ this.remove.bind(this,donor._id) }>Delete</button> </td>
                                </tr>
                            )
                        })}

                    </tbody>

                </table>


            </div>
        )
    }
}

export default ShowDonors
