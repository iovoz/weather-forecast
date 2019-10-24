import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';

export default class LoadingContainer extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        loading: PropTypes.bool
    };

    static defaultProps = {
        loading: false
    };

    render() {
        const { children, loading } = this.props;
        return (
            <React.Fragment>
                {loading ? <LoadingSpinner/> : children}
            </React.Fragment>
        );
    }
}
