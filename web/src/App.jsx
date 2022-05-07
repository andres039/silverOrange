import './App.css';
import { useState, useEffect } from 'react';
import ReposCard from './repos';
import { Container } from '@mantine/core';

export function App() {
  const [repos, setRepos] = useState([
    {
      name: 'Hello',
      description: 'test',
      language: 'test',
      forkCount: 0,
    },
  ]);
  const fetchRepos = async () =>
    await fetch('http://localhost:4000/repos', { mode: 'cors' });
  useEffect(() => {
    const getRepos = async () => {
      const data = await fetchRepos();
      const reposData = await data.json();
      setRepos(reposData);
      console.log(reposData);
    };
    getRepos();
  }, []);
  return (
    <div className="App">
      <h1>Test</h1>
      <Container sx={{ width: '100vw' }}>
        {repos.map((repo, index) => (
          <ReposCard key={index} repo={repo} />
        ))}
      </Container>
    </div>
  );
}

/*Action plan:

  Fetch from my API
  Create a component to display info
  Map all the fetch results into the component

*/
