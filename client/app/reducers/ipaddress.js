function ipaddress(state=[],action) {
    switch (action.type) {
        case "GET_IPADDRESS":
            console.log('reducer ip address',action.ipAddress);
            return action.ipAddress
            break;
        default:
            return state
    }
}

export default ipaddress
