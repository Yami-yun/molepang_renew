
import {initGameSetValue as gameSetValue} from "../gameSetting";

import background from "img/background.png";

class Background {

    gameContext: any;
    
    position: {x:number, y: number};
    width: number;
    height: number;
    backgroundImg: HTMLImageElement;


    constructor(x: number, y: number, w: number, h: number, gameContext: any) {

        this.gameContext = gameContext;

        // 게임 배경 이미지
        this.backgroundImg = new Image();
        this.backgroundImg.src = background;

        this.position = {x, y};
        this.width = w;
        this.height = h;

    }

    //랜더 함수
    render() {

        this.gameContext.drawImage(
            this.backgroundImg,
            this.position.x,
            this.position.y,
            this.position.x + this.width,
            this.position.y + this.height);

    }
};

export default Background;