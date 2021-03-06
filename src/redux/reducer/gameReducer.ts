import { 

    GET_GAME_DATA, 
    SET_GAME_RESULT, 
    CHANGE_GAME_SCREEN,
    SET_USER_NICK,
    // SET_GAME_SCORE,
    GET_TOTAL_RANK,
    GET_TOP_TEN_RANK,
    REGISTER_RANK,
} from '../action/types';

const initGameData:{
    gamescreen:number,
    gameResult:{
        score:number,
        correctWord:string[],
        incorrectWord:string[],
    },
    userNick:string,
    totalRank:{
        nick: string,
        score: number,
        date: string,
    }[],
    topTenRank:{
        nick: string,
        score: number,
        date: string,
    }[],
} = {
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

        case REGISTER_RANK:
            // 임시 데이터 설정
            let cur = 0;
            for(let i=0; i< state.totalRank.length; i++){
                cur = i;
                if(state.gameResult.score > state.totalRank[i].score){
                    break;
                }
            }
            const data = {
                nick: state.userNick,
                score: state.gameResult.score,
                // score: state.gameResult.score,
                date: "2021. 02. 22",
            };
            return {...state, totalRank: [...state.totalRank.slice(0, cur), data , ...state.totalRank.slice(cur)]};

        default:
            return state;
    }

};