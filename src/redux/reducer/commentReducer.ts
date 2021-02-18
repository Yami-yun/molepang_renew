import { ICommentData } from 'comment/component/CommentInterface';
import { 
    ADD_COMMENT, 
    GET_COMMENT, 
    DELETE_COMMENT, 
    MODIFY_COMMENT,
    PAGE_COMMENT,
} from '../action/types';



const initCommentData = {
    page: 0,
    commentList: [],
}


export default function(state=initCommentData, action:any) {
    console.log(action);
    switch(action.type){
        
        case GET_COMMENT:
            console.log("test");
            console.log(action);
            return {...state, commentList: action.payload};

        case ADD_COMMENT:
            return {...state, commentList: state.commentList.concat(action.payload)};

        case DELETE_COMMENT:
            console.log(action);
            let tmp = state.commentList.filter((value:ICommentData)=> value.id !==  action.payload);
            return {...state, commentList: tmp};

        case MODIFY_COMMENT:
            const modifyTmp = state.commentList.map((value:ICommentData)=> {
                if(value.id === action.payload.id){
                    value.comment = action.payload.text;
                }
                return value;
            })
            return {...state, commentList: [...modifyTmp]};

        case PAGE_COMMENT:
            return {...state, page: action.payload};

        default:
            return state;
    }

};