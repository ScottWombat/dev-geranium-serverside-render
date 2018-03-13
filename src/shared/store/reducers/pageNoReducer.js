import {PAGE_NO_CHANGED} from '../../actionTypes';


export default (state = {
   pageNo: 1
}, action) => {
   switch(action.type){
        case PAGE_NO_CHANGED:
           return Object.assign({},...state,{
                        pageNo: action.pageNo
           });
         default: 
            return state;
    }   
};
