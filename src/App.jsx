import { SessionProvider } from './libs/session';
import { initSp } from './libs/sp';
import AppRouter from './router';

let prefix = '/';
if (window.blocklet && window.blocklet.prefix) {
  prefix = window.blocklet.prefix;
}

/**
 * 模拟接入前端日志、异常监控平台
 */
initSp();

function App() {
  return (
    <SessionProvider serviceHost={prefix}>
      <AppRouter />
    </SessionProvider>
  );
}

export default App;
