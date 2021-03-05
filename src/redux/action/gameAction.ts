
import axios from 'axios';
import { IS_DEV } from 'setting/setting';
import {
    GET_TOTAL_RANK, 
    GET_TOP_TEN_RANK,

} from './types';

function getRankDummyData(){
    let dummyList = [];
    for(let i=0; i< 30; i++){
        dummyList.push({
            nRank : i+1,
            nick: `test${i+1}`,
            score: 1000,
            date: '2021. 02. 01',
        })
    }

    return dummyList;
}

function getTopTenRankDummyData(){
    let dummyList = [];
    for(let i=0; i< 10; i++){
        dummyList.push({
            nRank : i+1,
            nick: `test${i+1}`,
            score: 1000,
            date: '2021. 02. 01',
        })
    }

    return dummyList;
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