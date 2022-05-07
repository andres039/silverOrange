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

  const [displayRepos, setDisplayRepos] = useState([]);
  const [buttons, setButtons] = useState([]);
  const fetchRepos = async () =>
    await fetch('http://localhost:4000/repos', { mode: 'cors' });

  useEffect(() => {
    const getRepos = async () => {
      try {
        const data = await fetchRepos();
        if (!data.ok) {
          throw new Error();
        }
        const reposData = await data.json();
        const reposDataInOrder = reposData.sort((a, b) =>
          a.created_at < b.created_at ? 1 : -1
        );
        console.log(reposDataInOrder);
        setRepos(reposDataInOrder);
        const languages = await reposData.reduce((acc, cv) => {
          if (!acc.includes(cv.language)) {
            acc.push(cv.language);
          }
          return acc;
        }, []);
        setButtons(languages);
        setDisplayRepos(reposDataInOrder);
      } catch (err) {
        console.error('message', err);
      }
    };
    getRepos();
  }, []);

  const handleClick = (language) => {
    const filterByLanguage = repos.filter((repo) => repo.language === language);
    setDisplayRepos(filterByLanguage);
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
        {displayRepos.map((repo, index) => (
          <ReposCard key={index} repo={repo} />
        ))}
      </Container>
    </div>
  );
}
