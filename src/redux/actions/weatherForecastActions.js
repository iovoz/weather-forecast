import { FETCH_PENDING, FETCH_COMPLETE, SERVER_ERROR } from '../reducers/ajaxStatusReducer';
import {
    WEATHER_FORECAST_FIVE_DAYS_SUMMARY,
    WEATHER_FORECAST_FIVE_DAYS_DETAILS
} from '../reducers/weatherForecastReducer';
import constants from '../../constants/constants';
import axios from 'axios';

export function fetchWeatherForecastFiveDaysSummary(location) {
    return async dispatch => {
        try {
            dispatch({
                type: FETCH_PENDING
            });

            const current = await axios.get(
                `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${constants.APPID_FREE}`
            );

            const response = await axios.get(
                `https://openweathermap.org/data/2.5/forecast/daily/?appid=${constants.APPID_PUBLIC}&id=${current.data.id}&units=metric`
            );

            dispatch({
                type: WEATHER_FORECAST_FIVE_DAYS_SUMMARY,
                city: response.data.city || {},
                listSummary: response.data.list || []
            });

            dispatch({
                type: FETCH_COMPLETE
            });
        } catch (e) {
            dispatch({
                type: WEATHER_FORECAST_FIVE_DAYS_SUMMARY,
                city: { notFound: true },
                listSummary: []
            });
            dispatch({
                type: SERVER_ERROR,
                serverStatus: e.response
            });
        }
    };
}

export function fetchWeatherForecastFiveDaysDetails() {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: FETCH_PENDING
            });

            const state = getState();
            const response = await axios.get(
                `http://api.openweathermap.org/data/2.5/forecast?id=${state.weatherForecast.city.id}&appid=${constants.APPID_FREE}`
            );

            dispatch({
                type: WEATHER_FORECAST_FIVE_DAYS_DETAILS,
                listDetails: response.data.list || []
            });

            dispatch({
                type: FETCH_COMPLETE
            });
        } catch (e) {
            dispatch({
                type: SERVER_ERROR,
                serverStatus: e.response
            });
        }
    };
}
