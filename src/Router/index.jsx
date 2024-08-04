import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 无需懒加载
import Home from '../pages/Home';

function AppRouter() {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
