import {
    ADD_COMMENT, 
    GET_COMMENT_ERR,
    GET_COMMENT_SUC,
    ADD_REPLY_COMMENT,
} from './types';
import axios from 'axios';
import { BASE_URL, IS_DEV } from 'setting/setting';

/*
id
nickname
password
content
create_date
update_date
*/
const getDummyData = () => {
    let dummyData:any = [];

    for(let i=0; i< 60; i++){
        dummyData.push({
            nick:`test${i}`,
            password:`test${i}`,
            comment:`test${i}`,
            date:"2021.02.12 18:20",
            id:i,
        });
    };

    return dummyData;
}

// get comment list api from server
export function getComment(page=1){
    return async function(dispatch:any){
        try{
            if(IS_DEV){
                const res = await axios.get(`${BASE_URL}/comment?page=${page}`);
                dispatch({type:GET_COMMENT_SUC, data: res.data});
            }else{
                const res = await axios.get(`${BASE_URL}/comment?page=${page}`);
                dispatch({type:GET_COMMENT_SUC, data: res.data});
            }
        }catch(err){
            dispatch({type:GET_COMMENT_ERR, payload: err});
        }
    }
}

// add comment api
export const addComment = (body:any) => async (dispatch: any) => {
    try{
        if(IS_DEV){
            dispatch({type:ADD_COMMENT});
            const res = await axios.post(`${BASE_URL}/comment/`, body);
            return res;

        }else{
            dispatch({type:ADD_COMMENT});
            const res = await axios.post(`${BASE_URL}/comment/`, body);
            return res;
        }
    }catch(err){
        alert("아이디와 비밀번호는 각각 7글자 이하입니다.")
        return {status: 404};
    }
}

// delete comment api
export const deleteComment = ({p_id, id,nickname, password}:{p_id?:number, id:number, nickname:string, password:string}) => async (dispatch: any) => {
    try{
        if(IS_DEV){
            const url = p_id ? `${BASE_URL}/comment/${p_id}/reply/${id}/` : `${BASE_URL}/comment/${id}/`;
            const res = await axios.delete(url, {data:{nickname, password}});
        }else{
            const url = p_id ? `${BASE_URL}/comment/${p_id}/reply/${id}/` : `${BASE_URL}/comment/${id}/`;
            const res = await axios.delete(url, {data:{nickname, password}});
        }
    }catch(err){
        alert("잘못된 접근입니다.");
    }
}

// check pw
export const checkPassword = async ({p_id, id,nickname, password}:{p_id?:number, id:number, nickname:string, password:string}) => {
    try{
        if(IS_DEV){
            // p_id가 있으면 답글 수정 또는 삭제 상황
            const url = p_id ? `${BASE_URL}/comment/${p_id}/reply/${id}/` : `${BASE_URL}/comment/${id}/`;
            const res = await axios.post(url, {nickname, password});
            return res;
        }else{
            const url = p_id ? `${BASE_URL}/comment/${p_id}/reply/${id}/` : `${BASE_URL}/comment/${id}/`;
            const res = await axios.post(url, {nickname, password});
            return res;
        }
        
    }catch(err){
        return {data:404};
    }
}

export const modifyComment = ({p_id, id,nickname, password, content}:{p_id?:number, id:number, nickname:string, password:string, content:string}) => async (dispatch: any) => {
    try{
        if(IS_DEV){
            const url = p_id ? `${BASE_URL}/comment/${p_id}/reply/${id}/` : `${BASE_URL}/comment/${id}/`;
            const res = await axios.put(url, {nickname, password, content});
            return new Promise((resolve)=>resolve(true));
        }else{
            const url = p_id ? `${BASE_URL}/comment/${p_id}/reply/${id}/` : `${BASE_URL}/comment/${id}/`;
            const res = await axios.put(url, {nickname, password, content});
            return new Promise((resolve)=>resolve(true));
        }
        
    }catch(err){
        return new Promise((resolve)=>resolve(false));
    }
}


export const addReplyComment = (id:number, body:{nickname:string, password:string, content:string}) => async (dispatch: any) => {
    try{
        if(IS_DEV){
            const res = await axios.post(`${BASE_URL}/comment/${id}/reply/`, body);
            dispatch({type:ADD_REPLY_COMMENT, data: res.data, p_id: id});
            return new Promise((resolve)=>resolve(true));
        }else{
            const res = await axios.post(`${BASE_URL}/comment/${id}/reply/`, body);
            dispatch({type:ADD_REPLY_COMMENT, data: res.data, p_id: id});
            return new Promise((resolve)=>resolve(true));
        }
        
    }catch(err){
        return new Promise((resolve)=>resolve(false));
    }
}
