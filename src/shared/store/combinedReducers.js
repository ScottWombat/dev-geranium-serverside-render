import {combineReducers} from 'redux';

import countryReducer from './reducers/countryReducer';
import localeReducer from './reducers/localeReducer';
import pageNoReducer from './reducers/pageNoReducer';
import addItemToCart from './reducers/addItemToCartReducer';
import initialiseRecordsPerPageReducer from './reducers/initialiseRecordsPerPageReducer';
import retrieveProductReducer from './reducers/retrieveProductReducer';
import changeImageSourceReducer from './reducers/changeImageSourceReducer';
import purchaseReducer from './reducers/purchaseReducer';


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