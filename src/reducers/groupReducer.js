import { groupConstants } from '../constants/group.constants'

const initialState = {
    groups: []
}

export default function groupReducer(state = initialState, action) {
    switch(action.type) {
        case groupConstants.GETGROUP_REQUEST:
            return {
                ...state,
                loading: true
            }
        case groupConstants.GETGROUP_SUCCESS:
            return {
                ...state,
                loading: false,
                groups: action.payload
            }
        case groupConstants.GETGROUP_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case groupConstants.GROUPS_RESET:
        return {
            ...state,
            loading: false,
            groups: [],
        }
        default:
            return state
    }
}