import { 

    GET_GAME_DATA, 
    SET_GAME_RESULT, 
    CHANGE_GAME_SCREEN,
    SET_USER_NICK,
    // SET_GAME_SCORE,
    GET_TOTAL_RANK,
    GET_TOP_TEN_RANK,
    REGISTER_RANK,
    GET_PROBLEM,
    GET_PROBLEM_SUC,
    GET_PROBLEM_ERR,
    REGISTER_RANK_SUC,
    REGISTER_RANK_ERR,
} from '../action/types';


export type total_rank = {
    id: string,
    nickname: string,
    score: string,
    play_date: string,
    ranking: string,
};

type game_problem = {
    answer:number;
    consonant:string;
    meaning:string;
    problem:string[];
    stage:number;
};

export interface IGameData{
    gamescreen:number,
    gameResult:{
        score:number,
        correctWord:string[],
        incorrectWord:string[],
    },
    userNick:string,
    totalRank:{
        data:total_rank[],
        err:boolean,
        isloading:boolean,
    },
    topTenRank:{
        data:total_rank[],
    },
    problemData:{
        data:game_problem[],
        err:boolean,
        isloading:boolean,
    },
    userRank:number,
    totalRankingCount:number,
}


const initGameData:IGameData = {
    gamescreen: 0,
    gameResult: {
        score: 0,
        correctWord : [],
        incorrectWord : [],
    },
    userRank: 0,
    userNick:"",
    totalRankingCount:0,
    totalRank:{
        isloading:false,
        data:[],
        err:false,
    },
    topTenRank:{
        data:[]
    },
    problemData:{
        isloading:false,
        data:[],
        err:false,
    },

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
            return {...state, topTenRank: {data: action.data}};

        case GET_PROBLEM:
            return {...state, problemData: {isloading:true, err:false}};

        case GET_PROBLEM_SUC:
            return {...state, problemData: {data:[...action.data], isloading:false, err:false}};

        case GET_PROBLEM_ERR:
            return {...state, problemData: {isloading:false, err:true}};

        case REGISTER_RANK:
            // 임시 데이터 설정
            // let cur = 0;
            // for(let i=0; i< state.totalRank.length; i++){
            //     cur = i;
            //     if(state.gameResult.score > state.totalRank[i].score){
            //         break;
            //     }
            // }
            // const data = {
            //     nick: state.userNick,
            //     score: state.gameResult.score,
            //     // score: state.gameResult.score,
            //     date: "2021. 02. 22",
            // };
            // return {...state, userRank : cur+1, topTenRank:[...state.totalRank.slice(0, cur), data , ...state.totalRank.slice(cur)], totalRank: [...state.totalRank.slice(0, cur), data , ...state.totalRank.slice(cur)]};
            return {...state, 
                    totalRank: {
                    isloading:true, 
                    err:false
                }
            };

            case REGISTER_RANK_SUC:
                let userRankTmp = 1;
                for(let i=0; i < action.data.ranking.length; i++){
                    // 현재 랭킹 등록한 유저가 부여받은 아이디로 해당 유저의 랭킹을 가져온다.
                    if(action.data.my_id === action.data.ranking[i].id){
                        userRankTmp = action.data.ranking[i].ranking;
                        break;
                    }
                }
                return {...state, 
                    userRank: userRankTmp, 
                    totalRankingCount : action.data.total_count, 
                    totalRank: {
                        data: action.data.ranking, 
                        isloading:false,
                        err:false
                    }
                };

            case REGISTER_RANK_ERR:
                return {...state, totalRank: {isloading:false, err:true}};

        default:
            return state;
    }

};