// import { ICommentData } from 'comment/component/CommentInterface';
import { 
    ADD_COMMENT, 
    GET_COMMENT, 
    DELETE_COMMENT_SUC, 
    MODIFY_COMMENT,
    PAGE_COMMENT,
    GET_COMMENT_SUC,
    GET_COMMENT_ERR,
    ADD_COMMENT_SUC,
    ADD_COMMENT_ERR,
    ADD_REPLY_COMMENT,
    MODIFY_REPLY_COMMENT,
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
    page:{
        cur:number;
        total:number;
    };
    commentData:{
        comments:type_comment[];
        isloading:boolean;
        err:boolean;
        count:number;
    };
}

const initCommentData:ICommentData = {
    page: {
        cur:1,
        total:1,
    },
    commentData: {
        count:0,
        comments: [],
        isloading:false,
        err:false,
    },
}


export default function(state=initCommentData, action:any) {
    switch(action.type){
        
        case GET_COMMENT:
            return {...state, commentData: {...state.commentData, isloading:true, err:false}};

        case GET_COMMENT_SUC:
            return {...state, page: {cur:action.data.current_page, total:action.data.total_page} ,commentData: {count:action.data.total_count ,comments:action.data.comments, isloading:false, err:false}};

        case GET_COMMENT_ERR:
            return {...state, commentData: {...state.commentData, isloading:false, err:true}};


        case ADD_COMMENT:
            return {...state, commentData: {...state.commentData, isloading:true, err:false}};


        case ADD_COMMENT_SUC:
            let tmp = [action.data, ...state.commentData.comments];
            return {...state, page: {...state.page, cur: 1}, commentData: {...state.commentData, comments:tmp, isloading:false, err:false}};

        // ?
        case ADD_COMMENT_ERR:
            return state;

        case DELETE_COMMENT_SUC:
            let tmp2 = state.commentData.comments.filter((value:type_comment)=> value.id !== action.data);

            return {...state, commentData: {...state.commentData, comments:tmp2, isloading:false, err:false}};


        case MODIFY_COMMENT:
            const modifyTmp = state.commentData.comments.map((value:type_comment)=> {
                if(value.id === action.data.id){
                    value.content = action.data.content;
                }
                return value;
            })
            return {...state, commentData: {...state.commentData, comments: [...modifyTmp]} };
        
        case MODIFY_REPLY_COMMENT:
            return state;
            

        case PAGE_COMMENT:
            return {...state, page: {...state.page, cur:action.payload}};

        case ADD_REPLY_COMMENT:
            const replyTmp = state.commentData.comments.map((value:type_comment)=> {
                if(value.id === action.p_id){
                    value.reply_set.push(action.data);
                }
                return value;
            })
            return {...state, commentData: {...state.commentData, comments: [...replyTmp]} };

        default:
            return state;
    }

};