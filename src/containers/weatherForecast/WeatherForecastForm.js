import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage, FormattedHTMLMessage, injectIntl } from 'react-intl';
import LoadingContainer from '../../components/loading/LoadingContainer';
import InputField from '../../components/inputs/InputField';
import Button from '../../components/inputs/Button';
import { required } from '../../utils/validators';
import { convertDegreeCtoF, convertWindDegree } from '../../utils/helpers';
import moment from 'moment';

class WeatherForecastForm extends Component {
    static propTypes = {
        intl: PropTypes.object.isRequired,
        ajaxStatus: PropTypes.object.isRequired,
        city: PropTypes.object.isRequired,
        listSummary: PropTypes.array.isRequired,
        listDetails: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        searchSummary: PropTypes.func.isRequired,
        searchDetails: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            showOneDayDetails: ''
        };
    }

    fetchOneDayDetails = (date) => {
        const { listDetails, searchDetails } = this.props;
        this.setState({
            showOneDayDetails: date
        }, () => {
            if (!listDetails[date]) {
                searchDetails();
            }
        });
    };

    showFiveDaysList = () => {
        this.setState({
            showOneDayDetails: ''
        });
    };

    submitHandler = value => {
        this.setState({
            showOneDayDetails: ''
        }, () => {
            this.props.searchSummary(value.location);
        });
    };

    render() {
        const { city, listSummary, listDetails, intl, handleSubmit, ajaxStatus } = this.props;
        const placeholder = intl.formatMessage({ id: 'weather.forecast.cityName' });
        let temperatureTitle = '', sunrise = '', sunset = '';
        if (this.state.showOneDayDetails) {
            temperatureTitle = intl.formatMessage({ id: 'weather.forecast.title' }, {
                city: city.name
            });
            sunrise = new Date(city.sys.sunrise * 1000);
            sunset = new Date(city.sys.sunset * 1000);
        }

        return (
            <form className="form-horizontal" onSubmit={handleSubmit(this.submitHandler)}>
                <div className="form-group">
                    <div className="search-engine">
                        <div className="search-input">
                            <Field
                                name="location"
                                type="text"
                                placeholder={placeholder}
                                component={InputField}
                                className="form-control"
                                validate={[required]}
                                disabled={ajaxStatus.isLoading}
                            />
                        </div>
                        <Button type="submit" submitting={ajaxStatus.isLoading}>
                            <FormattedMessage id="weather.forecast.search"/>
                        </Button>
                    </div>
                </div>
                {!this.state.showOneDayDetails && (
                    <div className="form-group">
                        <LoadingContainer loading={ajaxStatus.isLoading}>
                            <div className="col-md-12">
                                <div className="data-list-summary">
                                    {city.notFound === true && (
                                        <div className="col-md-8 alert alert-warning">
                                            <FormattedMessage id="weather.forecast.dataNotFound"/>
                                        </div>
                                    )}
                                    {
                                        listSummary.length > 0 && (
                                            <div className="weather-forecast-list">
                                                <h3 className="weather-forecast-list__header">
                                                    <FormattedMessage id="weather.forecast.daysAmount"
                                                                      values={{ amount: 5 }}/>
                                                </h3>
                                                <div className="weather-forecast-list__body">
                                                    {
                                                        listSummary.map((it, i) => {
                                                            const currentDate = new Date(it.dt * 1000);
                                                            return (
                                                                <div key={i}
                                                                     className="weather-forecast-list__body__item"
                                                                     onClick={() => this.fetchOneDayDetails(moment(currentDate).format('YYYY-MM-DD'))}>
                                                                    {intl.locale === 'en' && (
                                                                        <div className="day">
                                                                            {moment(currentDate).format('Do MMMM')}<br/>
                                                                            <FormattedMessage
                                                                                id={`common.day-${currentDate.getDay()}`}/>
                                                                        </div>
                                                                    )}
                                                                    {intl.locale === 'tc' && (
                                                                        <div className="day">
                                                                            {moment(currentDate).format('MMMM Do')}<br/>
                                                                            （<FormattedMessage
                                                                            id={`common.day-${currentDate.getDay()}`}/>）
                                                                        </div>
                                                                    )}
                                                                    <div className="icon">
                                                                        <img
                                                                            src={`https://openweathermap.org/img/wn/${it.weather[0].icon}@2x.png`}
                                                                            alt="forecast" width="50" height="50"/>
                                                                    </div>
                                                                    <div
                                                                        className="temp">{it.temp.min.toFixed(1)} ~ {it.temp.max.toFixed(1)} °C
                                                                    </div>
                                                                    <div
                                                                        className="temp">{convertDegreeCtoF(it.temp.min).toFixed(1)} ~ {convertDegreeCtoF(it.temp.max).toFixed(1)} °F
                                                                    </div>
                                                                    <div className="cond">
                                                                        {it.weather[0].description}
                                                                    </div>
                                                                    <div className="wind">
                                                                        <FormattedMessage id="weather.forecast.wind"
                                                                                          values={{ wind: it.speed }}/>
                                                                    </div>
                                                                    <div className="other">
                                                                        <FormattedMessage
                                                                            id="weather.forecast.otherCond"
                                                                            values={{
                                                                                cloud: it.clouds,
                                                                                hpa: it.pressure
                                                                            }}/>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </LoadingContainer>
                    </div>
                )}
                {this.state.showOneDayDetails && (
                    <div className="form-group">
                        <LoadingContainer loading={ajaxStatus.isLoading}>
                            <div className="col-md-12">
                                <div className="date-layout">
                                    <div className="date-layout__today">
                                        <h2 className="title">{temperatureTitle}</h2>
                                        <h3 className="temperature">
                                            <img className="__img"
                                                 src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                                                 alt={temperatureTitle} width="50" height="50"/>
                                            {Math.round(city.main.temp)} °C
                                            / {Math.round(convertDegreeCtoF(city.main.temp))} °F
                                        </h3>
                                        <div className="date-layout__items">
                                            <div className="date-layout__items__item">
                                                <FormattedMessage id="common.wind"/>{`: `}
                                                <FormattedMessage id="weather.forecast.wind"
                                                                  values={{ wind: city.wind.speed }}/>,
                                                <FormattedMessage
                                                    id={convertWindDegree(city.wind.deg)}/> ({city.wind.deg})
                                            </div>
                                            <div className="date-layout__items__item">
                                                <FormattedMessage
                                                    id="common.cloudiness"/>: {city.weather[0].description}</div>
                                            <div className="date-layout__items__item">
                                                <FormattedMessage id="common.pressure"/>: {city.main.pressure} hpa
                                            </div>
                                            <div className="date-layout__items__item">
                                                <FormattedMessage id="common.humidity"/>: {city.main.humidity} %
                                            </div>
                                            <div className="date-layout__items__item">
                                                <FormattedMessage id="common.sunrise"/>: {moment(sunrise).format('LT')}
                                            </div>
                                            <div className="date-layout__items__item">
                                                <FormattedMessage id="common.sunset"/>: {moment(sunset).format('LT')}
                                            </div>
                                            <div className="date-layout__items__item">
                                                <FormattedMessage id="common.geoCoords"/>{`: `}
                                                <a target="_blank" rel="noopener noreferrer"
                                                   href={`https://openweathermap.org/weathermap?zoom=8&lat=${city.coord.lat}&lon=${city.coord.lon}`}>
                                                    [{city.coord.lat}, {city.coord.lon}]
                                                </a>
                                            </div>
                                        </div>
                                        <div className="back-to-list">
                                            <div className="btn btn-orange" onClick={this.showFiveDaysList}>
                                                <FormattedMessage id="common.backToForecastList" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="date-layout__hourly">
                                        <h2 className="title">
                                            <FormattedHTMLMessage id="weather.forecast.hourlyTitle" values={{date: this.state.showOneDayDetails}}/>
                                        </h2>
                                        {
                                            listDetails[this.state.showOneDayDetails] && listDetails[this.state.showOneDayDetails].map(it => {
                                                return (
                                                    <div className="item" key={it.dt}>
                                                        <div className="time">
                                                            {it.dt_txt.substring(11, 16)}
                                                            <img src={`https://openweathermap.org/img/wn/${it.weather[0].icon}@2x.png`} alt="forecast" width="50" height="50"/>
                                                        </div>
                                                        <div className="others">
                                                            <div className="temp">
                                                                {it.main.temp} °C / {Math.round(convertDegreeCtoF(it.main.temp))} °F, {it.weather[0].description}
                                                            </div>
                                                            <div className="cond">
                                                                <FormattedMessage id="weather.forecast.wind"
                                                                                  values={{ wind: it.wind.speed }}/>,
                                                                <FormattedMessage
                                                                    id="weather.forecast.otherCond"
                                                                    values={{
                                                                        cloud: it.clouds.all,
                                                                        hpa: it.main.pressure
                                                                    }}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </LoadingContainer>
                    </div>
                )}
            </form>
        );
    }
}

export default reduxForm({
    form: 'weatherForecastForm'
})(injectIntl(WeatherForecastForm));
