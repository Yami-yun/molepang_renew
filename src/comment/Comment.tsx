import React from 'react';
import CommentHeader from './component/CommentHeader';
import 'css/default.css';
import 'css/comment/CommentLayout.css';
import CommentList from './component/CommentList';
import CommentForm from 'comment/component/CommentForm';
import CommentPaging from 'comment/component/CommentPaging';
import CommentModalBox from 'comment/component/CommentModalBox';


function Comment(){
    return (
    <article className={'comment__layout'}>
        {/* 코멘트 Header */}
        <CommentHeader />

        {/* 코멘트 본문 */}
        <CommentList />

        {/* 코멘트 입력 박스 */}
        <CommentForm />
        {/* 코멘트 페이징 */}
        <CommentPaging />

        {/* 코멘트 수정, 삭제 모달 박스 */}
        {/* <CommentModalBox /> */}
    </article>);
}
export default Comment;