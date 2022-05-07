import './App.css';
import { useState, useEffect } from 'react';
import ReposCard from './repos';
import { Button, Container, Group } from '@mantine/core';

export function App() {
  const [repos, setRepos] = useState([
    {
      name: 'Hello',
      description: 'test',
      language: 'test',
      forkCount: 0,
      creationDate: '',
    },
  ]);
  const fetchRepos = async () =>
    await fetch('http://localhost:4000/repos', { mode: 'cors' });
  useEffect(() => {
    const getRepos = async () => {
      const data = await fetchRepos();
      const reposData = await data.json();
      const reposDataInOrder = await reposData.sort((a, b) =>
        a.created_at < b.created_at ? 1 : -1
      );
      setRepos(reposDataInOrder);
    };
    getRepos();
  }, []);

  const buttons = repos.reduce(
    (acc, cv) => {
      if (!acc.includes(cv.language)) {
        acc.push(cv.language);
      }
      return acc;
    },
    [repos]
  );

  buttons.shift();

  const handleClick = (language) => {
    const filterByLanguage = repos.filter((repo) => repo.language === language);
    setRepos(filterByLanguage);
  };
  return (
    <div className="App">
      <h1>SilverOrange Repositories</h1>
      <Group>
        {buttons.map((button, index) => (
          <Button key={index} onClick={() => handleClick(button)}>
            {button}
          </Button>
        ))}
      </Group>
      <Container sx={{ width: '100vw' }}>
        {repos.map((repo, index) => (
          <ReposCard key={index} repo={repo} />
        ))}
      </Container>
    </div>
  );
}
