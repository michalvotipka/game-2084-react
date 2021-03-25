import React, { useState } from 'react';
import Header from '../header';
import LoginButtons from '../loginButtons';
import GameComp from './game';

type GameWrapperProps = {
    newGame: boolean
}

const GameWrapper: React.FC<GameWrapperProps> = ({ newGame }) => {
    const [isNewGame, setIsNewGame] = useState(newGame);

    return (
        <div className="game-wrapper">
            <Header currentPage={isNewGame ? "Let's play" : "New Game"}/>

            {isNewGame ? (
                <div className="content">
                    <GameComp/>
                </div>
            ) : (
                <LoginButtons startNewGame={(shouldStart) => setIsNewGame(shouldStart)}/>
            )}
        </div>
    )
}

export default GameWrapper;