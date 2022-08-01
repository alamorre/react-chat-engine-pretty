<p align="center" >
    <p align="center" >
        <a href="https://chatengine.io/">
            <img    
                alt="react-chat-engine-pretty" 
                style='max-height: 333px; max-width: 100%;'
                src="https://chat-engine-assets.s3.amazonaws.com/tutorials/pretty/thumbnail.png" 
            />
        </a>
    </p>
</p>

## Chat Engine ✨Pretty✨

Chat Engine is a devevloper friendly and ✨pretty✨ Chat UI Kit.

Setup a free plan at [chatengine.io](https://chatengine.io)

## Features

- Typescript (since 2.0.0)
- Send messages
- Send images / files
- DMs and Group Chats

## Installation

- Using [npm](https://www.npmjs.com/#getting-started): `npm install react-chat-engine-pretty --save`
- Using [Yarn](https://yarnpkg.com/): `yarn add react-chat-engine-pretty`

## Quick Start

Add serverless chat to your React app in 3 minutes.

1. Register then create a **project** and **user** at [chatengine.io](https://chatengine.io)

2. Collect the **Project ID** / **username** / **User Secret**

3. Install `yarn add react-chat-engine`

4. Import and declare `<PrettyChatWindow />`

5. You're done!

Example implementation ⬇️

```jsx
import React from 'react';

import { PrettyChatWindow } from 'react-chat-engine-pretty';

export function App() {
  return (
    <PrettyChatWindow
      projectId="b75e5bd5-cd84-404c-b820-06feff8c98c0"
      username="john_smith"
      secret="pass1234"
      style={{ height: '100vh' }}
    />
  );
}
```

## Props

- **`projectId`** _(String REQUIRED)_ - Public API key for your [chatengine.io](https://chatengine.io) project
- **`username`** _(String REQUIRED)_ - username of a person in this project
- **`secret`** _(String REQUIRED)_ - Set a secret for this person and use it to authenticate.
- **`style`** _(String OPTIONAL)_ - CSS used to customize the size of your Chat Window
