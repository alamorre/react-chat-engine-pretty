import React from 'react';

import { Avatar, ChatObject } from 'react-chat-engine-advanced';
import { getOtherUsers } from '../functions/getOtherUsers';
interface OtherAvatarProps {
  chat: ChatObject;
  username: string;
  style?: React.CSSProperties;
}

const OtherAvatars = (props: OtherAvatarProps) => {
  const otherUsers = getOtherUsers(props.chat, props.username);
  const memberOne = otherUsers.length > 0 ? otherUsers[0] : undefined;
  const memberTwo = otherUsers.length > 1 ? otherUsers[1] : undefined;
  const memberThree = otherUsers.length > 2 ? otherUsers[2] : undefined;

  return (
    <div style={props.style}>
      <Avatar
        className="ce-custom-header-avatar"
        avatarUrl={memberOne?.avatar}
        username={memberOne?.username}
        style={{
          ...styles.avatar,
          ...(memberOne?.is_online ? styles.online : styles.offline),
          ...(memberTwo && {
            width: '28px',
            height: '28px',
            lineHeight: '28px',
            fontSize: '12px',
          }),
          ...(memberThree && {
            width: '21px',
            height: '21px',
            lineHeight: '21px',
            fontSize: '10px',
          }),
        }}
      />

      {memberTwo && (
        <Avatar
          className="ce-custom-header-avatar"
          avatarUrl={memberTwo?.avatar}
          username={memberTwo?.username}
          style={{
            ...styles.avatar,
            ...(memberOne?.is_online ? styles.online : styles.offline),
            ...{
              width: '28px',
              height: '28px',
              lineHeight: '28px',
              fontSize: '12px',
              top: 'calc(40px - 28px - 6px)',
              left: 'calc(40px - 28px)',
            },
            ...(memberThree && {
              width: '21px',
              height: '21px',
              lineHeight: '21px',
              fontSize: '10px',
              top: '-5px',
              left: '22px',
            }),
          }}
        />
      )}

      {memberThree && (
        <Avatar
          className="ce-custom-header-avatar"
          avatarUrl={memberThree?.avatar}
          username={memberThree?.username}
          style={{
            ...styles.avatar,
            ...(memberThree?.is_online ? styles.online : styles.offline),
            ...{
              width: '21px',
              height: '21px',
              lineHeight: '21px',
              fontSize: '10px',
              top: '-7px',
              left: '11px',
            },
          }}
        />
      )}
    </div>
  );
};

const styles = {
  avatar: {
    display: 'inline-block',
    position: 'relative',
    top: '22px',
    marginLeft: '12px',
    width: '38px',
    height: '38px',
    fontSize: '14px',
    lineHeight: '40px',
    transition: 'all 0.66s ease',
  } as React.CSSProperties,
  online: {
    border: '1px solid rgb(24, 144, 255)',
    boxShadow: 'rgb(24 144 255 / 35%) 0px 2px 7px',
  } as React.CSSProperties,
  offline: {
    border: '1px solid #fa541c',
    boxShadow: 'rgb(245 34 45 / 35%) 0px 2px 7px',
  } as React.CSSProperties,
};

export default OtherAvatars;
