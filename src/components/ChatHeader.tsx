import React, { CSSProperties } from 'react';

import axios from 'axios';

import { ChatHeaderProps, ChatObject } from 'react-chat-engine-advanced';

import {
  DeleteFilled,
  PaperClipOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

import OtherAvatars from './OtherAvatars';

import { nowTimeStamp } from '../functions/dates';
import { getOtherUsers, getChatTitle } from '../functions/getOtherUsers';

import { useState } from 'react';

interface CustomChatHeaderProps extends ChatHeaderProps {
  chat?: ChatObject;
  projectId: string;
  username: string;
  secret: string;
  onDeleteChat: (oldChat: ChatObject) => void;
}

const ChatHeader = (props: CustomChatHeaderProps) => {
  // State
  const [isFilePickerLoading, setFilePickerLoading] = useState(false);
  const [isDeleteLoading, setDeleteLoading] = useState(false);

  const otherMembers = props.chat
    ? getOtherUsers(props.chat, props.username)
    : [];
  const otherMember = otherMembers.length > 0 ? otherMembers[0] : undefined;

  const onFilesSelect: React.ChangeEventHandler<HTMLInputElement> = e => {
    if (!props.chat) return;
    setFilePickerLoading(true);

    const headers = {
      'Project-ID': props.projectId,
      'User-Name': props.username,
      'User-Secret': props.secret,
    };

    const formdata = new FormData();
    const filesArr = Array.from(e.target.files !== null ? e.target.files : []);
    filesArr.forEach(file => formdata.append('attachments', file, file.name));
    formdata.append('created', nowTimeStamp());
    formdata.append('sender_username', props.username);
    formdata.append('custom_json', JSON.stringify({}));

    axios
      .post(
        `https://api.chatengine.io/chats/${props.chat.id}/messages/`,
        formdata,
        { headers }
      )
      .then(() => setFilePickerLoading(false))
      .catch(() => setFilePickerLoading(false));
  };

  const onDelete = () => {
    if (!props.chat) return;
    setDeleteLoading(true);

    const headers = {
      'Project-ID': props.projectId,
      'User-Name': props.username,
      'User-Secret': props.secret,
    };

    axios
      .delete(`https://api.chatengine.io/chats/${props.chat.id}/`, { headers })
      .then(r => {
        setDeleteLoading(false);
        props.onDeleteChat(r.data);
      });
  };

  if (!otherMember || !props.chat)
    return <div className="ce-custom-chat-header" style={styles.chatHeader} />;

  return (
    <div className="ce-custom-chat-header" style={styles.chatHeader}>
      <OtherAvatars
        chat={props.chat}
        username={props.username}
        style={styles.chatAvatars}
      />

      <div className="ce-custom-header-text" style={styles.headerText}>
        <div className="ce-custom-header-title" style={styles.headerTitle}>
          {getChatTitle(props.chat, props.username)}
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
                style={{ color: 'rgb(153, 153, 153)' }}
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
          <LoadingOutlined
            style={{ color: 'rgb(153, 153, 153)' }}
            className="ce-custom-header-icon"
          />
        ) : (
          <DeleteFilled
            onClick={() => onDelete()}
            className="ce-custom-header-icon"
            style={styles.headerIcon}
          />
        )}
      </div>

      <style>{`.ce-custom-header-icon:hover { color: rgb(24, 144, 255) !important; }`}</style>
    </div>
  );
};

const styles = {
  chatAvatars: {
    width: 'calc(40px + 14px + 14px)',
    height: '100%',
    display: 'block',
  } as CSSProperties,
  chatHeader: {
    display: 'flex',
    position: 'relative',
    marginLeft: '12px',
    width: 'calc(100% - 12px - 12px)',
    height: '86px',
  } as CSSProperties,
  headerText: {
    display: 'block',
    width: 'calc(100% - 40px - 14px - 14px - 100px)',
    height: '100%',
    position: 'relative',
  } as CSSProperties,
  headerTitle: {
    color: 'white',
    fontSize: '13px',
    fontFamily: 'Avenir',
    paddingTop: '26.5px',
  } as CSSProperties,
  headerSubtitle: {
    fontFamily: 'Avenir',
    color: 'rgb(153, 153, 153)',
    fontSize: '11px',
  } as CSSProperties,
  iconWrapper: {
    display: 'block',
    width: '100px',
    height: '100%',
    textAlign: 'right',
  } as CSSProperties,
  headerIcon: {
    marginLeft: '12px',
    paddingTop: 'calc((86px - 15px) / 2)',
    cursor: 'pointer',
    color: 'rgb(153, 153, 153)',
    transition: 'all 0.66s ease',
  } as CSSProperties,
};

export default ChatHeader;
