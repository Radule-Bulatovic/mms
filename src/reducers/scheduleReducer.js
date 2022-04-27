import { scheduleConstants } from "../constants/schedule.constants";

const initialState = {
    msg: "",
    sheduleHist: [],
    isWritten: false,
    isLoadedDate: false
}

export default function scheduleReducer(state = initialState, action) {
    switch(action.type) {
        case scheduleConstants.WRITE_SCHEDULE_HIST_REQUEST:
        case scheduleConstants.WRITE_SCHEDULE_HIST_SUCCESS:
            return {
                ...state,
                msg: action.payload,
                isWritten: true,
            }
        case scheduleConstants.WRITE_SCHEDULE_HIST_FAILURE:
        case scheduleConstants.CHECKSCHEDULEFORVENDORANDDATE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case scheduleConstants.CHECKSCHEDULEFORVENDORANDDATE_SUCCESS:
            return {
                ...state,
                sheduleHist: action.payload,
                isWritten: false,
                //
                isLoadedDate: true
            }
        case scheduleConstants.CHECKSCHEDULEFORVENDORANDDATE_FAILURE:
        case scheduleConstants.RESETWRITTENVALUE: {
            return {
                ...state,
                isWritten: false
            }
        }
        case scheduleConstants.RESTART_SCHEDULE:
            return {
                ...state,
                sheduleHist: [],
                //
                isLoadedDate: false
            }
        default:
            return state
    }
}
