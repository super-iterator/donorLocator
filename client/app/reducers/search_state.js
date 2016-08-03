function search_state (state=[],action) {
    switch (action.type) {
        case 'UPDATE_SEARCH_STATE':

            // var new_list = [...state , action.found_donors]

            return action.found_donors
            break;
        default:
            return state
    }
}

export default search_state
