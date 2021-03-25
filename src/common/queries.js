import { gql, useMutation  } from '@apollo/client';

export const HIGH_SCORES = gql`
    query GetHighScores {
        allScores(orderBy: "score_DESC") {
        player {
            name
        }
        score
        }
    }
    `;

export const TOP_10_SCORES = gql`
    query GetHighScores {
        allScores(first: 10, orderBy: "score_DESC") {
        id,
        player {
            name
        }
        score
        }
    }
    `;

export const NEW_GAME = gql`
        query GetNewGame {
            newGame {
            state, 
            score, 
            finished
            }
        }
`;

export const PROCESS_GAME = gql`
    mutation ProcessGame($state: [[Int!]!]!, $score: Int!, $direction: Direction!) {
        processGame(game: { state: $state, score: $score, direction: $direction }) {
        state
        score
        finished
        }
    }
`;

export const NEW_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      name
      password_is_set
    }
  }
`;

export const AUTH_USER = gql`
    mutation AuthenticateUserWithPassword($email: String!, $password: String!) {
        authenticateUserWithPassword(email: $email, password: $password) {
        token
    }
    }
`;


