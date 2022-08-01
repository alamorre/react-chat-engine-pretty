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
        projectId="e7bc4093-a3cf-405a-b87f-f2eb6ba24eef"
        username={usernames[Math.floor(Math.random() * usernames.length)]}
        secret="Pass1234!"
        httpUrl="https://api.chatengine.io"
        height="calc(100vh - 24px)"
      />
    </div>
  );
}

export default App;
