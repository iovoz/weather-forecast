import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

export default class InputField extends Component {
    static propTypes = {
        input: PropTypes.object.isRequired,
        meta: PropTypes.object.isRequired,
        placeholder: PropTypes.string,
        className: PropTypes.string,
        type: PropTypes.string,
        maxLength: PropTypes.number,
        disable: PropTypes.bool
    };

    static defaultProps = {
        className: 'form-control',
        placeholder: '',
        type: 'text',
        maxLength: null,
        disable: false
    };

    render() {
        const { input, meta, type, disable, placeholder, maxLength, className } = this.props;

        return (
            <React.Fragment>
                <input
                    type={type}
                    {...input}
                    disabled={disable}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    className={classNames(className, { 'form-control-invalid': meta.touched && meta.error })}
                />
                {meta.touched && meta.error && <div className="error"><FormattedMessage id={meta.error} /></div>}
            </React.Fragment>
        );
    }
}
