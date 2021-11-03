import { useMutation, useSubscription } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { ADD_NEW_MESSAGE, SUBSCRIBE_CHAT_MESSAGE } from './graphQL/authGraohQL';
import styles from './styles';

const ChatScreen = (props) => {
  const { data: messageData, error: messageError, loading: messageLoading } = useSubscription(SUBSCRIBE_CHAT_MESSAGE)
  const [createMessage, { data, loading, error }] = useMutation(ADD_NEW_MESSAGE);
  console.log("==data=messageData=", messageData);
  console.log("===error=", JSON.stringify(messageError));
  console.log("===erroerrorr=", JSON.stringify(error));
  console.log("===erroedatar=", JSON.stringify(data));

  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState()
  const [userInfo, setUserInfo] = useState()

  useEffect(() => {

    if (props.route?.params && props.route.params?.currentUser) {
      console.log("===props.route.params?.currentUser===", props.route.params?.currentUser);
      setUserInfo(props.route.params?.userInfo)
      setCurrentUser(props.route.params?.currentUser);
    }

    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  useEffect(() => {
    if (messageData?.getMessage) {
      onSetMessage(messageData?.getMessage)
    }
  }, [messageData?.getMessage])

  const onSetMessage = async (messageas) => {
    let userInfo = await AsyncStorage.getItem('@userInfo');
    if (userInfo && userInfo !== null) {
      userInfo = JSON.parse(userInfo);
      if (messageas?.user?._id !== userInfo?._id) {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messageas))
      }
    }
  }

  // const onSend = useCallback((messages = []) => {
  //   console.log("===messages=", messages);
  //   let msg = messages[0];
  //   console.log("=====msg=", msg);
  //   setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  //   let messag = {
  //     "text": msg?.text,
  //     "createdAt": msg?.createdAt,
  //     "user": msg?.user?._id
  //   }
  //   console.log("===messag==", messag);
  //   createMessage({ variables: messag });
  // }, [])

  const onSend = (messages = []) => {
    console.log("===messages=", messages);
    let msg = messages[0];
    console.log("=====msg=", msg);
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    let messag = {
      "text": msg?.text,
      "createdAt": msg?.createdAt,
      "user": msg?.user?._id
    }
    console.log("===messag==", messag);
    createMessage({ variables: messag });
  }

  // subscription
  const onMessage = async () => {

  }

  return (
    <>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        renderUsernameOnMessage={true}
        user={{
          _id: userInfo?._id,
          name: userInfo?.firstName
        }}
      />
    </>
  )
}

export default ChatScreen
