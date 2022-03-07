import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SIGNUP = gql`
mutation login($username: String! $email: String!, $password: String!){
    login(username: $username email: $email, password: $password){
        token
        user {
            _id
            username
        }
    }
}
`;

export const SAVE_BOOK = gql`
mutation saveBook($book: BookInput!) {
    saveBook(book: $book) {
        _id
        username
        email
        bookCount
        savedBooks
  }
}
`;

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: Int!) {
    removeBook(bookId: $bookId) {
        _id
        username
        email
        bookCount
        savedBooks
  }
}
`;