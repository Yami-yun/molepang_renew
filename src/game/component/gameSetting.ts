export const initGameSetValue={

    "GAME_W": 960,
    "GAME_H": 600,
    "FIRST_MOLE_X": 234,            // 첫번째 두더지 X 좌표
    // "FIRST_MOLE_Y": 279,         // 첫번째 두더지 Y 좌표
    "FIRST_MOLE_Y": 288,
    "MOLE_INTERVAL_X": 207,         // 두더지 간의 가로 간격
    "MOLE_INTERVAL_Y": 74,          // 두더지 간의 세로 간격
    "MOLE_IMG_WIDTH": 78,               // 두더지 Img width
    "MOLE_IMG_HEIGHT": 110,               // 두더지 Img HEIGHT
    "GAME_RUNNING_COUNT": 0,
    "GAME_STAGE": 0,                    // 게임 스테이지
    "GAME_FRAME": 16,                   // 게임 프레임
    "IS_CORRECT_ANSWER" : false,            // check if user correct problem (유저가 문제를 맞았는지 여부 확인 변수)
    "IS_CHANGE_SCORE" : false,             // check if score increase after user correct problem (유저가 정답 여부에 따라 점수 변화를 체크를 확인 변수)
    "IS_GAME_END" : false,                  // check if game is end (시간이 다되어서 게임이 끝나는지 확인)
    "INCORRECT_WORD" : [],                  // 게임 내 틀린 단어
    "CORRECT_WORD" : [],                    // 게임 내 틀린 단어
    "CUR_STAGE_ANSWER" :"",                 // 현재 스테이지 정답
    "BOARD_X": 385,                         // 보드판 X 좌표
    "BOARD_Y": 225,                         // 보드판 Y 좌표
    "BOARD_WIDTH": 100,                     // 보드판 가로
    "BOARD_HEIGHT": 100,                   // 보드판 세로
    "GAME_SCREEN_HEADER_X": 0,              // 게임 스크린 헤더 X 좌표
    "GAME_SCREEN_HEADER_Y": 0,              // 게임 스크린 헤더 Y 좌표
    "GAME_SCREEN_HEADER_WIDTH": 960,        // 게임 스크린 헤더 가로
    "GAME_SCREEN_HEADER_HEIGHT": 50,        // 게임 스크린 헤더 세로
    "GAME_TIME": 90,                        // 게임 시간
    "GAME_SCORE": 0,                        // 게임 점수
};
