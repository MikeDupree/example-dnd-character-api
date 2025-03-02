import { Application, Request, Response } from 'express';
import { applyTempHp, damage, getCharacter, heal } from '../Controllers/Character';

// Note: would normally have a suite of tests for these routes
//       using jest + supertest or similiar but ran out of time

/**
 * Get Character route handler
 */
export const getCharacterHandler = (req: Request, res: Response) => {
  if (!req.params.id) {
    res.status(400).json({ message: 'Character ID is required' });
    return;
  }

  const character = getCharacter(req.params.id);

  if (!character) {
    res.status(404).json({ message: 'Character not found' });
    return;
  }

  res.status(200).json(character);
};

/**
 * Heal Character route handler
 */
export const healCharacterHandler = (req: Request, res: Response) => {
  if (!req.params.id) {
    res.status(400).json({ message: 'Character ID is required' });
    return;
  }

  if (!req.body.amount) {
    res.status(400).json({ message: 'Amount is required' });
    return;
  }

  try {
    heal(req.params.id, req.body.amount);
  } catch (error) {
    // Log the error
    // Note: would use a logger like Winston or Bunyan in a real application
    console.error(error);
    res.status(500).json({ message: error });
    return;
  }
  res.status(200).json({ message: `Successfully healed ${req.params.id} for ${req.body?.amount} hit points` });
};

/**
 * Damage Character route handler
 */
export const damageCharacterHandler = (req: Request, res: Response) => {
  if (!req.params.id) {
    res.status(400).json({ message: 'Character ID is required' });
    return;
  }

  if (!req.body.amount) {
    res.status(400).json({ message: 'Amount is required' });
    return;
  }

  // Additional validation for damage type
  if (!req.body.damageType) {
    res.status(400).json({ message: 'Damage type is required' });
    return;
  }

  try {
    damage(req.params.id, req.body.amount, req.body.damageType);
  } catch (error) {
    // Log the error
    // Note: would use a logger like Winston or Bunyan in a real application
    console.error(error);
    res.status(404).json({ message: error });
    return;
  }

  res.status(200).json({
    message: `Successfully applied ${req.body.damageType} damage to ${req.params.id} for ${req.body?.amount} hit points`,
  });
};

/**
 * Apply Character temporary hit points route handler
 */
export const applyCharacterTempHitPointsHandler = (req: Request, res: Response) => {
  if (!req.params.id) {
    res.status(400).json({ message: 'Character ID is required' });
    return;
  }

  if (!req.body.amount) {
    res.status(400).json({ message: 'Amount is required' });
    return;
  }

  try {
    applyTempHp(req.params.id, req.body.amount);
  } catch (error) {
    // Log the error
    // Note: would use a logger like Winston or Bunyan in a real application
    console.error(error);
    res.status(404).json(error);
    return;
  }

  res.status(200).json({
    message: `Successfully applied ${req.body.id} temporary hit points for ${req.body?.amount} hit points`,
  });
};

export const registerRoutes = (app: Application) => {
  app.get('/character/:id', getCharacterHandler);

  app.post('/character/:id/heal', healCharacterHandler);

  app.post('/character/:id/damage', damageCharacterHandler);

  app.post('/character/:id/applyTempHitPoints', applyCharacterTempHitPointsHandler);
};
