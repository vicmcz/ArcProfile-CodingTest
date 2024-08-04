import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from '@components/ErrorBoundary';

// 无需懒加载
import Home from '../pages/Home';

// App 总路由器
function AppRouter() {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <Router basename={basename}>
      {/* 目前仅提供路由组件日常边界处理 */}
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default AppRouter;
