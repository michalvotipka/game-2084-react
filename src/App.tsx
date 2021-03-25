import React, { useState } from 'react';
import GameWrapper from './components/game/gameWrapper';
import LeaderBoard from './components/leaderBoard';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginButtons from './components/loginButtons';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';

const App = () => {
  const [isNewGame, setIsNewGame] = useState(false);

  return (
    <div className="app-wrapper">
      <Router>
        <Switch>
          <Route exact path="/">
            <React.Fragment>
              <LeaderBoard/>
              <LoginButtons startNewGame={(shouldStart) => setIsNewGame(shouldStart)}/>
            </React.Fragment>
          </Route>
          <Route path="/game">
            <GameWrapper newGame={isNewGame}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
