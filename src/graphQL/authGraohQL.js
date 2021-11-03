import { gql } from "@apollo/client";

const SUBSCRIBE_CHAT_MESSAGE = gql`
subscription {
  getMessage{
     _id
     text
     user{
        _id           
        firstName
        lastName                            
        email
        password
     }
  }
}
`;

const ADD_NEW_MESSAGE = gql`
  mutation createMessage($text:String, $createdAt:String,$user:String) {
    createMessage(message:{
      text:$text,
      createdAt:$createdAt,
      user:$user
      }) {
        _id
        text
        user{
            _id           
            firstName
            lastName                            
            email
            password
        }
    }
  }
`;

//Register new user
const SIGN_UP_USER = gql`
  mutation createUser($firstName:String, $lastName:String,$email:String,$password:String) {  
    createUser(user:{
    firstName: $firstName
    lastName: $lastName
    email: $email
    password: $password
      }) {
            _id           
            firstName
            lastName                            
            email
            password
            token
        }
  }
`;


// Queries
const GET_ALL_USER = gql`
query getAllUsers {
    getAllUsers {
        _id
        firstName
        lastName
        email
        password
  }
}
`;

//Login
const LOGIN_USER = gql`
  mutation login($email:String, $password:String) {
    login(
        email: $email
        password: $password,
      ) {
        _id
        firstName
        lastName
        email
        token
    }
  }
`;

export {
  SUBSCRIBE_CHAT_MESSAGE,
  ADD_NEW_MESSAGE,
  SIGN_UP_USER,
  LOGIN_USER,
  GET_ALL_USER
}