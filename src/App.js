import Game from 'game/GameLayout';
import React from 'react';
import AdLayout from './ad/AdLayout';
import Banner from './banner/Banner';
import Comment from './comment/Comment';
import Header from './header/Header.tsx';

function App() {
  return (
    <div>
      <Header />
      <Game />
      <Banner />
      <Comment />
      <AdLayout text={"kakao ad"}/>
    </div>
  );
}

export default App;
