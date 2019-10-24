import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import LoadingContainer from '../../components/loading/LoadingContainer';
import InputField from '../../components/inputs/InputField';
import Button from '../../components/inputs/Button';
import { required } from '../../utils/validators';
import moment from 'moment';

class WeatherForecastForm extends Component {
    static propTypes = {
        intl: PropTypes.object.isRequired,
        ajaxStatus: PropTypes.object.isRequired,
        city: PropTypes.object.isRequired,
        listSummary: PropTypes.array.isRequired,
        listDetails: PropTypes.array.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        searchSummary: PropTypes.func.isRequired,
        searchDetails: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            showOneDayDetails: false
        };
    }

    fetchOneDayDetails = (e) => {
        const { listDetails, searchDetails } = this.props;
        this.setState({
            showOneDayDetails: true
        }, () => {
            if (!listDetails.length) {
                searchDetails();
            }
        });
    };

    submitHandler = value => {
        this.setState({
            showOneDayDetails: false
        }, () => {
            this.props.searchSummary(value.location);
        })
    };

    render() {
        const { city, listSummary, listDetails, intl, handleSubmit, ajaxStatus } = this.props;
        const placeholder = intl.formatMessage({ id: 'weather.forecast.cityName' });
        const day = new Date().getDay();

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
                        <Button type="submit">
                            <i className="fa fa-question-circle"/>
                            <FormattedMessage id="weather.forecast.search"/>
                        </Button>
                    </div>
                </div>
                {!this.state.showOneDayDetails && (
                    <div className="form-group">
                        <LoadingContainer loading={ajaxStatus.isLoading}>
                            <div className="col-md-12 col-xs-6">
                                <div className="data-list-summary">
                                    {city.notFound === true && (
                                        <div className="alert alert-warning">
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
                                                        listSummary.slice(0, 5).map((it, i) => {
                                                            const currentDay = day + i - Math.floor((day + i) / 7) * 7;

                                                            return (
                                                                <div key={i}
                                                                     className="weather-forecast-list__body__item"
                                                                     onClick={this.fetchOneDayDetails}>
                                                                    {intl.locale === 'en' && (
                                                                        <div className="day">
                                                                            {moment().add(i, 'days').format('Do MMMM')}<br/>
                                                                            <FormattedMessage
                                                                                id={`common.day-${currentDay}`}/>
                                                                        </div>
                                                                    )}
                                                                    {intl.locale === 'tc' && (
                                                                        <div className="day">
                                                                            {moment().add(i, 'days').format('MMMM Do')}<br/>
                                                                            （<FormattedMessage
                                                                            id={`common.day-${currentDay}`}/>）
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
            </form>
        );
    }
}

export default reduxForm({
    form: 'weatherForecastForm'
})(injectIntl(WeatherForecastForm));
