import './App.css';
import { useState, useEffect } from 'react';
import ReposCard from './Repos';
import {
  Button,
  Center,
  Container,
  Group,
  Notification,
  Space,
  Stack,
} from '@mantine/core';

export function App() {
  const [repos, setRepos] = useState([
    {
      name: '',
      description: '',
      language: '',
      forkCount: '',
      creationDate: '',
    },
  ]);
  const [displayRepos, setDisplayRepos] = useState([]);
  const [buttons, setButtons] = useState([]);
  const [error, setError] = useState(false);
  const getRepos = async () => {
    try {
      const data = await fetch('http://localhost:4000/repos', { mode: 'cors' });
      if (!data.ok) {
        const { status, statusText, url } = data;
        throw Error(`${status}, ${statusText} in fetch ${url}`);
      }
      const reposData = await data.json();
      const reposDataInOrder = await reposData.sort((a, b) =>
        a.created_at < b.created_at ? 1 : -1
      );

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
      setError(true);
      console.error(err);
    }
  };
  useEffect(() => {
    getRepos();
  }, []);

  const handleClick = (language) => {
    const filterByLanguage = repos.filter((repo) => repo.language === language);
    setDisplayRepos(filterByLanguage);
  };

  return (
    <div className="App">
      <h1>SilverOrange Repositories</h1>
      <h3>Languages:</h3>
      <Container>
        <Center>
          <Group>
            <Button
              onClick={() => {
                setDisplayRepos(repos);
              }}
            >
              All
            </Button>
            {buttons.map((button, index) => (
              <Button key={index} onClick={() => handleClick(button)}>
                {button}
              </Button>
            ))}
          </Group>
        </Center>
      </Container>
      <Space h="md" />
      <Container sx={{ width: '100vw' }}>
        <Stack>
          {displayRepos.map((repo, index) => (
            <ReposCard key={index} repo={repo} />
          ))}
        </Stack>
      </Container>
      {error && (
        <Notification color="red" title="There has been a wild error. ">
          Please refresh the page.
        </Notification>
      )}
    </div>
  );
}
