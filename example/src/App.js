import { PrettyChatWindow } from 'react-chat-engine-advanced';

function App() {
  const usernames = [
    'adam@lamorre.co',
    'bob@mail.com',
    'jack@lamorre.co',
    'cindy@mail.com',
  ];
  return (
    <div>
      <PrettyChatWindow
        projectId="e9cffdf0-9612-4ec3-a8f1-343938280012"
        username={usernames[Math.floor(Math.random() * usernames.length)]}
        secret="Pass1234!"
        httpUrl="https://api.chatengine.io"
        height="calc(100vh - 24px)"
      />
    </div>
  );
}

export default App;
