interface Class {
  name: string;
  hitDiceValue: number;
  classLevel: number;
}

interface Stats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

interface Item {
  name: string;
  modifier: {
    affectedObject: string;
    affectedValue: string;
    value: number;
  };
}

export interface Defense {
  type: string;
  defense: string;
}

export interface Character {
  name: string;
  level: number;
  hitPoints: number;
  classes: Class[];
  stats: Stats;
  items: Item[];
  defenses: Defense[];
}

export interface CharacterState extends Character {
  tempHitPoints: number;
  maxHitPoints: number;
}
