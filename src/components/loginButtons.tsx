import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { AUTH_USER, NEW_USER } from '../common/queries';

type LoginButtonsProps = {
    startNewGame: (start: boolean ) => void;
};

const constName = "Bootiq";
const constEmail = "Bootiq@company.cz";
const constPassword = "12345678";

const LoginButtons: React.FC<LoginButtonsProps> = ({ startNewGame }) => {
    const token = sessionStorage.getItem('token');

    const [isLogged, setIsLogged] = useState(token ? true : false);
    const [createUser] = useMutation(NEW_USER);
    const [authUser] = useMutation(AUTH_USER);

    const [shouldRegister, setShouldRegister] = useState(false);

    const history = useHistory();

    const registerMe = async () => {
        const newUser = {
            name: constName,
            email: constEmail,
            isAdmin: true,
            password: constPassword
        };

        try {
            await createUser({variables: newUser})
            await authenticateMe();
        } catch(error) {
            await authenticateMe(); // user is already registered -> proceed to authentification
        }  
    }

    const authenticateMe = async () => {
        try {
            const auth = await authUser({variables: {email: constEmail, password: constPassword}})

            const token = auth.data.authenticateUserWithPassword.token
            sessionStorage.setItem("token", token);

            setShouldRegister(false)

        } catch(error) {

        }  
    }

    return (
        <div className="login-buttons-wrapper">
            {isLogged ? (
                <div>
                    <p>Hello {constName}, nice to see you again!</p>
                    <Button 
                        className="space-right" 
                        variant="light"
                        onClick={() => {
                            startNewGame(true);
                            history.push("/game")
                        }}
                    >
                        New Game
                    </Button>
                </div>
            ) : (
                <div>
                     <p>Login or register to start new game</p>
                    <Button 
                        className="space-right" 
                        variant="light"
                        onClick={() => {
                            const token = sessionStorage.getItem('token');
                            if (token) setIsLogged(true)
                            
                            setShouldRegister(token ? false : true)
                        }}
                    >
                        Login
                    </Button>
                    <Button variant="dark" onClick={registerMe}>Register</Button>

                    {shouldRegister && <p style={{paddingTop: 10}}>Please register first</p>}
                </div>
            )}
        </div>
    )
}

export default LoginButtons;