# DnD Example API

### Available Endpoints
- GET `/character/:id`
  - Returns a character object with the given id
- POST `/character/:id/heal`
  - BODY: `{ "amount": 1 }`
  - Heals the character with the given id by 1 hit point
- POST `/character/:id/damage`
  - BODY: `{ "amount": 1 }`
  - Damages the character with the given id by 1 hit point
- POST `/character/:id/applyTemporaryHitPoints`
  - BODY: `{ "amount": 1 }`
  - Applies 1 temporary hit point the target character with the given id

### Getting Started
- Clone the repository
- Run `pnpm install`
- Run `pnpm start`
- Make requests to `http://localhost:3000`
  - Example: GET `http://localhost:3000/character/briv`
  - Note: Postman export is available in the root of the repository
