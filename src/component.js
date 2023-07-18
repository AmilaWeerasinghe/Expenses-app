import React, { useEffect, useState } from 'react';
import { fetchData } from './api';

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    fetchData().then((data) => {
      setData(data.message);
    });
  }, []);

  return (
    <div>
      <h1>Hello from React!</h1>
      <p>Response from the backend: {data}</p>
    </div>
  );
}

export default App;
