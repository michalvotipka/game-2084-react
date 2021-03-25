import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { NEW_GAME, PROCESS_GAME } from '../../common/queries';
import { Direction, Game, GameInput } from '../../types';
import { getColor } from './utils';
import Button from 'react-bootstrap/esm/Button';
import { useHistory } from 'react-router-dom';
import "./game.css";

const initGameState = [[2, 0, 0, 0], [0, 0, 0, 2], [0, 0, 0, 0], [0, 0, 0, 0]];
const initGame: Game = {state: initGameState, score: 0, finished: false};

type GameCompProps = {}

const GameComp: React.FC<GameCompProps> = () => {
    const { loading, data } = useQuery(NEW_GAME);
    const [processGame] = useMutation(PROCESS_GAME);

    const history = useHistory();

    const [gameData, setGameData] = useState<Game>(initGame)

    useEffect(() => {
        if (data) {
          setGameData(data.newGame)
        }
      }, [data])

      useEffect(() => {
        const onKeyup = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp') return handleKeyPress("Up")
            if (e.key === 'ArrowDown') return handleKeyPress("Down")
            if (e.key === 'ArrowLeft') return handleKeyPress("Left")
            if (e.key === 'ArrowRight') return handleKeyPress("Right")
        }

        window.addEventListener('keyup', onKeyup);
        return () => window.removeEventListener('keyup', onKeyup);
      }, [gameData])


      const handleKeyPress = async (direction: Direction) => {
        const currentGame: Game = {...gameData};

        //PROCEED
        const newGameInput: GameInput = {
            state: currentGame.state,
            score: currentGame.score,
            direction
        }

        // SEND TO BE
        try {
            const response = await processGame({variables: newGameInput})
            const newGameData = response.data.processGame;

            setGameData(newGameData)
            
        } catch(error) {}   
    }

    const restartGame = () => {
        // do not know how to call backend again with this GraphQL way so reset like this
        setGameData(initGame)
    }


    const constructGrid = () => {
        return (
            (!loading) ? (
                gameData.state && gameData.state.map((row: number[], index: number) => {
                    return (
                        <div className="grid-row" key={index}>
                            {row.map((cell: number, index: number) => (
                                <div className={`grid-cell ${getColor(cell)}`} key={index}>
                                    <span>{cell ? cell : ""}</span>
                                </div>
                            ))}
                        </div>
                    )
                })
            ) : (
                <p>Game is loading...</p>
            )
        )
    }

    return (
        <div className="game">
            <div className="score-wrapper">
                Score <div className="score">{gameData.score}</div>
            </div>
            <div className="tiles-wrapper">
                {constructGrid()}
            </div>
            {gameData.finished && (
                <h4>The game is over! Your final score is {gameData.score}</h4>
            )}

            <div>
                <Button variant="secondary" className="space-right" style={{marginTop: 30}} onClick={restartGame}>Start new Game</Button>
                <Button variant="light" style={{marginTop: 30}} onClick={() => history.push("/")}>Back to Home</Button>
            </div>
        </div>
    )
}

export default GameComp;