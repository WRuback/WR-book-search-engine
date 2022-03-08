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
mutation signup($username: String! $email: String!, $password: String!){
    signup(username: $username email: $email, password: $password){
        token
        user {
            _id
            username
        }
    }
}
`;

export const SAVE_BOOK = gql`
mutation saveBook($newBook: BookInput!) {
    saveBook(newBook: $newBook) {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
          }
  }
}
`;

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
          }
  }
}
`;