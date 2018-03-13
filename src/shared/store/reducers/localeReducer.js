import {LOCALE_SELECTED} from '../../actionTypes';

import {locales} from './localeLoader';

export default (state = {
   lang: 'en',
   messages: require("../translations/locale_en.json")
}, action) => {
   switch(action.type){
        case LOCALE_SELECTED:
           let locale = locales(action.locale);
           return Object.assign({},state,{
                        lang: locale.lang,
                        messages: locale.messages
           });
         default: 
            return state;
    }   
};

