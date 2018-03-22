import {combineReducers} from 'redux';

import countryReducer from './country/countryReducer';
import localeReducer from './localization/localeReducer';
import pageNoReducer from './pageNoChanged/pageNoReducer';
import addItemToCart from './addItemToCart/addItemToCartReducer';
import initialiseRecordsPerPageReducer from './recordsPerPage/initialiseRecordsPerPageReducer';
import retrieveProductReducer from './retrieveProduct/retrieveProductReducer';
import changeImageSourceReducer from './changeImageSource/changeImageSourceReducer';
import purchaseReducer from './purchase/purchaseReducer';


const rootReducer = combineReducers({
    countryReducer,
    localeReducer,
    pageNoReducer,
    retrieveProductReducer,
    initialiseRecordsPerPageReducer,
    //changeImageSourceReducer,
    addItemToCart,
    purchaseReducer
});

export default rootReducer;