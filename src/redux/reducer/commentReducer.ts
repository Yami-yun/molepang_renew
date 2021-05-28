// import { ICommentData } from 'comment/component/CommentInterface';
import { 
    ADD_COMMENT, 
    GET_COMMENT, 
    DELETE_COMMENT, 
    MODIFY_COMMENT,
    PAGE_COMMENT,
    GET_COMMENT_SUC,
    GET_COMMENT_ERR,
    ADD_COMMENT_SUC,
    ADD_COMMENT_ERR,
} from '../action/types';

export type type_reply_set = {
    content:string;
    create_date:string;
    id: number;
    nickname:string;
    update_date?:string;
}

export type type_comment = {
    content:string;
    create_date:string;
    id: number;
    nickname:string;
    reply_set:type_reply_set[];
    update_date?:string;
}

export interface ICommentData{
    page:number;
    commentData:{
        comments:type_comment[];
        current_page: number;
        total_page: number;
        isloading:boolean;
        err:boolean;
    };
}

const initCommentData:ICommentData = {
    page: 0,
    commentData: {
        comments: [],
        current_page: 1,
        total_page: 1,
        isloading:false,
        err:false,
    },
}


export default function(state=initCommentData, action:any) {
    console.log(action);
    switch(action.type){
        
        case GET_COMMENT:
            return {...state, commentData: {...state.commentData, isloading:true, err:false}};

        case GET_COMMENT_SUC:
            return {...state, commentData: {...action.data, isloading:false, err:false}};

        case GET_COMMENT_ERR:
            return {...state, commentData: {...state.commentData, isloading:false, err:true}};


        case ADD_COMMENT:
            // return {...state, commentList: state.commentList.concat(action.payload)};
            return state;

        case ADD_COMMENT_SUC:
            return state;

        case ADD_COMMENT_ERR:
            return state;

        case DELETE_COMMENT:
            // console.log(action);
            // let tmp = state.commentList.filter((value:ICommentData)=> value.id !==  action.payload);
            // return {...state, commentList: tmp};
            return state;


        case MODIFY_COMMENT:
            // const modifyTmp = state.commentList.map((value:ICommentData)=> {
            //     if(value.id === action.payload.id){
            //         value.comment = action.payload.text;
            //     }
            //     return value;
            // })
            // return {...state, commentList: [...modifyTmp]};
            return state;

        case PAGE_COMMENT:
            return {...state, page: action.payload};

        default:
            return state;
    }

};