import React from 'react';
import { useQuery } from '@apollo/client';
import { TScore } from '../types';
import { TOP_10_SCORES } from '../common/queries';
import Header from './header';
import "./leaderBoard.css"

const LeaderBoard: React.FC<any> = () => {
    const { loading, error, data } = useQuery(TOP_10_SCORES);

    if (error) {
        console.error(error);
    }

    // TODO: remove those scores which have not score set

    return (
        <div className="leader-board">
            <Header currentPage="LeaderBoard"/>

            <div className="content">
            {loading ? (
                <p>Loading scores...</p>
            ) : ( 
                <table>
                    <tbody>
                        {data.allScores.map((score: TScore, index: number) => (
                            <tr key={score.id}>
                                <td>{`${index + 1}. ${score.player.name}`}</td>
                                <td>{score.score ? score.score : "?"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
           </div>
        </div>
    )
}

export default LeaderBoard;