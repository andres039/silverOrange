import { Router, Request, Response } from 'express';
import axios from 'axios'
import jsonRepos from '../../data/repos.json'


export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  const getRepos = async () => await axios('https://api.github.com/users/silverorange/repos')
  const onlineReposResponse = await getRepos()
  const onlineRepos = await onlineReposResponse.data
  
  res.json(onlineRepos.concat(jsonRepos));
});
