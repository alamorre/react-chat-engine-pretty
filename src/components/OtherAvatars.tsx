import React from 'react';

import { ChatObject } from 'react-chat-engine-advanced';

interface OtherAvatarProps {
  chat: ChatObject;
}

const OtherAvatars = (props: OtherAvatarProps) => {
  console.log(props);
  return <div />;
};

export default OtherAvatars;
