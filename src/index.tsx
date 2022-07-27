import * as React from 'react';

import {
  useMultiChatLogic,
  MultiChatWindow,
  MultiChatWindowProps,
  MultiChatSocket,
  ChatHeaderProps,
  MessageFormProps,
} from 'react-chat-engine-advanced';

import ChatHeader from './components/ChatHeader';
import MessageForm from './components/MessageForm';

interface PrettyChatWindowProps extends MultiChatWindowProps {
  projectId: string;
  username: string;
  secret: string;
  httpUrl?: string;
  height?: string;
}

export const PrettyChatWindow = (props: PrettyChatWindowProps) => {
  const chatProps = useMultiChatLogic(
    props.projectId,
    props.username,
    props.secret,
    props.httpUrl
  );

  return (
    <div style={{ height: props.height ? props.height : '100%' }}>
      <MultiChatSocket {...chatProps} />

      <MultiChatWindow
        {...chatProps}
        renderChatHeader={(props: ChatHeaderProps) => (
          <ChatHeader
            {...props}
            chat={chatProps.chat}
            username={chatProps.username}
            secret={chatProps.secret}
          />
        )}
        renderMessageForm={(props: MessageFormProps) => (
          <MessageForm {...props} />
        )}
        style={{ height: props.height ? props.height : '100%' }}
      />

      <style>{`
      .ce-chat-feed-column { border: none !important; }
      .ce-chat-feed { background-color: rgb(40,43,54) !important; }
      `}</style>
    </div>
  );
};
