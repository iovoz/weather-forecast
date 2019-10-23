import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
    static propTypes = {
        className: PropTypes.string,
        type: PropTypes.string.isRequired,
        onClick: PropTypes.func,
        children: PropTypes.node.isRequired,
        disabled: PropTypes.bool,
        submitting: PropTypes.bool
    };

    static defaultProps = {
        disabled: false,
        submitting: false,
        className: 'btn orange',
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
