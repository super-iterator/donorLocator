/* jshint esversion:6 */

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import donors            from './donors'
import error_messages    from './error_messages'
import map               from './map'
import latlng            from './latlng'
import hostname          from './hostname'
import ipaddress         from './ipaddress'
import search_state      from './search_state'


const rootReducer = combineReducers({ donors ,
                                      error_messages,
                                      map,
                                      latlng,
                                      hostname,
                                      ipaddress,
                                      search_state,
                                      routing:routerReducer
                                  })

export default rootReducer
