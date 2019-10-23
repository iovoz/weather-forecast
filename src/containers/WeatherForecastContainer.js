import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchWeatherForecastFiveDays, fetchWeatherForecastPerDay } from '../redux/actions/weatherForecastActions';
import WeatherForecastForm from './weatherForecast/WeatherForecastForm';

class WeatherForecastContainer extends Component {
    static propTypes = {
        ajaxStatus: PropTypes.object.isRequired,
        fetchWeatherForecastFiveDays: PropTypes.func.isRequired,
        fetchWeatherForecastPerDay: PropTypes.func.isRequired,
        list: PropTypes.array,
        details: PropTypes.object
    };

    static defaultProps = {
        list: [],
        details: {}
    };

    render() {
        const { ajaxStatus, list, details, fetchWeatherForecastFiveDays, fetchWeatherForecastPerDay } = this.props;
        return (
            <div className="col-md-12">
                <WeatherForecastForm
                    ajaxStatus={ajaxStatus}
                    list={list}
                    details={details}
                    fetchWeatherForecastFiveDays={fetchWeatherForecastFiveDays}
                    fetchWeatherForecastPerDay={fetchWeatherForecastPerDay}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ajaxStatus: state.ajaxStatus,
    list: state.weatherForecast.list,
    details: state.weatherForecast.details
});

export default connect(mapStateToProps, {
    fetchWeatherForecastFiveDays,
    fetchWeatherForecastPerDay
})(WeatherForecastContainer);
