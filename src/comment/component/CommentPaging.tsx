import React from 'react';
import 'css/default.css';
import 'css/comment/CommentPaging.css';
import pagingLeftBtn from 'img/paging__left__btn.png';
import pagingRightBtn from 'img/paging__right__btn.png';
import { useDispatch, useSelector } from 'react-redux';
import { PAGE_COMMENT } from 'redux/action/types';

// comment paging component
function CommentPaging(){

    const data = useSelector((state:any)=>state.comment.commentList);
    const page = useSelector((state:any)=>state.comment.page);

    const dispatch = useDispatch();


    // left paging
    const onPagingLeftHandler = () => {
        if(page !== 0){
            dispatch({type:PAGE_COMMENT, payload: page-1})
        }
    }

    // right paging
    const onPagingRightHandler = () => {
        if(Math.floor((data?.length) / 5) !== page){
            dispatch({type:PAGE_COMMENT, payload: page+1})
        }
    }

    const pageCountRender = () => {
        const result = [];
        for(let i=0; i < Math.ceil((data?.length) / 5); i++){
            const selected = i === page ? 'paging__number__selected' : '';
            result.push(<button className={selected} onClick={()=> dispatch({type:PAGE_COMMENT, payload: i})} key={i}>{`${i+1}`}</button>);
        }
        return result;
    }
    return (
    <section className={'paging__section'}>
        <button onClick={onPagingLeftHandler}><img src={pagingLeftBtn}/></button>
        <div className={'paging__number'}>
            {pageCountRender()}
        </div>
        <button onClick={onPagingRightHandler}><img src={pagingRightBtn}/></button>
    </section>
    );
}
export default CommentPaging;