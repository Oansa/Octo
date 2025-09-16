import React, { useState } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import '../src/login.scss';

const II_CANISTER_ID = process.env.II_CANISTER_ID || 'uzt4z-lp777-77774-qaabq-cai';

export default function Login({ onAuthenticated }) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const authClient = await AuthClient.create();
      await authClient.login({
        identityProvider: `https://${II_CANISTER_ID}.ic0.app`,
        onSuccess: async () => {
          const identity = authClient.getIdentity();
          const principal = identity.getPrincipal();
          onAuthenticated(principal);
        },
        onError: (err) => {
          setError('Login failed: ' + (err?.message || err?.toString() || 'Unknown error'));
        },
      });
    } catch (e) {
      setError('Error: ' + (e.message || e.toString()));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Medical App Login</h2>
        <button className="login-btn" onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging in...' : 'Log in with Internet Identity'}
        </button>
        {error && <div className="error-msg">{error}</div>}
      </div>
    </div>
  );
}
