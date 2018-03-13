import {CHANGE_IMAGE_SOURCE} from '../../actionTypes';
import Immutable from 'immutable';
const initialState={
    sourceName:''
}
export default function changeImageSource(state = initialState,action){
   console.log(">>" +action.sourceName);
   switch(action.type){
        case CHANGE_IMAGE_SOURCE:
           return Object.assign({},...state,{
                        sourceName:action.sourceName
           });
         default: 
            return state;
    }   
}
