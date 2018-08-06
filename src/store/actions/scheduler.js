import { GET_SCHEDULER } from "./actionTypes";

export const getScheduler = (date) => {
    return {
        type: GET_SCHEDULER,
        payload: date
    }
}