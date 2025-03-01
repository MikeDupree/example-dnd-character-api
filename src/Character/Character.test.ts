import Character from './Character';
import brivCharacterMock from '@/Character/mocks/briv.json';
import { Character as CharacterInterface } from './Character.types';

const DEFAULT_DAMAGE_TYPE = 'bludgeoning';

const testCharacter: CharacterInterface = brivCharacterMock;
const characterId = testCharacter.name;

Character.setCharacter(characterId, testCharacter);

describe('Character module tests', () => {
  afterEach(() => {
    // Reset the character before each test
    Character.setCharacter(characterId, testCharacter);
  });

  it('should create a character', () => {
    const character = Character.getCharacter(characterId);
    expect(character).toBeDefined();
    expect(character?.name).toBe('Briv');
    expect(character?.level).toBe(5);
  });

  it('should damage a character', () => {
    Character.damage(characterId, 5, DEFAULT_DAMAGE_TYPE);
    const character = Character.getCharacter(characterId);
    expect(character?.hitPoints).toBe(20);
  });

  it('should damage a character, accounting for resistance', () => {
    Character.damage(characterId, 5, 'slashing');
    const character = Character.getCharacter(characterId);
    expect(character?.hitPoints).toBe(22);
  });

  it('should damage a character, accounting for immunity', () => {
    Character.damage(characterId, 5, 'fire');
    const character = Character.getCharacter(characterId);
    expect(character?.hitPoints).toBe(25);
  });

  it('should heal a character', () => {
    Character.damage(characterId, 5, DEFAULT_DAMAGE_TYPE);
    let character = Character.getCharacter(characterId);
    expect(character?.hitPoints).toBe(20);
    Character.heal(characterId, 5);
    character = Character.getCharacter(characterId);
    expect(character?.hitPoints).toBe(25);
  });

  it('should apply temp hit points', () => {
    Character.applyTempHp(characterId, 5);
    const character = Character.getCharacter(characterId);
    expect(character?.tempHitPoints).toBe(5);
    expect(character?.hitPoints).toBe(25);
  });

  it('should remove tempHitPoints before hitPoints', () => {
    Character.applyTempHp(characterId, 5);
    Character.damage(characterId, 10, DEFAULT_DAMAGE_TYPE);
    const character = Character.getCharacter(characterId);
    expect(character?.tempHitPoints).toBe(0);
    expect(character?.hitPoints).toBe(20);
  });

  it('should not allow hitPoints to be negative', () => {
    Character.damage(characterId, 100, DEFAULT_DAMAGE_TYPE);
    const character = Character.getCharacter(characterId);
    expect(character?.tempHitPoints).toBe(0);
    expect(character?.hitPoints).toBe(0);
  });

  it('should not allow healing past maxHitPoints', () => {
    Character.heal(characterId, 100);
    const character = Character.getCharacter(characterId);
    expect(character?.hitPoints).toBe(character?.maxHitPoints);
  });
});
