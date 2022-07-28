import React from 'react';

import {
  ChatCard,
  ChatCardProps,
  ChatObject,
} from 'react-chat-engine-advanced';

import { getOtherUser } from '../functions/getOtherUser';

interface CustomChatCardProps extends ChatCardProps {
  username: string;
  isActive: boolean;
  onChatCardClick: (chatId: number) => void;
  chat?: ChatObject;
}

const CustomChatCard = (props: CustomChatCardProps) => {
  if (!props.chat) return <div />;

  const otherMember = getOtherUser(props.chat, props.username);
  const firstName = otherMember ? otherMember.first_name : '';
  const lastName = otherMember ? otherMember.last_name : '';
  const username = otherMember ? otherMember.username : '';
  const messageText = props.chat.last_message.text;
  const hasNotification =
    props.chat.last_message.sender_username !== props.username;

  return (
    <div>
      <style>{`
        .ce-chat-card { border: 1px solid #3e404b !important; background-color: #3e404b !important; margin: 10px 12px !important; height: 68px !important; }
        .ce-chat-card:hover { border: 1px solid #1890ff !important; box-shadow: rgb(24 144 255 / 35%) 0px 2px 7px !important; }
        .ce-chat-card-loading { height: 10px !important; }
        .ce-chat-card-title-loading { top: 16px !important; }
        .ce-active-chat-card { border: 1px solid #1890ff !important; background-color: #1890ff !important; box-shadow: rgb(24 144 255 / 35%) 0px 2px 7px !important; color: white !important; }
        .ce-chat-card-title { color: white !important; }
        .ce-chat-card-subtitle { font-size: 12px !important; bottom: 16px !important; width: calc(70% - 44px) !important; color: #c5c5c5 !important; }
        .ce-chat-card-time-stamp { font-size: 12px !important; bottom: 16px !important; }
        .ce-chat-card-unread { top: calc((68px - 12px) / 2) !important; }
        .ce-avatar-status { border: 2px solid rgb(40,43,54) !important; width: 10px !important; height: 10px !important; }
        .ce-chat-card-avatar { top: 12px !important; }
        `}</style>

      <ChatCard
        title={`${firstName} ${lastName}`}
        description={
          messageText === null || messageText.length === 0
            ? 'Say hello!'
            : messageText
        }
        hasNotification={hasNotification}
        avatarUrl={otherMember?.avatar}
        avatarUsername={username}
        avatarStyle={{
          boxShadow: otherMember?.is_online
            ? 'rgb(24 144 255 / 35%) 0px 2px 7px'
            : 'rgb(245 34 45 / 35%) 0px 2px 7px',
          border: otherMember?.is_online
            ? '1px solid rgb(24 144 255)'
            : '1px solid rgb(245 34 45)',
        }}
        isActive={props.isActive}
        onClick={() => props.chat && props.onChatCardClick(props.chat.id)}
      />
    </div>
  );
};

export default CustomChatCard;
