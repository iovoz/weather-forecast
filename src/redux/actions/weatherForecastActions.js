import { FETCH_PENDING, FETCH_COMPLETE, SERVER_ERROR } from '../reducers/ajaxStatusReducer';
import {
    WEATHER_FORECAST_FIVE_DAYS_SUMMARY,
    WEATHER_FORECAST_FIVE_DAYS_DETAILS
} from '../reducers/weatherForecastReducer';
import constants from '../../constants/constants';
import axios from 'axios';

export function fetchWeatherForecastFiveDaysSummary(location) {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: FETCH_PENDING
            });

            const state = getState();
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${constants.APPID_FREE}&units=metric`;
            if (state.language.lang === 'tc') url += '&lang=zh_tw';
            const current = await axios.get(url);

            url = `https://openweathermap.org/data/2.5/forecast/daily/?appid=${constants.APPID_PUBLIC}&id=${current.data.id}&units=metric`;
            if (state.language.lang === 'tc') url += '&lang=zh_tw';
            const response = await axios.get(url);

            let listSummary = [];
            const millisecond = new Date().getTime();
            if (response.data.list) listSummary = response.data.list.filter(it => it.dt*1000 > millisecond).slice(0, 5);

            dispatch({
                type: WEATHER_FORECAST_FIVE_DAYS_SUMMARY,
                city: current.data || {},
                listSummary
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
            let url = `http://api.openweathermap.org/data/2.5/forecast?id=${state.weatherForecast.city.id}&appid=${constants.APPID_FREE}&units=metric`;
            if (state.language.lang === 'tc') url += '&lang=zh_tw';
            const response = await axios.get(url);

            let listDetails = {};
            if (response.data.list) {
                listDetails = response.data.list.reduce((acc, cur) => {
                    const date = cur.dt_txt.substring(0, 10);
                    if (acc[date]) acc[date].push(cur);
                    else acc[date] = [cur];
                    return acc;
                }, {});
            }
            dispatch({
                type: WEATHER_FORECAST_FIVE_DAYS_DETAILS,
                listDetails
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
