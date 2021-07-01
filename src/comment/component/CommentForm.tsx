import React, {useState} from 'react';
import 'css/default.css';
import 'css/comment/CommentForm.css';
import { useDispatch } from 'react-redux';
import { addComment, getComment } from 'redux/action/commentAction';

// 코멘트 입력 폼
function CommentForm(){
    const [nickname, setNickname] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const dispatch = useDispatch();

    // 코멘트 추가 핸들러
    const onCommentAddHandler = (e:any) => {
        e.preventDefault();

        if(nickname === "") return alert("별명을 입력해주세요.");
        if(nickname.length > 7) return alert("별명은 7글자 이하로 입력해야 합니다.");

        if(content === "") return alert("내용을 입력해주세요.");
        if(content.length >= 121) return alert("댓글은 120글자 이하로 입력이 가능합니다.");
        if(password === "") return alert("비밀번호를 입력해주세요.");
        if(password.length > 7) return alert("비밀번호는 7글자 이하로 입력해야 합니다.");
        
        const data = new FormData();
        data.append('nickname', nickname);
        data.append('password', password);
        data.append('content', content);

        const tmp = addComment(data);
        tmp(dispatch).then((res)=>{
            if(res?.status === 201){
                let getCommentApi = getComment(1);
                getCommentApi(dispatch);
            }
            
        });

        setNickname("");
        setContent("");
        setPassword("");
    }

    return (
    <section>
        <form className={'comment__form'}>
            <div className={'first__form__line'}>
                <div>
                    <input maxLength={7} placeholder={'별명'} value={nickname} onChange={(e)=>setNickname(e.target.value)}/>
                    <input maxLength={7} placeholder={'비밀번호'} value={password} type="password" onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button className={'comment__form__submit'} type="submit" onClick={(e)=>onCommentAddHandler(e)}>등록하기</button>
            </div>
            <textarea maxLength={120} placeholder={'모두 한글 두더지 팡 놀이에 대한 자유로운 생각을 나눠 보세요.'} value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
        </form>
    </section>);
}
export default CommentForm;