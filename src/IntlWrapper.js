import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

function Fragment(props) {
    return props.children || <span {...props} /> || null;
}

class IntlWrapper extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
        children: PropTypes.node.isRequired,
        lang: PropTypes.string.isRequired,
        locales: PropTypes.shape({
            'en': PropTypes.object,
            'tc': PropTypes.object
        }).isRequired
    };

    render() {
        const { lang, locales, store, children } = this.props;

        return (
            <Provider store={store}>
                <IntlProvider locale={lang} messages={locales[lang]} textComponent={Fragment}>
                    {children}
                </IntlProvider>
            </Provider>
        );
    }
}

const mapStateToProps = state => ({ lang: state.language.lang });

export default connect(mapStateToProps)(IntlWrapper);
