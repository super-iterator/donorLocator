function donors(state=[],action) {
    switch (action.type) {
        case 'SHOW_ALL_DONORS':
            return [...action.donors]
            break;
        default:
            return state

    }
}

export default donors
