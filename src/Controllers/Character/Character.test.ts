import { setCharacter, getCharacter, heal, damage, applyTempHp } from './Character';
import { Character } from './Character.types';
import brivCharacterMock from './mocks/briv.json';

const DEFAULT_DAMAGE_TYPE = 'bludgeoning';

const testCharacter: Character = brivCharacterMock;
const characterId = testCharacter.name;

setCharacter(characterId, testCharacter);

describe('Character module tests', () => {
  afterEach(() => {
    // Reset the character before each test
    setCharacter(characterId, testCharacter);
  });

  it('should create a character', () => {
    const character = getCharacter(characterId);
    expect(character).toBeDefined();
    expect(character?.name).toBe('Briv');
    expect(character?.level).toBe(5);
  });

  it('should damage a character', () => {
    damage(characterId, 5, DEFAULT_DAMAGE_TYPE);
    const character = getCharacter(characterId);
    expect(character?.hitPoints).toBe(20);
  });

  it('should damage a character, accounting for resistance', () => {
    damage(characterId, 5, 'slashing');
    const character = getCharacter(characterId);
    expect(character?.hitPoints).toBe(22);
  });

  it('should damage a character, accounting for immunity', () => {
    damage(characterId, 5, 'fire');
    const character = getCharacter(characterId);
    expect(character?.hitPoints).toBe(25);
  });

  it('should heal a character', () => {
    damage(characterId, 5, DEFAULT_DAMAGE_TYPE);
    let character = getCharacter(characterId);
    expect(character?.hitPoints).toBe(20);
    heal(characterId, 5);
    character = getCharacter(characterId);
    expect(character?.hitPoints).toBe(25);
  });

  it('should apply temp hit points', () => {
    applyTempHp(characterId, 5);
    const character = getCharacter(characterId);
    expect(character?.tempHitPoints).toBe(5);
    expect(character?.hitPoints).toBe(25);
  });

  it('should remove tempHitPoints before hitPoints', () => {
    applyTempHp(characterId, 5);
    damage(characterId, 10, DEFAULT_DAMAGE_TYPE);
    const character = getCharacter(characterId);
    expect(character?.tempHitPoints).toBe(0);
    expect(character?.hitPoints).toBe(20);
  });

  it('should not allow hitPoints to be negative', () => {
    damage(characterId, 100, DEFAULT_DAMAGE_TYPE);
    const character = getCharacter(characterId);
    expect(character?.tempHitPoints).toBe(0);
    expect(character?.hitPoints).toBe(0);
  });

  it('should not allow healing past maxHitPoints', () => {
    heal(characterId, 100);
    const character = getCharacter(characterId);
    expect(character?.hitPoints).toBe(character?.maxHitPoints);
  });
});
