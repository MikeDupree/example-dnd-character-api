import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('I AM ALIVE!');
});

app.get('/character/:id', (req: Request, res: Response) => {
  // @TODO Call the get function from the Character module
  const character = {};
  res.send(character);
});

app.post('/character/:id/heal', (req: Request, res: Response) => {
  // @TODO Call the heal function from the Character module
  res.send(`Successfully healed ${req.body.id} for ${req.body.amount} hit points`);
});

app.post('/character/:id/damage', (req: Request, res: Response) => {
  // @TODO Call the damage function from the Character module
  res.send(`Successfully healed ${req.body.id} for ${req.body.amount} hit points`);
});

app.post('/character/:id/temporayHitPoint', (req: Request, res: Response) => {
  // @TODO Call the temporayHitPoint function from the Character module
  res.send(`Successfully healed ${req.body.id} for ${req.body.amount} hit points`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
