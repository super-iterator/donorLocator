function hostname(state=[],action) {
    switch (action.type) {
        case "GET_HOSTNAME":
            console.log('reducer hostname',action.hostName);
            return action.hostName
            break;
        default:
            return state
    }
}

export default hostname
