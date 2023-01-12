import React, { useState } from 'react';

import axios from 'axios';

import {
  useMultiChatLogic,
  ChatList,
  MultiChatWindowProps,
  MultiChatSocket,
  ChatFeed,
  ChatCardProps,
  ChatHeaderProps,
  MessageFormProps,
  MessageListProps,
  MessageList,
  PersonObject,
} from 'react-chat-engine-advanced';

import { useIsMobile } from './functions/isMobile';

import ChatHeader from './components/ChatHeader';
import ChatForm, { OptionType } from './components/ChatForm';
import ChatCard from './components/ChatCard';
import MessageForm from './components/MessageForm';
import ChatListHeader from './components/ChatListHeader';

interface PrettyChatWindowProps extends MultiChatWindowProps {
  projectId: string;
  username: string;
  secret: string;
  httpUrl?: string;
  height?: string;
}

export const PrettyChatWindow = (props: PrettyChatWindowProps) => {
  const [isChatFormActive, setIsChatFormActive] = useState(false);
  const [chatFormUsers, setChatFromUsers] = useState<PersonObject[]>([]);
  const isMobile: boolean = useIsMobile();

  const chatProps = useMultiChatLogic(
    props.projectId,
    props.username,
    props.secret,
    props.httpUrl
  );

  async function getOrCreateChat() {
    const usernames = chatFormUsers.map(user => user.username);
    const data = {
      usernames: usernames,
    };
    const headers = {
      'Project-ID': chatProps.projectId,
      'User-Name': chatProps.username,
      'User-Secret': chatProps.secret,
    };

    axios.put('https://api.chatengine.io/chats/', data, { headers }).then(r => {
      setIsChatFormActive(false);
      setChatFromUsers([]);
      chatProps.onChatCardClick(r.data.id);
    });
  }

  const onChatFormChange = (options: OptionType[]) => {
    const users: PersonObject[] = options.map(option =>
      JSON.parse(option.value)
    );
    setChatFromUsers(users);
  };

  return (
    <div
      style={{ height: props.height ? props.height : '100%', display: 'flex' }}
    >
      <MultiChatSocket {...chatProps} />

      <div style={styles.col1} />

      <div style={isMobile ? styles.col0 : styles.col8}>
        <ChatList
          {...chatProps}
          renderChatForm={() => (
            <ChatListHeader
              onNewChatClick={() => {
                chatProps.setActiveChatId(undefined);
                setIsChatFormActive(true);
              }}
            />
          )}
          renderChatCard={(props: ChatCardProps) => (
            <ChatCard
              {...props}
              username={chatProps.username}
              onChatCardClick={(chatId: number) => {
                setIsChatFormActive(false);
                setChatFromUsers([]);
                chatProps.onChatCardClick(chatId);
              }}
              isActive={
                props.chat !== undefined &&
                chatProps.activeChatId === props.chat.id
              }
              chat={props.chat}
            />
          )}
        />
      </div>

      <div style={isMobile ? styles.col22 : styles.col14}>
        <ChatFeed
          {...chatProps}
          renderChatHeader={(chatHeaderProps: ChatHeaderProps) => {
            if (isChatFormActive) {
              return (
                <ChatForm
                  projectId={chatProps.projectId}
                  username={chatProps.username}
                  secret={chatProps.secret}
                  onChange={onChatFormChange}
                  onCancel={getOrCreateChat}
                />
              );
            } else {
              return (
                <ChatHeader
                  {...chatHeaderProps}
                  chat={chatProps.chat}
                  projectId={chatProps.projectId}
                  username={chatProps.username}
                  secret={chatProps.secret}
                  onDeleteChat={chatProps.onDeleteChat}
                />
              );
            }
          }}
          renderMessageList={(props: MessageListProps) => (
            <MessageList
              {...props}
              renderMessageList={undefined}
              messages={isChatFormActive ? [] : chatProps.messages}
            />
          )}
          renderMessageForm={(props: MessageFormProps) => {
            if (isChatFormActive) {
              return <div style={styles.messageForm} />;
            } else {
              return <MessageForm {...props} />;
            }
          }}
        />
      </div>

      <div style={styles.col1} />

      <style>{`
      .ce-chat-list { background-color: rgb(40,43,54) !important; }
      .ce-chat-form { background-color: rgb(40,43,54) !important; padding-bottom: 14px !important;  }
      .ce-chat-form-title { color: white !important; }

      .ce-chat-feed-column { border: none !important; }
      .ce-chat-feed { background-color: rgb(40,43,54) !important; }
      .ce-message-list { margin-top: 24px !important; margin-left: 12px !important; margin-right: 12px !important; padding: 0px 3.3vw !important; background: linear-gradient(0deg, rgba(62,64,75,1) 0%, rgba(62,64,75,1) 75%, rgba(40,43,54,1) 100%); border-radius: 8px 8px 0px 0px !important; height: calc((100% - 85px) - 72px - 24px - 12px) !important; }

      .ce-message-date-text { font-weight: 600; letter-spacing: 0.1px !important; font-family: 'Avenir' !important; color: rgb(153, 153, 153) !important; font-size: 14px !important; letter-spacing: -1px; }
      .ce-my-message-body { font-family: 'Avenir' !important; padding: 15px !important; }
      .ce-my-message-timestamp { font-weight: 600; letter-spacing: 0.1px !important; font-family: 'Avenir' !important; font-size: 12px !important; padding: 15px !important; margin-right: 0px !important; letter-spacing: -1px; }
      .ce-their-message-body { font-family: 'Avenir' !important; padding: 15px !important; background-color: #434756 !important; color: white !important; }
      .ce-their-message-timestamp { font-weight: 600; letter-spacing: 0.1px !important; font-family: 'Avenir' !important; font-size: 12px !important; padding: 15px !important; margin-left: 0px !important; letter-spacing: -1px; }
      .ce-their-message-timestamp { color: rgb(241, 240, 240) !important; letter-spacing: -1px; }
      .ce-their-message-sender-username { color: #999 !important; }
      .ce-message-file { background-color: #434758 !important; color: #c5c5c5 !important; border-radius: 8px !important; }
      .ce-message-image { background-color: #434758 !important; color: #c5c5c5 !important; border-radius: 8px !important; padding: 0px !important; max-width: 124px !important; max-height: 124px !important; }

      .ce-mobile-chat-list-button { top: 32px !important; left: 0px !important; }
      .ce-mobile-chat-settings-button { display: none !important; }

      .ce-avatar-status { border: 2px solid rgb(40,43,54) !important; width: 7px !important; height: 7px !important; }
      `}</style>
    </div>
  );
};

