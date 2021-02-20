import { 

    GET_GAME_DATA, 

} from '../action/types';

const initGameData = {
    gamescreen: 0,

}

export default function(state=initGameData, action:any) {
    switch(action.type){
        case GET_GAME_DATA:

            return {...state, getGameData: action.payload};


        default:
            return state;
    }

};