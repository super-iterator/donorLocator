
function latlng(state=[],action) {
    switch (action.type) {
        case 'SET_LATLNG':
            console.log('latlng reducer ',action.latlng);
            return action.latlng
            break;
        default:
            return state
    }
}

export default latlng
