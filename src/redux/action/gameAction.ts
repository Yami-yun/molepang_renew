
import axios from 'axios';
import { IS_DEV } from 'setting/setting';
import {
    GET_TOTAL_RANK, 
    GET_TOP_TEN_RANK,
    REGISTER_RANK,
    GET_PROBLEM,

} from './types';

// stage:1
// consonant: ㄱㅁㅎ
// problem: ["바나나", "고릴라", "만약에", "가만히"]
// answer: 3
// meaning : 찌그러져 있다.

const gameStageData = [
    {
        stage: 1,
        consonant: "ㄱㅁㅎ",
        problem: ["곰마하", "곤마히", "가만히"],
        answer: 2,
        meaning: "찌그러져 있다. 고 말해줘 요 해오이어오야미이찌그러져 있다. 고 말해줘 요 해오이어미이",
    },
    {
        stage: 2,
        consonant: "ㄱㅂ",
        problem: ["기빈", "가방", "구번", "고본"],
        answer: 1,
        meaning: "찌그러져 있다. 고 말해줘 요 해오이어오야미이",
    },


    {
        stage: 3,
        consonant: "ㄱㄹㄱ",
        problem: ["기러기", "곰돌이", "팽팽이", "흰둥이"],
        answer: 0,
        meaning: "찌그러져 있다. 고 말해줘 요 해오이어오야미이",
    },
    {
        stage: 4,
        consonant: "ㅅㅅㅅ",
        problem: ["샤사샥", "솔방울", "숭실대", "뭘봐요"],
        answer: 0,
        meaning: "찌그러져 있다. 고 말해줘 요 해오이어오야미이",
    },
    {
        stage: 5,
        consonant: "ㄲ",
        problem: ["낄", "꼴", "꿀", "깡"],
        answer: 2,
        meaning: "찌그러져 있다. 고 말해줘 요 해오이어오야미이",
    },

];

function getProblemDummyData(){

    return gameStageData;
}

function getRankDummyData(){
    let dummyList = [];
    for(let i=0; i< 30; i++){
        if(i < 7){
            dummyList.push({
                nick: `test${i+1}`,
                score: 100 - i * 1,
                date: '2021. 02. 01',
            });
            continue;
        }

        dummyList.push({
            nick: `test${i+1}`,
            score: 30 - i * 1,
            date: '2021. 02. 01',
        });
    }

    return dummyList;
}

function getTopTenRankDummyData(){
    let dummyList = [];
    for(let i=0; i< 10; i++){
        dummyList.push({
            nick: `test${i+1}`,
            score: 30 - i * 1,
            date: '2021. 02. 01',
        })
    }

    return dummyList;
}

function registerUserRank(data:any){
    let dummyList = getRankDummyData();
    let cur = 0;
    for(let i=0; i<dummyList.length; i++){
        if(dummyList[i].score < data.score){
            cur = i;
            break;
        }
    }

    for(let i=0; i< 10; i++){
        dummyList.push({
            nick: `test${i+1}`,
            score: 1000,
            date: '2021. 02. 01',
        })
    }

    return [...dummyList.slice(0, cur), data ,...dummyList.slice(cur)];
}

export function getProblem(){
    return async function(dispatch:any){
        try{
            if(IS_DEV){
                window.setTimeout(() => { dispatch({type:GET_PROBLEM, payload: getProblemDummyData()}); }, 800);
                
            }else{
                const response = await axios.get('/api/game/problem');
                dispatch({type:GET_PROBLEM, payload: response});
            }
        }catch(err){
            console.log(err);
            // dispatch({type:GET_TOTAL_RANK, payload: err});
        }
    }
}

export function getTotalRank(){
    return async function(dispatch:any){
        try{
            if(IS_DEV){
                window.setTimeout(() => { dispatch({type:GET_TOTAL_RANK, payload: getRankDummyData()}); }, 800);
                
            }else{
                const response = await axios.get('/api/game/totalrank');
                dispatch({type:GET_TOTAL_RANK, payload: response});
            }
        }catch(err){
            console.log(err);
            // dispatch({type:GET_TOTAL_RANK, payload: err});
        }
    }
}

export function getTopTenRank(){
    return async function(dispatch:any){
        try{
            if(IS_DEV){
                window.setTimeout(() => { dispatch({type:GET_TOP_TEN_RANK, payload: getTopTenRankDummyData()}); }, 800);
                
            }else{
                const response = await axios.get('/api/game/totalrank');
                dispatch({type:GET_TOP_TEN_RANK, payload: response});
            }
        }catch(err){
            console.log(err);
            // dispatch({type:GET_TOTAL_RANK, payload: err});
        }
    }
}

export function registerRank(){
    return async function(dispatch:any){
        try{
            if(IS_DEV){
                window.setTimeout(() => { dispatch({type:REGISTER_RANK}); }, 800);
                
            }else{
                const response = await axios.post('/api/game/totalrank');
                dispatch({type:REGISTER_RANK, payload: response});
            }
        }catch(err){
            console.log(err);
            // dispatch({type:GET_TOTAL_RANK, payload: err});
        }
    }
}