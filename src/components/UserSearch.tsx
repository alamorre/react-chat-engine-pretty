import React, { useState, useRef, useEffect } from 'react';

import axios from 'axios';
import { PersonObject } from 'react-chat-engine-advanced';

interface CustomChatFormProps {
  projectId: string;
  privateKey: string;
  username: string;
  secret: string;
  onSelect: (chatId: number) => void;
}

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

const UserSearch = (props: CustomChatFormProps) => {
  const [userOptions, setUserOptions] = useState<PersonObject[]>([]);
  const [userResults, setUserResults] = useState<PersonObject[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;

      getAllUsers(
        users => setUserOptions(users),
        () => console.log('oops!')
      );
    }
  });

  const onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    setSearchValue(event.target.value);

    setUserResults(userOptions);
  };

  console.log(userOptions, props);
  return (
    <div>
      <input value={searchValue} onChange={onChange} />
      {searchValue.length > 0 &&
        userResults.map((user, index) => (
          <div key={index}>{user.username}</div>
        ))}
    </div>
  );
};

export default UserSearch;
