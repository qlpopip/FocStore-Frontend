import { API } from "utils/API";

export const getAttendance = () => {
    return new API({
        url: `attendance/all`
    }).get();
};
export const createAttendance = () => {
    return new API({
        url: `attendance`
    }).post();
}

