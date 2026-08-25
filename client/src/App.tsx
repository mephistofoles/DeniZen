import { useState, useEffect } from 'react'
import type { HealthCheck } from '@denizen/shared';

function App() {
  const [health, setHealth] = useState<HealthCheck | null>(null);

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then ((data: HealthCheck) => setHealth(data));
  }, []);

  return (
    <>
    <h1>DeniZen</h1>
    <p>{health ? `Status: ${health.status}` : 'Loading...'}</p>
    </>
  )
}

export default App
