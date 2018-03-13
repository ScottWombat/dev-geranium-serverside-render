
import { ADD_TO_CART } from '../../actionTypes'
/*
const products = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
       return Object.assign({},...state,{
            productItem: action.productItem
        });
    default:
      return state
  }
}
*/
const initialState={
    addedItems:[]
}
export default function cart(state = initialState,action){
   
   switch(action.type){
        case ADD_TO_CART:
           return Object.assign({},...state,{
                        addedItems: state.addedItems.concat([action.product])
           });
         default: 
            return state;
    }   
}
