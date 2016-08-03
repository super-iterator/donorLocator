function error_messages(state=[],action) {
    switch (action.type) {
        case 'SHOW_ERROR':
            return [...state, action.error_message]
            break;
        default:
            return state
    }
}

export default error_messages
