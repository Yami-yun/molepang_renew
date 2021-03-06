
import axios from 'axios';
import { IS_DEV } from 'setting/setting';
import {
    GET_TOTAL_RANK, 
    GET_TOP_TEN_RANK,
    REGISTER_RANK,

} from './types';

function getRankDummyData(){
    let dummyList = [];
    for(let i=0; i< 30; i++){
        dummyList.push({
            nick: `test${i+1}`,
            score: 30 - i * 1,
            date: '2021. 02. 01',
        })
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