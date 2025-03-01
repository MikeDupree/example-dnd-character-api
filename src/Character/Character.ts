import { Character, CharacterState, Defense } from '@/Character/Character.types';

const characterState: Map<string, CharacterState> = new Map();

// Get a character from the state
const getCharacter = (characterId: string): CharacterState | undefined => {
  return characterState.get(characterId);
};

// Set a character in the state
const setCharacter = (characterId: string, character: Character): void => {
  characterState.set(characterId, {
    ...character,
    tempHitPoints: 0,
    maxHitPoints: character.hitPoints,
  });
};

// Heal a character by a given amount
const heal = (characterId: string, amount: number): void => {
  const character = getCharacter(characterId);

  if (!character) {
    throw new Error('Character not found');
  }

  const newHp = character.hitPoints + amount;
  character.hitPoints = Math.min(newHp, character.maxHitPoints);
};

// Apply temporary hit points to a character
const applyTempHp = (characterId: string, amount: number): void => {
  const character = getCharacter(characterId);

  if (!character) {
    throw new Error('Character not found');
  }

  character.tempHitPoints = Math.max(amount, character.tempHitPoints);
};

type DamageTypes =
  | 'bludgeoning'
  | 'piercing'
  | 'slashing'
  | 'fire'
  | 'cold'
  | 'lightning'
  | 'thunder'
  | 'poison'
  | 'acid'
  | 'psychic'
  | 'necrotic'
  | 'radiant'
  | 'force';

// Get the strongest defense for a given damage type
// Note: Could break out damage / defense logic into separate modules for better separation of concerns
const getDefenseByType = (defenses: Defense[], type: string): Defense | undefined => {
  const defensePriority: { [key: string]: number } = {
    immunity: 3,
    resistance: 2,
    vulnerable: 1,
    normal: 0,
  };

  let strongestDefense: Defense | undefined;

  for (const defense of defenses) {
    if (defense.type === type) {
      if (!strongestDefense) {
        strongestDefense = defense;
      } else if (defensePriority[defense.defense] > defensePriority[strongestDefense.defense]) {
        strongestDefense = defense;
      }
    }
  }

  return strongestDefense;
};

// Get Damage amount after applying defenses
const getDamageAfterDefense = (damageAmount: number, defense?: Defense): number => {
  if (defense) {
    switch (defense.defense) {
      case 'immunity':
        return 0;
      case 'resistance':
        return Math.ceil(damageAmount / 2);
      case 'vulnerable':
        return (damageAmount *= 2);
    }
  }
  return damageAmount;
};

// Apply damage to a character
const damage = (characterId: string, amount: number, type: DamageTypes): void => {
  const character = getCharacter(characterId);

  if (!character) {
    throw new Error('Character not found');
  }

  const defense = getDefenseByType(character.defenses, type);
  let damageToApply = getDamageAfterDefense(amount, defense);

  // Check for temporary hit points, apply damage to those first
  if (character.tempHitPoints > 0) {
    const tempDamage = Math.min(damageToApply, character.tempHitPoints);
    character.tempHitPoints -= tempDamage;
    damageToApply -= tempDamage;
  }

  // Apply remaining damage to hit points
  character.hitPoints = Math.max(character.hitPoints - damageToApply, 0);
};

export default {
  getCharacter,
  setCharacter,
  heal,
  applyTempHp,
  damage,
};
