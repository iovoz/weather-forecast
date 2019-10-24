import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import constants from '../constants/constants';
import { changeUILanguage } from '../redux/actions/languageActions';

class Footer extends Component {
    static propTypes = {
        lang: PropTypes.string.isRequired,
        changeUILanguage: PropTypes.func.isRequired
    };

    changeLanguage = e => {
        const newLang = constants.languages.find(item => item.lang === e.target.value);
        this.props.changeUILanguage(newLang.lang);
    };

    render() {
        const { lang } = this.props;

        return (
            <div className="row col-md-12">
                <div className="language-switch">
                    <select
                        name="status"
                        className="form-control"
                        value={lang}
                        onChange={this.changeLanguage}
                    >
                        {constants.languages.map(item => {
                            return (
                                <option key={item.lang} value={item.lang}>
                                    {item.name}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    lang: state.language.lang
});

export default connect(mapStateToProps, { changeUILanguage })(Footer);
