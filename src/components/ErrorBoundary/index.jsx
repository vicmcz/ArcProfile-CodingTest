import React from 'react';
import { trackError } from '@libs/sp';

// 由于懒加载+版本更新导致资源失效，需要刷新页面重新获取新版本资源
function Update() {
  return <div>请刷新页面更新应用</div>;
}

const { NODE_ENV = 'development' } = process.env;

// 本地开发环境
const isDev = NODE_ENV === 'development';

// 检查是否是资源加载失败，一般chunk加载失败都是由于版本更新导致的，需要刷新页面
const checkLoadChunkError = (error) => {
  const errStr = String(error);
  if (
    errStr.startsWith('ChunkLoadError: Loading chunk') ||
    errStr.startsWith('ChunkLoadError: Loading CSS chunk') ||
    errStr.startsWith('Error: Loading CSS chunk')
  ) {
    // 出现该问题则说明当前页面的js文件加载失败 版本更新，需要刷新页面
    return true;
  }
  return false;
};

// ErrorBoundary 错误边界组件
class ErrorBoundary extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return {
      hasError: true,
      error,
    };
  }

  // 错误捕获
  componentDidCatch(error, errorInfo) {
    if (!checkLoadChunkError(error)) {
      const errMsg = `${error?.toString()}${errorInfo?.componentStack}`;
      // 将错误日志上报给服务器
      trackError({
        message: errMsg,
      });
    }

    this.setState({
      errorInfo,
    });
  }

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { children } = this.props;
    if (hasError) {
      if (checkLoadChunkError(error)) {
        return <Update />;
      }
      // 你可以自定义降级后的 UI 并渲染
      return /*#__PURE__*/ React.createElement(
        'div',
        null,
        /*#__PURE__*/ React.createElement('h2', null, '页面发生错误，请联系系统管理员'),
        // 开发环境下，显示错误信息
        isDev
          ? /*#__PURE__*/ React.createElement(
              'details',
              {
                style: {
                  whiteSpace: 'pre-wrap',
                },
              },
              error && error.toString(),
              /*#__PURE__ */ React.createElement('br', null),
              errorInfo && errorInfo.componentStack,
            )
          : null,
      );
    }

    return children;
  }
}

export default ErrorBoundary;
