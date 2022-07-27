import * as React from 'react';

import {
  useMultiChatLogic,
  MultiChatWindow,
  MultiChatWindowProps,
  MultiChatSocket,
} from 'react-chat-engine-advanced';

interface PrettyChatWindowProps extends MultiChatWindowProps {
  projectId: string;
  username: string;
  secret: string;
  httpUrl?: string;
  height?: string;
}

export const PrettyChatWindow = (props: PrettyChatWindowProps) => {
  const chatProps = useMultiChatLogic(
    props.projectId,
    props.username,
    props.secret,
    props.httpUrl
  );

  return (
    <div style={{ height: props.height ? props.height : '100%' }}>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow
        {...chatProps}
        style={{ height: props.height ? props.height : '100%' }}
      />
    </div>
  );
};
