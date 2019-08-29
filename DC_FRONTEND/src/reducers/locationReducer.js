import { LOCATION_CHANGE } from "../actions/types";

const initialState = {
    previousLocation:'',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOCATION_CHANGE:
            return {
                previousLocation: action.payload,
            }
        default:
            return state
    }
}
