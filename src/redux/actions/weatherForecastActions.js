import { FETCH_PENDING, FETCH_COMPLETE, SERVER_ERROR } from '../reducers/ajaxStatusReducer';
import { WEATHER_FORECAST_FIVE_DAYS, WEATHER_FORECAST_PER_DAY } from '../reducers/weatherForecastReducer';
import axios from 'axios';

export function fetchWeatherForecastFiveDays(location) {
    return async dispatch => {
        try {
            dispatch({
                type: FETCH_PENDING
            });

            const response = await axios({
                url: 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22',
                method: 'get'
            });

            console.log(response);
            dispatch({
                type: WEATHER_FORECAST_FIVE_DAYS,
                list: []
            });

            dispatch({
                type: FETCH_COMPLETE
            });
        }
        catch (e) {
            dispatch({
                type: SERVER_ERROR,
                serverStatus: e.response.status,
                serverMessage: e.response.data.message
            })
        }
    };
}

export function fetchWeatherForecastPerDay(location) {
    return async dispatch => {
        try {
            dispatch({
                type: FETCH_PENDING
            });

            const response = await axios({
                url: 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22',
                method: 'get'
            });

            console.log(response);
            dispatch({
                type: WEATHER_FORECAST_PER_DAY,
                details: {}
            });

            dispatch({
                type: FETCH_COMPLETE
            });
        }
        catch (e) {
            dispatch({
                type: SERVER_ERROR,
                serverStatus: e.response.status,
                serverMessage: e.response.data.message
            })
        }
    };
}
