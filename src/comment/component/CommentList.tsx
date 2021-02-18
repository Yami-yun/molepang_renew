import React, { useEffect } from 'react';
// import 'css/';
import 'css/default.css';
import 'css/comment/CommentList.css';
import CommentBox from 'comment/component/CommentBox';
import { ICommentData } from 'comment/component/CommentInterface';
import { useDispatch, useSelector } from 'react-redux';
import { getComment } from 'redux/action/commentAction';



function CommentList(){

    const data = useSelector((state:any)=>state.comment.commentList);
    const page = useSelector((state:any)=>state.comment.page);
    const dispatch = useDispatch();
    const COMMENT_NUMBER_ON_PAGE = 5;
    
    // getComment2();
    useEffect(() => { 
        let getCommentApi = getComment();
        getCommentApi(dispatch);
        
    }, []);
    return (
    <section className={'comment__list__layout'}>
        {data?.map((value:ICommentData, index:number)=>{
            if(Math.floor(index/COMMENT_NUMBER_ON_PAGE) !== page) return;
            return <CommentBox key={index} {...value}/>
        }
        )}

    </section>);
}
export default CommentList;