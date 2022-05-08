import { Card, Container, Modal, Text } from '@mantine/core';
import { useState } from 'react';
const ReposCard = ({ repo }) => {
  const [opened, setOpened] = useState(false);
  const [content, setContent] = useState('');
  const [commit, setCommit] = useState({
    author: '',
    message: '',
    date: '',
  });
  const openRepo = async () => {
    setOpened(true);
    const markup = await fetch(
      `https://raw.githubusercontent.com/${repo.full_name}/master/README.md`
    );
    const commitInfo = await fetch(
      `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits`
    );
    const commitData = await commitInfo.json();
    const commitDataInOrder = await commitData.sort((a, b) =>
      a.created_at < b.created_at ? -1 : 1
    );
    console.log('commit', commitDataInOrder);

    setCommit({
      author: commitDataInOrder[0].commit.author.name,
      message: commitDataInOrder[0].commit.message,
      date: commitDataInOrder[0].commit.author.date,
    });
    if (markup.ok) {
      const readableMarkUp = await markup.text();
      setContent(readableMarkUp);
    }
  };

  return (
    <Container>
      <button onClick={() => openRepo()} style={{ maxWidth: '40vw' }}>
        <Card sx={{ minWidth: '30vw' }} shadow="sm">
          <Text weight={800}>Name: {repo.name}</Text>
          <Text weight={800}>Description: {repo.description}</Text>
          <Text weight={800}>Language: {repo.language}</Text>
          <Text weight={800}>Forks Count: {repo.forks}</Text>
        </Card>
      </button>
      <Modal opened={opened} onClose={() => setOpened(false)} size="xl">
        <h1>Most recent commit:</h1>
        <p>{commit.date}</p>
        <h1>Author: </h1>
        <p>{commit.author}</p>
        <h1>Message: </h1>
        <p>{commit.message}</p>
        <h1>Markup:</h1>
        <pre>{content}</pre>
      </Modal>
    </Container>
  );
};

export default ReposCard;
