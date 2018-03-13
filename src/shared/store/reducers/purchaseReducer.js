import {CUSTOMER_PURCHASE} from '../../actionTypes';


const initialState={
    message:''
}
export default function purchaseReducer(state=initialState,action){
    
    switch (action.type){
        case CUSTOMER_PURCHASE:
            return Object.assign({},...state,{
                        message:action.message
             });       
        default:
            return state;
            
    }
}