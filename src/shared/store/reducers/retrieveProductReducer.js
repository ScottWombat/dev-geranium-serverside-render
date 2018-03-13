import {MEN_PRODUCTS_RETRIEVAL,WOMEN_PRODUCTS_RETRIEVAL} from '../../actionTypes';
import Immutable from 'immutable';

const initialState ={
    menProductList:[],
    womenProductList:[]
}
export default function retrieveProductsReducer(products=initialState,action){

    products = Immutable.fromJS(products);
    switch (action.type){
        case MEN_PRODUCTS_RETRIEVAL:
            return products.set('menProductList',action.menProductList).toJS()        
        case WOMEN_PRODUCTS_RETRIEVAL:
            return products.set('womenProductList',action.womenProductList).toJS()
        default:
            return products;
            
    }
}