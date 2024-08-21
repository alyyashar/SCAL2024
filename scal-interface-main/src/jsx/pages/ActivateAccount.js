import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ActivateAccount = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('');
  const [debugInfo, setDebugInfo] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const activateAccount = async () => {
      try {
        console.log('Activating account with token:', token); // Debug
        const response = await axios.post('/api/users/activate', { token });
        setMessage(response.data.message);
        setDebugInfo(`Success: ${JSON.stringify(response.data)}`);
      } catch (error) {
        console.error('Activation error:', error); // Debug
        const errorMessage = error.response?.data?.message || 'An error occurred';
        setMessage(errorMessage);
        setDebugInfo(`Error: ${errorMessage}, Details: ${JSON.stringify(error.response?.data || error)}`);
      } finally {
        setLoading(false);
      }
    };

    activateAccount();
  }, [token]);

  return (
    <div>
      <h1>Account Activation</h1>
      {loading ? <p>Loading...</p> : <p>{message}</p>}
      {debugInfo && !loading && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <h3>Debug Information:</h3>
          <pre>{debugInfo}</pre>
        </div>
      )}
    </div>
  );
};

export default ActivateAccount;
