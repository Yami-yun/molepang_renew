import React from 'react';
import 'css/default.css';
import 'css/comment/CommentBox.css';
import { ICommentData } from 'comment/component/CommentInterface';
import { useDispatch } from 'react-redux';
import { DELETE_COMMENT } from 'redux/action/types';


function CommentBox({nick, date, comment}: ICommentData){

    const dispatch = useDispatch();
    const onModifyHandler = () => {

    }

    const onDeleteHandler = () => {
        // dispatch({type:DELETE_COMMENT, data:key});
    }
    return (
    <section className={'commentbox'}>
        <div className={'commentbox__first__line'}>
            <div>
                <h2>{nick}</h2>
                <p>{date}</p>
            </div>
            <div className={'commentbox__btn__list'}>
                <button onClick={onModifyHandler}>수정</button> / 
                <button onClick={onDeleteHandler}>삭제</button>
                <button>댓글 쓰기</button>
            </div>
        </div>

        <p>{comment}</p>

    </section>);
}
export default CommentBox;