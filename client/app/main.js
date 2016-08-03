/* jshint esversion:6 */

import React from 'react'
import ReactDOM , {render} from 'react-dom'

// Import router dependencies
import { Route, Router, IndexRoute , Redirect, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import {store , history } from './store'


// Import all of your components here to render
import App                        from './components/App'

import Main                       from './components/Main'
import { patientMap ,
         donorMap   ,
         donorUpdate }            from './components/Map'

import HomePage                   from './components/HomePage'
import Settings                   from './components/Settings'

import ShowDonors                 from './components/ShowDonors'


Meteor.startup(()=>{

        render(
            <Provider store={store}>
                <Router history={history} >
                    <Route path="/" component={App} >
                        <IndexRoute component={patientMap} />
                        <Route path="/donors" component={donorMap} />
                        <Route path="/update(/:id)" component={donorUpdate} />
                        <Route path="/about" component={Settings} />
                        <Route path="/show" component={ShowDonors} />

                    </Route>
                </Router>
            </Provider>,
            document.getElementById('rootDiv')
        )

})
