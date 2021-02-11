import React from 'react';
// import 'css/';
import 'css/default.css';
import 'css/comment/CommentList.css';
import CommentBox from 'comment/component/CommentBox';
import { ICommentData } from 'comment/component/CommentInterface';
import { useSelector } from 'react-redux';



function CommentList(){

    const data = useSelector((state:any)=>state.comment.comment);
    const page = useSelector((state:any)=>state.comment.page);

    return (
    <section className={'comment__list__layout'}>
        {data.map((value:ICommentData, index:number)=>{
            if(Math.floor(index/5) !== page) return;
            return <CommentBox key={index} {...value}/>
        }
        )}

    </section>);
}
export default CommentList;