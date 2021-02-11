import { 
    ADD_COMMENT, 
    GET_COMMENT, 
    DELETE_COMMENT, 
    MODIFY_COMMENT,
    PAGE_COMMENT,
} from '../action/types';




let commentInitState:any = {
    comment:[],
    page:0,
};

for(let i=0; i< 24; i++){
    commentInitState.comment.push({
        nick:`test${i}`,
        password:`test${i}`,
        comment:`test${i}`,
        date:"2021.02.12 18:20",
    });
}

export default function(state=commentInitState, action:any) {
    switch(action.type){
        case ADD_COMMENT:
            // return {...state, comment: state.comment.concat(action.result)};
            return {...state, comment: [...state.comment, action.result]};

        case DELETE_COMMENT:
            // let tmp = state.comment.filter((value:any, index:number)=> action.data !== index);

            return {...state, comment: [...state.comment]};

        case PAGE_COMMENT:
            return {...state, page: action.result};

        default:
            return state;
    }

};