import { PrettyChatWindow } from 'react-chat-engine-pretty';

function App() {
  const usernames = [
    'adam@lamorre.co',
    'bob@mail.com',
    'jack@lamorre.co',
    'cindy@mail.com',
  ];
  return (
    <PrettyChatWindow
      projectId="5d498a31-cd23-42b7-b367-4fcc9463bd2f"
      username="ADAM"
      secret="adam"
      // httpUrl="https://api.chatengine.io"
      height="calc(100vh - 24px)"
    />
  );
}

export default App;
