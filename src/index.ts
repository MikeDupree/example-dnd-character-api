import express from 'express';
import { registerRoutes } from './Routes';

// set the mock character for manual testing
import { brivCharacterMock, setCharacter } from './Controllers/Character';
setCharacter(brivCharacterMock.name, brivCharacterMock);

const app = express();
const port = 3000;

app.use(express.json());

registerRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
