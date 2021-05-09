import {
    ADD_COMMENT, 
    DELETE_COMMENT, 
    GET_COMMENT, 
    COMMENT_CHECK_PASSWORD, 
    MODIFY_COMMENT,
} from './types';
import axios from 'axios';
import { IS_DEV } from 'setting/setting';


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
export function getComment(){
    return async function(dispatch:any){
        try{
            if(IS_DEV){
                window.setTimeout(() => { dispatch({type:GET_COMMENT, payload: getDummyData()}); }, 800);
                
            }else{
                const response = await axios.get('/api/comment/info');
                dispatch({type:GET_COMMENT, payload: response});
            }
        }catch(err){
            dispatch({type:GET_COMMENT, payload: err});
        }
    }
}

// add comment api
export const addComment = (body:any) => async (dispatch: any) => {
    try{
        if(IS_DEV){
            
            window.setTimeout(()=>{dispatch({type:ADD_COMMENT, payload: body})} ,100);
        }else{
            const response = await axios.post('/api/comment/add', body);
            dispatch({type:ADD_COMMENT, payload: response});
        }
    }catch(err){
        dispatch({type:ADD_COMMENT, payload: err});
    }
}

// delete comment api
export const deleteComment = (id:number) => async (dispatch: any) => {
    try{
        if(IS_DEV){
            window.setTimeout(()=>{dispatch({type:DELETE_COMMENT, payload: id})} ,100);
            
        }else{
            const response = await axios.delete('/api/comment/remove', {data:{id,}});
            dispatch({type:ADD_COMMENT, payload: response});
        }
    }catch(err){
        dispatch({type:ADD_COMMENT, payload: err});
    }
}

// delete comment api
export const checkPassword = (pw:string) => async (dispatch: any) => {
    try{
        if(IS_DEV){
            window.setTimeout(()=>{dispatch({type:DELETE_COMMENT, payload: true})} ,100);
            return new Promise((resolve)=>resolve(true));
        }else{
            const response = await axios.post('/api/comment/check_password', {pw: pw} );
            dispatch({type:COMMENT_CHECK_PASSWORD, payload: response});
            return response;
        }
        
    }catch(err){
        dispatch({type:ADD_COMMENT, payload: err});
    }
}

export const modifyComment = (body:{id:number, text:string}) => async (dispatch: any) => {
    try{
        if(IS_DEV){
            window.setTimeout(()=>{dispatch({type:MODIFY_COMMENT, payload: body})} ,100);
            return new Promise((resolve)=>resolve(true));
        }else{
            const response = await axios.patch('/api/comment/modify_comment', body );
            dispatch({type:MODIFY_COMMENT, payload: response});
            return response;
        }
        
    }catch(err){
        dispatch({type:MODIFY_COMMENT, payload: err});
    }
}

