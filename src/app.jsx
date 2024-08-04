import React from 'react';
import { SessionProvider } from './libs/session';
import AppRouter from './Router';

let prefix = '/';
if (window.blocklet && window.blocklet.prefix) {
  prefix = window.blocklet.prefix;
}

function App() {
  return (
    <SessionProvider serviceHost={prefix}>
      <AppRouter />
    </SessionProvider>
  );
}

export default App;
