export const CHANGE_LANGUAGE = 'weatherForecast/changeLanguage';

const initialState = {
    lang: localStorage.getItem('wf-app-locale') || 'en'
};

export default function reducer(state = initialState, action= {}) {
    switch (action.type) {
        case CHANGE_LANGUAGE:
            localStorage.setItem('wf-app-locale', action.lang);
            return {
                ...state,
                lang: action.lang
            };
        default:
            return state;
    }
}
