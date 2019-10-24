export const WEATHER_FORECAST_FIVE_DAYS_SUMMARY = 'weatherForecast/fetchWeatherForecastFiveDaysSummary';
export const WEATHER_FORECAST_FIVE_DAYS_DETAILS = 'weatherForecast/fetchWeatherForecastFiveDaysDetails';

const initialState = {
    city: {},
    listSummary: [],
    listDetails: []
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case WEATHER_FORECAST_FIVE_DAYS_SUMMARY:
            return {
                ...state,
                city: action.city,
                listSummary: action.listSummary
            };
        case WEATHER_FORECAST_FIVE_DAYS_DETAILS:
            return {
                ...state,
                listDetails: action.listDetails
            };
        default:
            return state;
    }
}
