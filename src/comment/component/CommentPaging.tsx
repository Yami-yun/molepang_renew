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
            dispatch({type:PAGE_COMMENT, payload: page-1});
        }
    }

    // right paging
    const onPagingRightHandler = () => {
        if(Math.ceil((data?.length) / 5) !== page + 1){
            dispatch({type:PAGE_COMMENT, payload: page+1});
            console.log("Ttttt");
        }
    }

    const pageCountRender = () => {
        const result = [];
        const FINAL_PAGE_NUM = Math.ceil((data?.length)/5);
        const CUR_PAGE = page + 1;
        let minPage = 1;
        let maxPage = FINAL_PAGE_NUM;

        // 최대 페이지가 5 이상일 때,
        if(FINAL_PAGE_NUM > 5){
            if(CUR_PAGE >= 1 && CUR_PAGE <= 3){
                // 현재 페이지가 1~3 일때
                maxPage = 5;
            }else if(FINAL_PAGE_NUM - CUR_PAGE >= 2){
                //현재 페이지가 4 이상이고 마지막 페이지랑 2 이상 차이날때
                minPage = CUR_PAGE - 2;
                maxPage = CUR_PAGE + 2;
            }else if(FINAL_PAGE_NUM - CUR_PAGE === 1){
                // 현재 페이지가 마지막 페이지와 1 정도 차이날때
                minPage = CUR_PAGE - 3;
            }else{
                // 현재 페이지 === 마지막 페이지
                minPage = CUR_PAGE - 4;
            }
        }

        for(let i=minPage - 1; i < maxPage; i++){
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