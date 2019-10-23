export const FETCH_PENDING = 'weatherForecast/ajaxStatus/fetchPending';
export const FETCH_COMPLETE = 'weatherForecast/ajaxStatus/fetchComplete';
export const SERVER_ERROR = 'weatherForecast/ajaxStatus/serverError';
export const RESET_STATUS = 'weatherForecast/ajaxStatus/resetStatus';

const initialState = {
    actionName: '',
    isServerError: false,
    isLoading: false,
    serverStatus: '',
    serverMessage: '',
    serverErrors: []
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case SERVER_ERROR:
            return {
                ...state,
                isServerError: true,
                isLoading: false,
                serverStatus: action.serverStatus,
                serverMessage: action.serverMessage,
                serverErrors: action.serverErrors
            };
        case FETCH_PENDING:
            return {
                ...state,
                isLoading: true,
                actionName: action.actionName
            };
        case FETCH_COMPLETE:
            return {
                ...state,
                isLoading: false,
                isServerError: false,
                serverStatus: ''
            };
        case RESET_STATUS:
            return {
                ...state,
                isServerError: false,
                isLoading: false,
                serverStatus: '',
                serverMessage: ''
            };
        default:
            return state;
    }
}
