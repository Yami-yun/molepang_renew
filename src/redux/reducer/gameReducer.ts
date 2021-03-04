import { 

    GET_GAME_DATA, 
    CHANGE_GAME_SCREEN,
    // SET_GAME_SCORE,

} from '../action/types';

const initGameData = {
    gamescreen: 0,
    score: 0,

}

export default function(state=initGameData, action:any) {
    switch(action.type){
        case CHANGE_GAME_SCREEN:

            return {...state, gamescreen: action.payload};

        case GET_GAME_DATA:
            return {...state, score: action.payload};
        default:
            return state;
    }

};