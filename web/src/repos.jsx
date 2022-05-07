import { Card, Text } from '@mantine/core';

const ReposCard = ({ repo }) => {
  return (
    <Card sx={{ maxWidth: '40vw' }} shadow="sm">
      <Text weight={800}>Name: {repo.name}</Text>
      <Text weight={800}>Description: {repo.description}</Text>
      <Text weight={800}>Language: {repo.language}</Text>
      <Text weight={800}>Fork Count: {repo.forks}</Text>
    </Card>
  );
};

export default ReposCard;
