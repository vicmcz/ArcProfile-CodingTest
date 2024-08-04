/* eslint-disable object-curly-newline */
import { useContext } from 'react';
import { createAuthServiceSessionContext } from '@arcblock/did-connect/lib/Session';

const { SessionProvider, SessionContext, SessionConsumer, withSession } =
  createAuthServiceSessionContext();

/**
 * @description DID session 信息
 */
function useSessionContext() {
  const { api, ...rests } = useContext(SessionContext);
  return { api, ...rests };
}

export { SessionProvider, SessionContext, SessionConsumer, useSessionContext, withSession };
