import { 

    GET_GAME_DATA, 

} from '../action/types';


export default function(state={}, action:any) {
    switch(action.type){
        case GET_GAME_DATA:

            return {...state, getGameData: action.payload};


        default:
            return state;
    }

};