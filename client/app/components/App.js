/* jshint esversion:6 */

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../actions/actionCreators'

import Main from './Main'



function mapStateToProps (state) {
    return {
        donors         : state.donors,
        error_messages : state.error_messages,
        map            : state.map,
        latlng         : state.latlng,
        hostname       : state.hostname,
        ipaddress      : state.ipaddress,
        search_state   : state.search_state

    }
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators(actionCreators,dispatch)
}


const App = connect(mapStateToProps,mapDispatchToProps)(Main)

export default App
