import Background from 'background/Background';
import Footer from 'Footer/Footer';
import Game from 'game/GameLayout';
import React from 'react';
import Comment from './comment/Comment';
import Header from './header/Header.tsx';


function App() {
  return (
    <>
      <Background />
      <Header />
      <Game />
      <Comment />
      <Footer />
    </>
  );
}

export default App;
