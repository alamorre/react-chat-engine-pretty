import React, { CSSProperties, useRef, useEffect, useState } from 'react';

import axios from 'axios';

import { PersonObject } from 'react-chat-engine-advanced';

import { CloseOutlined } from '@ant-design/icons';

import Select from 'react-select';

const getAllUsers = (
  onSuccess: (data: PersonObject[]) => void,
  onError: () => void
) => {
  axios
    // TODO: Change this to prod URL
    .get('http://127.0.0.1:8000/users/', {
      headers: { 'Private-Key': 'b4533f3c-e60a-409f-8a24-2e1a8bc2943e' },
    })
    .then(r => onSuccess(r.data))
    .catch(() => onError);
};

interface OptionType {
  value: string;
  label: string;
}

interface ChatFormProps {
  username: string;
  onCancel: () => void;
}

const ChatForm = (props: ChatFormProps) => {
  const didMountRef = useRef(false);
  const [options, setOptions] = useState<OptionType[]>([]);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;

      getAllUsers(
        users => {
          const otherUsers = users.filter(
            user => user.username !== props.username
          );
          const options = otherUsers.map(user => {
            return {
              value: JSON.stringify(user),
              label: `${user.first_name} ${user.last_name}`,
            };
          });
          setOptions(options);
        },
        () => console.log('oops!')
      );
    }
  });

  return (
    <div className="ce-custom-chat-form" style={styles.chatForm}>
      <Select
        options={options}
        autoFocus={true}
        isMulti={true}
        onChange={e => console.log(e)}
        styles={customStyles}
        placeholder="Search for users..."
      />

      <button
        className="ce-cancel-new-chat-button"
        style={styles.createChatButton}
        onClick={props.onCancel}
      >
        <CloseOutlined />
      </button>

      <style>{`.ce-cancel-new-chat-button:hover { color: rgb(24, 144, 255) !important; }`}</style>
    </div>
  );
};

interface StateType {
  isFocused: boolean;
}

const customStyles = {
  container: () => ({
    width: 'calc(100% - 12px - 12px - 38px - 4px)',
    marginLeft: '12px',
    marginTop: '26px',
  }),
  control: (provided: object) => ({
    ...provided,
    outline: 'none',
    fontFamily: 'Avenir',
    color: 'white',
    backgroundColor: '#434758',
    borderRadius: '8px',
    border: '1px solid rgb(24, 144, 255)',
    boxShadow: 'rgb(24 144 255 / 35%) 0px 2px 7px',
  }),
  input: (provided: object) => ({
    ...provided,
    color: 'white',
  }),
  placeholder: (provided: object) => ({
    ...provided,
    color: 'rgb(197, 197, 197)',
  }),
  option: (provided: object, state: StateType) => ({
    ...provided,
    fontFamily: 'Avenir',
    color: 'rgb(197, 197, 197)',
    backgroundColor: state.isFocused ? '#4e5263' : '#434758',
  }),
  noOptionsMessage: (provided: object) => ({
    ...provided,
    fontFamily: 'Avenir',
  }),
  menu: (provided: object) => ({
    ...provided,
    width: 'calc(100% - 12px - 12px - 38px - 4px)',
    backgroundColor: '#434758',
  }),
};

const styles = {
  chatForm: {
    display: 'inline-block',
    position: 'relative',
    width: '100%',
    height: '86px',
  } as CSSProperties,
  createChatButton: {
    width: '38px',
    height: '38px',
    position: 'absolute',
    right: '12px',
    top: '26px',

    cursor: 'pointer',
    transition: 'all 0.33s ease',
    outline: 'none',
    backgroundColor: 'rgb(40,43,54)',
    border: '1px solid rgb(40,43,54)',
    fontSize: '18px',
    color: 'white',
  } as CSSProperties,
};

export default ChatForm;