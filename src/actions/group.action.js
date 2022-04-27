import { groupConstants } from '../constants/group.constants'

export function getGroups_request(group) {
    return {
        type: groupConstants.GETGROUP_REQUEST,
        payload: group
    }
}
export function getGroups_success(group) {
    return {
        type: groupConstants.GETGROUP_SUCCESS,
        payload: group
    }
}
export function getGroups_failure(group) {
    return {
        type: groupConstants.GETGROUP_FAILURE,
        payload: group
    }
}
