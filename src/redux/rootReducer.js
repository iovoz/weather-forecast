import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import languageReducer from './reducers/languageReducer';
import ajaxStatusReducer from './reducers/ajaxStatusReducer';
import weatherForecastReducer from './reducers/weatherForecastReducer';

export default combineReducers({
    form: formReducer,
    language: languageReducer,
    ajaxStatus: ajaxStatusReducer,
    weatherForecast: weatherForecastReducer
});
