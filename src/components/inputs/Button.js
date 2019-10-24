import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired,
        disabled: PropTypes.bool,
        className: PropTypes.string,
        submitting: PropTypes.bool,
        onClick: PropTypes.func
    };

    static defaultProps = {
        disabled: false,
        submitting: false,
        className: 'btn btn-orange',
        onClick: () => {}
    };

    render() {
        const { disabled, submitting, className } = this.props;

        return (
            <button
                type={this.props.type}
                className={className}
                disabled={disabled || submitting}
                onClick={this.props.onClick}
            >
                {submitting && <i className="fa fa-spinner fa-spin" />} {this.props.children}
            </button>
        );
    }
}