const styles = {
  col0: {
    display: 'block',
    flex: '0 0 0%',
    maxWidth: '0%',
  } as React.CSSProperties,
  col1: {
    display: 'block',
    flex: '0 0 4.16666667%',
    maxWidth: '4.16666667%',
    backgroundColor: '#282b36',
  } as React.CSSProperties,
  col8: {
    display: 'block',
    flex: '0 0 33.3333333%',
    maxWidth: '33.3333333%',
  } as React.CSSProperties,
  col9: {
    display: 'block',
    flex: '0 0 37.5%',
    maxWidth: '37.5%',
  } as React.CSSProperties,
  col14: {
    display: 'block',
    flex: '0 0 58.33333333%',
    maxWidth: '58.33333333%',
  } as React.CSSProperties,
  col16: {
    display: 'block',
    flex: '0 0 66.66666667%',
    maxWidth: '66.66666667%',
  } as React.CSSProperties,
  col22: {
    display: 'block',
    flex: '0 0 91.66666667%',
    maxWidth: '91.66666667%',
  } as React.CSSProperties,
  col24: {
    display: 'block',
    flex: '0 0 100%',
    maxWidth: '100%',
  } as React.CSSProperties,
  messageForm: {
    height: '68px',
    marginLeft: '12px',
    marginRight: '12px',
    width: 'calc(100% - 12px - 12px)',
    borderRadius: '0px 0px 8px 8px',
    backgroundColor: '#3e404b',
  } as React.CSSProperties,
};
