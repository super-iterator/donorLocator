/* jshint esversion:6 */

import { createStore, applyMiddleware, compose } from 'redux'
import { browserHistory }        from 'react-router'
import { syncHistoryWithStore}   from 'react-router-redux'

// Import here rootReducer
import rootReducer from './reducers/index'

// Redux middleware for asyn operations/actions
import ReduxThunk from 'redux-thunk'


export const store = createStore(rootReducer , applyMiddleware(ReduxThunk) )

export const history = syncHistoryWithStore(browserHistory,store)


/// On change, fetch all the donors
/// and pass them to the reducer
Tracker.autorun(() => {
  store.dispatch({
    type: 'SHOW_ALL_DONORS',
    donors: Donors.find().fetch(),
  });
});
