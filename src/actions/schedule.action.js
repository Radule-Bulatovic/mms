import { scheduleConstants } from "../constants/schedule.constants";

export function writeScheduleHist_request(item) {
    return {
        type: scheduleConstants.WRITE_SCHEDULE_HIST_REQUEST,
        payload: item
    }
}
export function writeScheduleHist_success(item) {
    return {
        type: scheduleConstants.WRITE_SCHEDULE_HIST_SUCCESS,
        payload: item
    }
}
export function writeScheduleHist_failure(error) {
    return {
        type: scheduleConstants.WRITE_SCHEDULE_HIST_FAILURE,
        payload: error
    }
}


//adim action
//provjera rasporeda, koje prodavnice za odredjeni dan je komercijalista obisao
export function checkScheduleForVendorDate_request(details) {
    return {
        type: scheduleConstants.CHECKSCHEDULEFORVENDORANDDATE_REQUEST,
        payload: details
    }
}
export function checkScheduleForVendorDate_success(details) {
    return {
        type: scheduleConstants.CHECKSCHEDULEFORVENDORANDDATE_SUCCESS,
        payload: details
    }
}
export function checkScheduleForVendorDate_failure(error) {
    return {
        type: scheduleConstants.CHECKSCHEDULEFORVENDORANDDATE_FAILURE,
        payload: error
    }
}

export function resetIsWrittenValue(item) {
    return {
        type: scheduleConstants.RESETWRITTENVALUE,
        payload: item
    }
}

export function restartSchedule(sch) {
    return {
        type: scheduleConstants.RESTART_SCHEDULE,
        payload: sch
    }   
}