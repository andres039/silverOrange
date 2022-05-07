import './App.css';
import { useEffect } from 'react';

export function App() {
  const fetchRepos = async () =>
    await fetch('http://localhost:4000/repos', { mode: 'cors' });
  useEffect(() => {
    const getRepos = async () => {
      const data = await fetchRepos();
      const repos: [] = await data.json();
      console.log(repos);
    };
    getRepos();
  }, []);
  return (
    <div className="App">
      <h1>Test</h1>
    </div>
  );
}

/*Action plan:

  Fetch from my API
  Create a component to display info
  Map all the fetch results into the component

*/
