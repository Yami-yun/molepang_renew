import { 

    GET_GAME_DATA, 
    SET_GAME_RESULT, 
    CHANGE_GAME_SCREEN,
    SET_USER_NICK,
    // SET_GAME_SCORE,
    GET_TOTAL_RANK,
    GET_TOP_TEN_RANK,
} from '../action/types';

const initGameData = {
    gamescreen: 0,
    gameResult: {
        score: 0,
        correctWord : [],
        incorrectWord : [],
    },
    userNick:"",
    totalRank:[],
    topTenRank:[],

}

export default function(state=initGameData, action:any) {
    switch(action.type){
        case CHANGE_GAME_SCREEN:

            return {...state, gamescreen: action.payload};

        case SET_USER_NICK:
            return {...state, userNick: action.payload};

        case SET_GAME_RESULT:
            return {...state, gameResult: action.payload};

        case GET_TOTAL_RANK:
            return {...state, totalRank: [...action.payload]};

        case GET_TOP_TEN_RANK:
            return {...state, topTenRank: [...action.payload]};


        default:
            return state;
    }

};