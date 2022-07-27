import { PrettyChatWindow } from 'react-chat-engine-advanced';

function App() {
  return (
    <div>
      <PrettyChatWindow
        projectId="e9cffdf0-9612-4ec3-a8f1-343938280012"
        username="adam@lamorre.co"
        secret="Pass1234!"
        httpUrl="http://127.0.0.1:8000"
        height="calc(100vh - 24px)"
      />
    </div>
  );
}

export default App;
