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
        .ce-chat-card:hover { border: 1px solid #1890ff !important; box-shadow: rgb(24 144 255 / 35%) 0px 2px 7px !important; }
        .ce-chat-card-loading { height: 10px !important; }
        .ce-chat-card-title-loading { top: 16px !important; }
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
          top: '12px',
          boxShadow: otherMember?.is_online
            ? 'rgb(24 144 255 / 35%) 0px 2px 7px'
            : 'rgb(245 34 45 / 35%) 0px 2px 7px',
          border: otherMember?.is_online
            ? '1px solid rgb(24 144 255)'
            : '1px solid rgb(245 34 45)',
        }}
        isActive={props.isActive}
        onClick={() => props.chat && props.onChatCardClick(props.chat.id)}
        style={{
          border: '1px solid #3e404b',
          backgroundColor: '#3e404b',
          margin: '10px 12px',
          height: '68px',
        }}
        titleStyle={{ color: 'white' }}
        subtitleStyle={{
          bottom: '16px',
          width: 'calc(70% - 44px)',
          color: '#c5c5c5',
        }}
        timeStampStyle={{
          fontSize: '12px',
          bottom: '16px',
        }}
        activeStyle={{
          border: '1px solid #1890ff',
          backgroundColor: '#1890ff',
          boxShadow: 'rgb(24 144 255 / 35%) 0px 2px 7px',
          color: 'white',
        }}
        notificationStyle={{ top: 'calc((68px - 12px) / 2)' }}
      />
    </div>
  );
};

export default CustomChatCard;
