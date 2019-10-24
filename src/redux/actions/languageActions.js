import { CHANGE_LANGUAGE } from '../reducers/languageReducer';

export function changeUILanguage(lang) {
    return async dispatch => {
        dispatch({
            type: CHANGE_LANGUAGE,
            lang
        });
    }
}
