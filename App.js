import React, { useState, useCallback, useEffect } from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink,
  concat,
  createHttpLink,
  ApolloLink
} from "@apollo/client";
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from 'apollo-link-ws';
import ChatScreen from './src/ChatScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './src/Register';
import Login from './src/Login';
import UserList from './src/UserList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './src/SplashScreen';

const Stack = createStackNavigator();


const App = () => {

  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
  });

  const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000/subscriptions`,
    options: {
      reconnect: true,
      // connectionParams: {
      //   headers: {
      //     Authorization: `Bearer ${token}`
      //   }
      // }    
    }
  })

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );


  // const logoutLink = onError(({ networkError }) => {
  //   if (networkError.statusCode === 401) {
  //     Alert.alert("GRAPHQL", "Unuthenticated user..")
  //   }
  // })

  const authMiddleware = new ApolloLink(async (operation, forward) => {
    // add the authorization to the headers
    const token = await AsyncStorage.getItem('@authToken')
    console.log("====token===", token)
    if (token) {
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          authorization: token || null,
        } 
      }));
    }
    return forward(operation);
  })

  const client = new ApolloClient({
    link: concat(authMiddleware, splitLink),  
    cache: new InMemoryCache(),
    // credentials:'include'
  });


  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='SplashScreen'>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="UserList" component={UserList} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  )
}

export default App

