import React, { CSSProperties } from 'react';

import {
  ChatHeaderProps,
  ChatObject,
  PersonObject,
  Avatar,
} from 'react-chat-engine-advanced';

import {
  DeleteFilled,
  PaperClipOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

// import axios from 'axios';

// import { nowTimeStamp } from '../functions/dates';
import { getOtherUser } from '../functions/getOtherUser';
import { useIsMobile } from '../functions/isMobile';

import { useState } from 'react';

interface CustomChatHeaderProps extends ChatHeaderProps {
  chat?: ChatObject;
  username: string;
  secret: string;
}

const ChatHeader = (props: CustomChatHeaderProps) => {
  // State
  const [isFilePickerLoading, setFilePickerLoading] = useState(false);
  const [isDeleteLoading, setDeleteLoading] = useState(false);
  // Hooks
  const isMobile: boolean = useIsMobile();

  // TODO: Show how TS recommends props.chat &&
  const otherMember: PersonObject | undefined =
    props.chat && getOtherUser(props.chat, props.username);

  const onFilesSelect: React.ChangeEventHandler<HTMLInputElement> = () => {
    if (!props.chat) return;
    setFilePickerLoading(true);
    console.log('FIX THIS FILE UPLOAD');
  };

  const onDelete = () => {
    if (!props.chat) return;
    setDeleteLoading(true);
    console.log('FIX THIS CHAT DELETE');
  };

  if (!otherMember)
    return <div className="ce-custom-chat-header" style={styles.chatHeader} />;

  return (
    <div className="ce-custom-chat-header" style={styles.chatHeader}>
      <Avatar
        className="ce-custom-header-avatar"
        avatarUrl={otherMember?.avatar}
        username={otherMember?.username}
        isOnline={otherMember?.is_online}
      />

      <div className="ce-custom-header-text" style={styles.headerText}>
        <div className="ce-custom-header-title" style={styles.headerTitle}>
          {otherMember.first_name} {otherMember.last_name}
        </div>
        <div
          className="ce-custom-header-subtitle"
          style={styles.headerSubtitle}
        >
          {otherMember.is_online ? 'Online' : 'Offline'}
        </div>
      </div>

      <div className="ce-custom-header-icon-wrapper" style={styles.iconWrapper}>
        <form style={{ display: 'inline-block' }}>
          <label htmlFor="ce-files-picker">
            {isFilePickerLoading ? (
              <LoadingOutlined
                style={styles.headerIcon}
                className="ce-custom-header-icon"
              />
            ) : (
              <PaperClipOutlined
                style={styles.headerIcon}
                className="ce-custom-header-icon"
              />
            )}
          </label>
          <input
            multiple
            id="ce-files-picker"
            style={{ visibility: 'hidden', height: '0px', width: '0px' }}
            type="file"
            onChange={onFilesSelect}
          />
        </form>

        {isDeleteLoading ? (
          <LoadingOutlined className="ce-custom-header-icon" />
        ) : (
          <DeleteFilled
            onClick={() => onDelete()}
            className="ce-custom-header-icon"
            style={styles.headerIcon}
          />
        )}
      </div>

      <style>{`
        .ce-custom-header-icon:hover { color: rgb(24, 144, 255) !important; }
        .ce-custom-header-avatar { display: inline-block; position: relative; top: 18px; margin-left: ${
          isMobile ? '48px' : '12px'
        }; border: 1px solid ${
        otherMember?.is_online ? 'rgb(24, 144, 255)' : '#fa541c'
      }; box-shadow: ${
        otherMember?.is_online
          ? 'rgb(24 144 255 / 35%)'
          : 'rgb(245 34 45 / 35%)'
      } 0px 2px 7px; width: 38px !important; height: 38px !important; font-size: 14px !important; transition: all 0.66s ease; }
        `}</style>
    </div>
  );
};

const styles = {
  chatHeader: {
    display: 'inline-block',
    position: 'relative',
    width: '100%',
    height: '86px',
  } as CSSProperties,
  headerText: {
    display: 'inline-block',
    maxWidth: '50%',
    paddingLeft: '14px',
    position: 'relative',
    top: '21px',
  } as CSSProperties,
  headerTitle: {
    color: 'white',
    fontSize: '13px',
    fontFamily: 'Avenir',
  } as CSSProperties,
  headerSubtitle: {
    fontFamily: 'Avenir',
    color: 'rgb(153, 153, 153)',
    fontSize: '11px',
  } as CSSProperties,
  iconWrapper: {
    display: 'inline-block',
    maxWidth: '50%',
    position: 'relative',
    top: '36px',
    float: 'right',
  } as CSSProperties,
  headerIcon: {
    marginRight: '12px',
    cursor: 'pointer',
    color: 'rgb(153, 153, 153)',
    transition: 'all 0.66s ease',
  } as CSSProperties,
};

export default ChatHeader;
