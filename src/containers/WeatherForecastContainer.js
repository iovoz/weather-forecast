import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    fetchWeatherForecastFiveDaysSummary,
    fetchWeatherForecastFiveDaysDetails
} from '../redux/actions/weatherForecastActions';
import WeatherForecastForm from './weatherForecast/WeatherForecastForm';

class WeatherForecastContainer extends Component {
    static propTypes = {
        ajaxStatus: PropTypes.object.isRequired,
        fetchWeatherForecastFiveDaysSummary: PropTypes.func.isRequired,
        fetchWeatherForecastFiveDaysDetails: PropTypes.func.isRequired,
        city: PropTypes.object,
        listSummary: PropTypes.array,
        listDetails: PropTypes.array
    };

    static defaultProps = {
        city: {},
        listSummary: [],
        listDetails: []
    };

    render() {
        const { ajaxStatus, city, listSummary, listDetails,
            fetchWeatherForecastFiveDaysSummary,
            fetchWeatherForecastFiveDaysDetails } = this.props;

        return (
            <div className="form-group">
                <WeatherForecastForm
                    ajaxStatus={ajaxStatus}
                    city={city}
                    listSummary={listSummary}
                    listDetails={listDetails}
                    searchSummary={fetchWeatherForecastFiveDaysSummary}
                    searchDetails={fetchWeatherForecastFiveDaysDetails}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ajaxStatus: state.ajaxStatus,
    locations: state.weatherForecast.locations,
    city: state.weatherForecast.city,
    listSummary: state.weatherForecast.listSummary,
    listDetails: state.weatherForecast.listDetails,
    dayDetails: state.weatherForecast.dayDetails
});

export default connect(mapStateToProps, {
    fetchWeatherForecastFiveDaysSummary,
    fetchWeatherForecastFiveDaysDetails
})(WeatherForecastContainer);
