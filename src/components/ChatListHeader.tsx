import React, { CSSProperties } from 'react';

import { FormOutlined } from '@ant-design/icons';

interface ChatListHeaderProps {
  onNewChatClick: () => void;
}

const ChatListHeader = (props: ChatListHeaderProps) => {
  return (
    <div style={styles.chatListHeader}>
      <div style={styles.chatListHeaderTitle}>Chats</div>

      <button
        className="ce-new-chat-button"
        style={styles.chatListHeaderButton}
        onClick={props.onNewChatClick}
      >
        <FormOutlined />
      </button>

      <style>{`.ce-new-chat-button:hover { color: rgb(24, 144, 255) !important; }`}</style>
    </div>
  );
};

const styles = {
  chatListHeader: {
    display: 'inline-block',
    width: 'calc(100% - 12px - 12px)',
    margin: '0px 12px',
    paddingTop: '28px',
    paddingBottom: '32px',
  } as CSSProperties,
  chatListHeaderTitle: {
    display: 'inline-block',
    color: 'white',
    fontSize: '21px',
    fontFamily: 'Avenir',
    fontWeight: '600',
  } as CSSProperties,
  chatListHeaderButton: {
    display: 'inline-block',
    float: 'right',
    cursor: 'pointer',
    transition: 'all 0.33s ease',
    outline: 'none',
    backgroundColor: 'rgb(40,43,54)',
    border: '1px solid rgb(40,43,54)',
    fontSize: '18px',
    color: 'white',
  } as CSSProperties,
};

export default ChatListHeader;
