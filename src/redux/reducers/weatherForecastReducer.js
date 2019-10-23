export const WEATHER_FORECAST_FIVE_DAYS = 'weatherForecast/fetchWeatherForecastFiveDays';
export const WEATHER_FORECAST_PER_DAY = 'weatherForecast/fetchWeatherForecastPerDay';

const initialState = {
    list: [],
    details: {}
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case WEATHER_FORECAST_PER_DAY:
            return {
                ...state,
                details: action.details
            };
        case WEATHER_FORECAST_FIVE_DAYS:
            return {
                ...state,
                list: action.list
            };
        default:
            return state;
    }
}
