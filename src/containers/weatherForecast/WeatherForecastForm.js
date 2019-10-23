import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import { required } from '../../utils/validators';
import InputField from '../../components/inputs/InputField';

class WeatherForecastForm extends Component {
    static propTypes = {
        intl: PropTypes.object.isRequired,
        ajaxStatus: PropTypes.object.isRequired,
        list: PropTypes.array.isRequired,
        details: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        fetchWeatherForecastFiveDays: PropTypes.func.isRequired,
        fetchWeatherForecastPerDay: PropTypes.func.isRequired
    };

    submitHandler = value => {
        this.props.fetchWeatherForecastFiveDays(value);
    };

    render() {
        const { intl, handleSubmit, ajaxStatus } = this.props;
        const placeholder = intl.formatMessage({ id: 'weather.forecast.cityName' });

        return (
            <form className="form-horizontal" onSubmit={handleSubmit(this.submitHandler)}>
                <div className="row">
                    <div className="form-group">
                        <div className="col-md-4">
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
                    </div>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'weatherForecastForm'
})(injectIntl(WeatherForecastForm));
