import {ADD_COMMENT} from './types';
import axios from 'axios';

export async function addComent(body:any){

    const request = await axios.post('/api/comment/add', body).then(
        response => response.data
    );

    return({
        type:ADD_COMMENT,
        result: request,
    });
}