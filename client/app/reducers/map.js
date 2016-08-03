function map (state={},action) {
    switch (action.type) {
        case 'SET_MAP':
            console.log('reducer map',action.map)
            return action.map
            break;
        default:
            return state
    }
}

export default map
