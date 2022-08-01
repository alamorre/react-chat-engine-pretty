import React, { CSSProperties } from 'react';
import { useState } from 'react';

import { CaretUpFilled } from '@ant-design/icons';

import { MessageObject, MessageFormProps } from 'react-chat-engine-advanced';

import { nowTimeStamp } from '../functions/dates';

const MessageForm = (props: MessageFormProps) => {
  const [text, setText] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (text.trim().length === 0) {
      return;
    }

    setText('');

    const message: MessageObject = {
      text: text,
      sender_username: props.username ? props.username : '',
      created: nowTimeStamp(),
      custom_json: {},
      attachments: [],
    };

    props.onSubmit && props.onSubmit(message);
  };

  return (
    <form
      onSubmit={onSubmit}
      style={styles.messageForm}
      className="ce-custom-message-form"
    >
      <input
        onChange={e => setText(e.target.value)}
        value={text}
        placeholder="Write a message..."
        className="ce-custom-message-input"
        style={{
          ...styles.messageInput,
          ...(isFocused ? styles.messageInputFocused : {}),
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <style>{`.ce-custom-message-input::placeholder { color: #e1e1e1; font-family: Avenir; }`}</style>

      <button
        type="submit"
        className="ce-custom-send-button"
        style={{ ...styles.sendButton }}
      >
        <CaretUpFilled />
      </button>
    </form>
  );
};

const styles = {
  messageForm: {
    height: '68px',
    marginLeft: '12px',
    marginRight: '12px',
    width: 'calc(100% - 12px - 12px)',
    borderRadius: '0px 0px 8px 8px',
    backgroundColor: '#3e404b',
  } as CSSProperties,
  messageInput: {
    marginTop: '6px',
    marginLeft: '3.3vw',
    marginRight: '4px',
    width: 'calc(100% - 3.3vw - 3.3vw - 12px - 12px - 36px - 4px)',
    boxShadow: 'rgba(24, 144, 255, 0.35) 0px 2px 7px',
    border: '1px solid rgb(24, 144, 255)',
    outline: 'none',
    backgroundColor: '#434756',
    color: 'white',
    fontSize: '14px',
    letterSpacing: '0.17px',
    padding: '0px 15px',
    height: '36px',
    borderRadius: '8px',
    transition: 'all .44s ease',
  } as CSSProperties,
  messageInputFocused: {
    boxShadow: 'rgba(64, 169, 255, 0.35) 0px 2px 7px',
    border: '1px solid #40a9ff',
  } as CSSProperties,
  sendButton: {
    cursor: 'pointer',
    backgroundColor: 'rgb(24, 144, 255)',
    border: '1px solid rgb(24, 144, 255)',
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    color: 'white',
    boxShadow: 'rgba(24, 144, 255, 0.35) 0px 5px 15px',
    transition: 'all .44s ease',
  } as CSSProperties,
};

export default MessageForm;
