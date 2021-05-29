import React, { useEffect } from 'react';
// import 'css/';
import 'css/default.css';
import 'css/comment/CommentList.css';
import CommentBox from 'comment/component/CommentBox';
import { useDispatch, useSelector } from 'react-redux';
import { getComment } from 'redux/action/commentAction';
import { ICommentData, type_comment } from 'redux/reducer/commentReducer';



function CommentList(){

    const commentData:ICommentData["commentData"] = useSelector((state:any)=>state.comment.commentData);
    const page:ICommentData["page"] = useSelector((state:any)=>state.comment.page);
    const dispatch = useDispatch();
    // const COMMENT_NUMBER_ON_PAGE = 5;
    console.log(page);
    console.log(commentData);
    
    // getComment2();
    useEffect(() => { 
        let getCommentApi = getComment();
        getCommentApi(dispatch);
        
    }, []);
    return (
    <section className={'comment__list__layout'}>
        {commentData.comments?.map((value:type_comment, index:number)=>{
            // if(Math.floor(index/COMMENT_NUMBER_ON_PAGE) !== page.cur-1) return;
            return <CommentBox key={index} {...value}/>
        }
        )}

    </section>);
}
export default CommentList;