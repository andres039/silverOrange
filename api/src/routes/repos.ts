import { Router, Request, Response } from 'express';
import axios from 'axios';
import jsonRepos from '../../data/repos.json';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!

  async function getData() {
    try {
      const response = await axios.get(`${process.env.URL}`);
      return response.data
    } catch (error) {
      console.error(error);
    }
  }
  const data = await getData()
  const combinedRepos = data.concat(jsonRepos);
  const filteredRepos = combinedRepos.filter((repo: any) => !repo.fork);
  res.json(filteredRepos);
});
