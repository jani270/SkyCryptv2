import * as helper from "$lib/server/helper";
import { SYMBOLS } from "$lib/shared/constants/stats";
import type { Crystal, HotmItemData, NodeData, Skill } from "$types/global";

const UPGRADE_TYPES = {
  mithril_powder: {
    name: "Mithril Powder",
    color: "2"
  },
  gemstone_powder: {
    name: "Gemstone Powder",
    color: "d"
  },
  token_of_the_mountain: {
    name: "Token of the Mountain",
    color: "5"
  },
  free: {
    name: "FREE",
    color: "a"
  },
  glacite_powder: {
    name: "Glacite Powder",
    color: "b"
  }
} as Record<string, { name: string; color: string }>;

const rewards = {
  hotm: {
    1: {
      token_of_the_mountain: 1,
      skyblock_experience: 35
    },
    2: {
      token_of_the_mountain: 2,
      access_to_forge: 0,
      new_forgeable_items: 0,
      skyblock_experience: 45
    },
    3: {
      token_of_the_mountain: 2,
      forge_slot: 1,
      new_forgeable_items: 0,
      access_crystal_hollows: 0,
      emissary_braum_crystal_hollows: 0,
      skyblock_experience: 60
    },
    4: {
      token_of_the_mountain: 2,
      forge_slot: 1,
      new_forgeable_items: 0,
      skyblock_experience: 75
    },
    5: {
      token_of_the_mountain: 2,
      new_forgeable_items: 0,
      skyblock_experience: 90
    },
    6: {
      token_of_the_mountain: 2,
      new_forgeable_items: 0,
      skyblock_experience: 100
    },
    7: {
      token_of_the_mountain: 3,
      new_forgeable_items: 0,
      skyblock_experience: 130
    },
    8: {
      token_of_the_mountain: 2,
      new_forgeable_items: 0,
      skyblock_experience: 180
    },
    9: {
      token_of_the_mountain: 2,
      new_forgeable_items: 0,
      skyblock_experience: 210
    },
    10: {
      token_of_the_mountain: 2,
      new_forgeable_items: 0,
      skyblock_experience: 240
    }
  } as Record<number, Record<string, number>>,
  potm: {
    1: {
      pickaxe_ability_level: 1,
      token_of_the_mountain: 1,
      skyblock_experience: 25
    },
    2: {
      forge_slot: 1,
      skyblock_experience: 35
    },
    3: {
      commission_slot: 1,
      skyblock_experience: 50
    },
    4: {
      mithril_powder_when_mining_mithril: 1,
      skyblock_experience: 65
    },
    5: {
      token_of_the_mountain: 1,
      skyblock_experience: 75
    },
    6: {
      gemstone_powder_when_mining_gemstones: 2,
      skyblock_experience: 100
    },
    7: {
      token_of_the_mountain: 1,
      skyblock_experience: 125
    },
    8: {
      glacite_powder_when_mining_glacite: 3,
      skyblock_experience: 150
    },
    9: {
      chance_for_glacite_mineshaft_to_spawn: "10%",
      skyblock_experience: 175
    },
    10: {
      token_of_the_mountain: 2,
      skyblock_experience: 200
    }
  } as Record<number, Record<string, number | string>>,
  rewards: {
    token_of_the_mountain: {
      formatted: "§5Token of the Mountain",
      qtyColor: "5"
    },
    access_to_forge: {
      formatted: "§eAccess to the Forge",
      qtyColor: "e"
    },
    new_forgeable_items: {
      formatted: "§eNew Forgeable Items",
      qtyColor: "e"
    },
    forge_slot: {
      formatted: "§aForge Slot",
      qtyColor: "a"
    },
    access_crystal_hollows: {
      formatted: "§dAccess to the §5Crystal Hollows",
      qtyColor: "d"
    },
    emissary_braum_crystal_hollows: {
      formatted: "§eEmissary Braum §f- §bCrystal Hollows",
      qtyColor: "e"
    },
    pickaxe_ability_level: {
      formatted: "§cPickaxe Ability Level",
      qtyColor: "c"
    },
    commission_slot: {
      formatted: "§aCommission Slot",
      qtyColor: "a"
    },
    mithril_powder_when_mining_mithril: {
      formatted: "§2Base Mithril Powder §7when mining §fMithril",
      qtyColor: "2"
    },
    gemstone_powder_when_mining_gemstones: {
      formatted: "§dBase Gemstone Powder §7when mining §dGemstones",
      qtyColor: "d"
    },
    skyblock_experience: {
      formatted: "§bSkyblock XP",
      qtyColor: "b"
    },
    glacite_powder_when_mining_glacite: {
      formatted: "§bBase Glacite Powder §7when mining §bGlacite",
      qtyColor: "b"
    },
    chance_for_glacite_mineshaft_to_spawn: {
      formatted: "§achance §bfor Glacite Mineshaft §7to spawn.",
      qtyColor: "a"
    }
  } as Record<string, { formatted: string; qtyColor: string }>
};

const nodeNames = {
  mining_speed_2: "Mining Speed II",
  powder_buff: "Powder Buff",
  mining_fortune_2: "Mining Fortune II",
  vein_seeker: "Vein Seeker",
  lonesome_miner: "Lonesome Miner",
  professional: "Professional",
  mole: "Mole",
  fortunate: "Fortunate",
  great_explorer: "Great Explorer",
  maniac_miner: "Maniac Miner",
  goblin_killer: "Goblin Killer",
  special_0: "Peak of the Mountain",
  star_powder: "Star Powder",
  daily_effect: "Sky Mall",
  mining_madness: "Mining Madness",
  mining_experience: "Seasoned Mineman",
  efficient_miner: "Efficient Miner",
  experience_orbs: "Orbiter",
  front_loaded: "Front Loaded",
  precision_mining: "Precision Mining",
  random_event: "Luck of the Cave",
  daily_powder: "Daily Powder",
  fallen_star_bonus: "Crystallized",
  mining_speed_boost: "Mining Speed Boost",
  titanium_insanium: "Titanium Insanium",
  mining_fortune: "Mining Fortune",
  forge_time: "Quick Forge",
  pickaxe_toss: "Pickobulus",
  mining_speed: "Mining Speed",
  gemstone_infusion: "Gemstone Infusion",
  gifts_from_the_departed: "Gifts from the Departed",
  frozen_solid: "Frozen Solid",
  hungry_for_more: "Dead Man's Chest",
  excavator: "Excavator",
  rags_of_riches: "Rags of Riches",
  hazardous_miner: "Hazardous Miner",
  surveyor: "Surveyor",
  subzero_mining: "SubZero Mining",
  eager_adventurer: "Eager Adventurer",
  keen_eye: "Keen Eye",
  warm_hearted: "Warm Hearted",
  dust_collector: "Dust Collector",
  daily_grind: "Daily Grind",
  strong_arm: "Strong Arm",
  no_stone_unturned: "No Stone Unturned",
  mineshaft_mayhem: "Mineshaft Mayhem"
} as Record<string, string>;

/*
.##.....##..#######..########.##.....##
.##.....##.##.....##....##....###...###
.##.....##.##.....##....##....####.####
.#########.##.....##....##....##.###.##
.##.....##.##.....##....##....##.....##
.##.....##.##.....##....##....##.....##
.##.....##..#######.....##....##.....##
*/

class HotM {
  tier: number;
  level: number;
  progress: number;
  levelWithProgress: number;
  xp: number;
  xpCurrent: number;
  xpForNext: number;
  constructor(tier: number, level: Skill) {
    this.tier = tier;
    this.level = level.level;
    this.progress = level.progress;
    this.levelWithProgress = level.levelWithProgress;
    this.xp = level.xp;
    this.xpCurrent = level.xpCurrent;
    this.xpForNext = level.xpForNext;
  }

  get lore() {
    const output = [];

    // name
    output.push(this.displayName, "");

    // main
    if (this.status === "unlocked") {
      output.push("§7You have unlocked this tier. All perks and abilities on this tier are available for unlocking with §5Token of the Mountain§7.", "");
    } else {
      output.push("§7Progress through your Heart of the Mountain by gaining §5HotM Exp§7, which is earned through completing §aCommissions§7.", "", "§7Commissions are tasks given by the §e§lKing§r§7 in the §bRoyal Palace§7. Complete them to earn bountiful rewards!", "");
    }

    // progress
    if (this.status === "next") {
      const progress = helper.round(this.progress * 100);
      const greenBars = helper.ceil(progress / 5);
      const whiteBars = 20 - greenBars;
      output.push(`§7Progress: §e${progress}%`, `${"§2-".repeat(greenBars)}${"§f-".repeat(whiteBars)} §e${this.xpCurrent.toLocaleString()} §6/ §e${this.xpForNext.toLocaleString()}`, "");
    }

    // rewards
    output.push("§7Rewards");
    for (const [reward, qty] of Object.entries(rewards.hotm[this.tier])) {
      const quantity = qty > 0 ? `§${rewards.rewards[reward].qtyColor}${qty} ` : "";
      const name = rewards.rewards[reward].formatted;
      output.push(`§8+ ${quantity}${name}`);
    }
    output.push("");

    // status
    output.push(this.status === "unlocked" ? "§aUNLOCKED" : "§cLOCKED");

    return output;
  }

  get displayName() {
    const color = this.status === "unlocked" ? "a" : this.status === "next" ? "e" : "c";
    return `§${color}Tier ${this.tier}`;
  }

  get status() {
    if (this.tier <= this.level) {
      return "unlocked";
    }

    if (this.tier === helper.ceil(this.levelWithProgress)) {
      return "next";
    }

    return "locked";
  }

  get itemData() {
    const data = {
      locked: "160:14",
      next: "160:4",
      unlocked: "160:5"
    };

    return {
      id: parseInt(data[this.status].split(":")[0], 10),
      Damage: parseInt(data[this.status].split(":")[1], 10),
      glowing: false
    };
  }

  get position10x9() {
    return 9 * (HOTM.tiers - this.tier) + 1;
  }
}

/*
.##....##..#######..########..########..######.
.###...##.##.....##.##.....##.##.......##....##
.####..##.##.....##.##.....##.##.......##......
.##.##.##.##.....##.##.....##.######....######.
.##..####.##.....##.##.....##.##.............##
.##...###.##.....##.##.....##.##.......##....##
.##....##..#######..########..########..######.
*/

class Node {
  nodeType: string;
  level: number;
  enabled: boolean;
  nodes: Record<string, number>;
  hotmTier: number;
  potmLevel: number;
  selectedPickaxeAbility: string;
  position: number;
  id: string;
  max_level: number;
  upgrade_type: string | null;
  requires: string[];
  name: string;
  positionType: string;
  constructor(data: NodeData) {
    this.nodeType = "normal";
    this.level = data.level;
    this.enabled = data.enabled;
    this.nodes = data.nodes;
    this.hotmTier = data.hotmLevelData.level;
    this.potmLevel = data.nodes.special_0;
    this.selectedPickaxeAbility = data.selectedPickaxeAbility;
    this.position = data.position;
    this.id = data.id;
    this.max_level = data.max_level;
    this.upgrade_type = data.upgrade_type;
    this.requires = data.requires;
    this.name = nodeNames[this.id];
    this.positionType = data.positionType;
  }

  get position10x9() {
    return (this.position ?? 0) + 1;
  }

  get itemData() {
    const data = {
      normal: {
        locked: "263:0",
        unlocked: "388:0",
        maxed: "264:0"
      },
      pickaxe_ability: {
        locked: "173:0",
        unlocked: "133:0",
        maxed: "133:0"
      },
      special: {
        locked: "7:0",
        unlocked: "152:0",
        maxed: "152:0"
      }
    } as Record<string, Record<string, string>>;

    return {
      id: parseInt(data[this.nodeType][this.status].split(":")[0], 10),
      Damage: parseInt(data[this.nodeType][this.status].split(":")[1], 10),
      glowing: this.selectedPickaxeAbility === this.id
    };
  }

  get lore() {
    const output = [];

    // Name
    output.push(this.displayName);

    // Level
    if (this.max_level > 1) {
      if (this.maxed) {
        output.push(`§7Level ${Math.max(1, this.level)}`);
      } else {
        output.push(`§7Level ${Math.max(1, this.level)}§8/${this.max_level}`);
      }
    }
    output.push("");

    // Perk
    output.push(...this.perk(Math.max(1, this.level)));

    // Upgradeable
    if (this.level > 0 && this.level < this.max_level) {
      // header
      output.push("", "§a=====[ §a§lUPGRADE §a] =====");

      // upgrade perk
      output.push(`§7Level ${this.level + 1}§8/${this.max_level}`, "", ...this.perk(this.level + 1));

      // upgrade cost
      if (this.upgrade_type !== null) {
        output.push("", "§7Cost", `§${UPGRADE_TYPES[this.upgrade_type].color}${this.upgradeCost.toLocaleString()} ${UPGRADE_TYPES[this.upgrade_type].name}`);
      }
    }

    // Maxed perk
    if (this.maxed && this.nodeType !== "pickaxe_ability") {
      output.push("", "§aUNLOCKED");
    }

    // Unlock cost
    if (this.level === 0) {
      output.push("", "§7Cost");
      for (const [upgradeId, upgradeQty] of Object.entries(this.unlockCost)) {
        output.push(`§${UPGRADE_TYPES[upgradeId].color}${upgradeQty > 0 ? `${upgradeQty} ` : ""}${UPGRADE_TYPES[upgradeId].name}`);
      }
    }

    // Requirements
    if (this.level === 0) {
      if (this.requires.length > 0 && !this.requires.some((x) => Object.keys(this.nodes).includes(x))) {
        const reqs = this.requires.map((x) => nodeNames[x]);
        const reqsFriendly = reqs.length > 1 ? reqs.slice(0, -1).join(", ") + " or " + reqs.slice(-1) : reqs[0];
        output.push("", `§cRequires ${reqsFriendly}.`);
      }

      if (this.requiredHotmTier > this.hotmTier) {
        output.push("", `§cRequires HotM Tier ${this.requiredHotmTier}.`);
      }
    }

    // Status
    if (this.level > 0 && this.nodeType === "normal") {
      output.push("", this.enabled ? "§aENABLED" : "§cDISABLED");
    }

    // Selected Pickaxe Ability
    if (this.level > 0 && this.nodeType === "pickaxe_ability") {
      if (this.selectedPickaxeAbility === this.id) {
        output.push("", "§aSELECTED");
      } else {
        output.push("", "§eClick to select!");
      }
    }

    return output.map((x) => "§r" + x);
  }

  get pickaxeAbilityLevel() {
    // Blue Omelette gives +1 level, impossible to account for in here
    let level = 1;

    if (this.potmLevel >= 1) {
      level += 1;
    }

    return level;
  }

  get requiredHotmTier() {
    return Math.abs(helper.ceil(this.position / 7) - 7) + 1;
  }

  get unlockCost() {
    return {
      token_of_the_mountain: 1
    };
  }

  get displayName() {
    const nameColor = this.status === "maxed" ? "a" : this.status === "unlocked" ? "e" : "c";
    return `§${nameColor}§l${this.name}`;
  }

  get status() {
    if (this.level === this.max_level) {
      return "maxed";
    }

    if (this.level === 0) {
      return "locked";
    }

    return "unlocked";
  }

  get maxed() {
    return this.level === this.max_level;
  }

  get upgradeCost() {
    return -1;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  perk(level: number) {
    return ["Missing perk description."];
  }

  get totalUpgradeCost() {
    let total = 0;
    const originalLevel = this.level;

    for (let level = 1; level < this.max_level; level++) {
      this.level = level;
      total += this.upgradeCost;
    }

    this.level = originalLevel;

    return total;
  }
}

class MiningSpeed2 extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "mining_speed_2";
    this.name = nodeNames[this.id];
    this.position = 29;
    this.max_level = 50;
    this.upgrade_type = "gemstone_powder";
    this.requires = ["lonesome_miner"];
    this.positionType = "vertical_line";
  }

  get upgradeCost() {
    const nextLevel = this.level + 1;
    return helper.floor(Math.pow(nextLevel + 1, 3.2));
  }

  perk(level: number) {
    const val = level * 40;
    return [`§7Grants §a+${val} §6${SYMBOLS.mining_speed} Mining Speed§7.`];
  }
}

class PowderBuff extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "powder_buff";
    this.name = nodeNames[this.id];
    this.position = 31;
    this.max_level = 50;
    this.upgrade_type = "gemstone_powder";
    this.requires = ["mole"];
    this.positionType = "vertical_line";
  }

  get upgradeCost() {
    const nextLevel = this.level + 1;
    return helper.floor(Math.pow(nextLevel + 1, 3.2));
  }

  perk(level: number) {
    const val = level * 1;
    return [`§7Gain §a${val}% §7more Mithril Powder and Gemstone Powder.`];
  }
}

class MiningFortune2 extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "mining_fortune_2";
    this.name = nodeNames[this.id];
    this.position = 33;
    this.max_level = 50;
    this.upgrade_type = "gemstone_powder";
    this.requires = ["great_explorer"];
    this.positionType = "vertical_line";
  }

  get upgradeCost() {
    const nextLevel = this.level + 1;
    return helper.floor(Math.pow(nextLevel + 1, 3.2));
  }

  perk(level: number) {
    const val = level * 5;
    return [`§7Grants §a+${val} §6${SYMBOLS.mining_fortune} Mining Fortune§7.`];
  }
}

class VeinSeeker extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "vein_seeker";
    this.name = nodeNames[this.id];
    this.position = 37;
    this.max_level = 1;
    this.upgrade_type = null;
    this.requires = ["lonesome_miner"];
    this.nodeType = "pickaxe_ability";
    this.positionType = "right_ability";
  }

  get upgradeCost() {
    return 0;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  perk(level: number) {
    const spread = [2, 3, 4][this.pickaxeAbilityLevel - 1];
    const duration = [12, 14, 16][this.pickaxeAbilityLevel - 1];
    const cooldown = [60, 60, 60][this.pickaxeAbilityLevel - 1];
    return ["§6Pickaxe Ability: Vein Seeker", `§7Points in the direction of the nearest vein and grants §a+${spread} §6Mining Spread §7for §a${duration}s§7.`, `§8Cooldown: §a${cooldown}s`, "", "§8Pickaxe Abilities apply to all of your pickaxes. You can select a Pickaxe Ability from your Heart of the Mountain.", "", "§8Upgrade your Pickaxe Abilities by unlocking §cPeak of the Mountain §8in this menu!"];
  }
}

class LonesomeMiner extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "lonesome_miner";
    this.name = nodeNames[this.id];
    this.position = 38;
    this.max_level = 45;
    this.upgrade_type = "gemstone_powder";
    this.requires = ["goblin_killer", "professional"];
    this.positionType = "cross";
  }

  get upgradeCost() {
    const nextLevel = this.level + 1;
    return helper.floor(Math.pow(nextLevel + 1, 3.07));
  }

  perk(level: number) {
    const val = helper.round(5 + (level - 1) * 0.5);
    return [`§7Increases §c${SYMBOLS.strength} Strength, §9${SYMBOLS.crit_chance} Crit Chance, §9${SYMBOLS.crit_damage} Crit Damage, §a${SYMBOLS.defense} Defense, and §c${SYMBOLS.health} Health §7statistics gain by §a${val}% §7while in the Crystal Hollows.`];
  }
}

class Professional extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "professional";
    this.name = nodeNames[this.id];
    this.position = 39;
    this.max_level = 140;
    this.upgrade_type = "gemstone_powder";
    this.requires = ["mole", "lonesome_miner"];
    this.positionType = "horizontal_line";
  }

  get upgradeCost() {
    const nextLevel = this.level + 1;
    return helper.floor(Math.pow(nextLevel + 1, 2.3));
  }

  perk(level: number) {
    const val = 50 + level * 5;
    return [`§7Gain §a+${val}§7 §6${SYMBOLS.mining_speed} Mining Speed§7 when mining Gemstones.`];
  }
}

class Mole extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "mole";
    this.name = nodeNames[this.id];
    this.position = 40;
    this.max_level = 190;
    this.upgrade_type = "gemstone_powder";
    this.requires = ["efficient_miner", "professional", "fortunate"];
    this.positionType = "cross";
  }

  get upgradeCost() {
    const nextLevel = this.level + 1;
    return helper.floor(Math.pow(nextLevel + 1, 2.2));
  }

  perk(level: number) {
    const chance = 50 + (level - 1) * 5;
    let blocks = 1 + helper.floor(chance / 100);
    let percent = chance - helper.floor(chance / 100) * 100;
    if (percent === 0) {
      blocks -= 1;
      percent = 100;
    }

    return [`§7When mining hard stone, you have a §a${percent}%§7 chance to mine §a${blocks}§7 adjacent hard stone block.`];
  }
}

class Fortunate extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "fortunate";
    this.name = nodeNames[this.id];
    this.position = 41;
    this.max_level = 20;
    this.upgrade_type = "mithril_powder";
    this.requires = ["mole", "great_explorer"];
    this.positionType = "horizontal_line";
  }

  get upgradeCost() {
    const nextLevel = this.level + 1;
    return helper.floor(Math.pow(nextLevel + 1, 3.05));
  }

  perk(level: number) {
    const val = 20 + level * 4;
    return [`§7Grants §a+${val}§7 §6${SYMBOLS.mining_fortune} Mining Fortune§7 when mining Gemstone.`];
  }
}

class GreatExplorer extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "great_explorer";
    this.name = nodeNames[this.id];
    this.position = 42;
    this.max_level = 20;
    this.upgrade_type = "gemstone_powder";
    this.requires = ["star_powder", "fortunate"];
    this.positionType = "cross";
  }

  get upgradeCost() {
    const nextLevel = this.level + 1;
    return helper.floor(Math.pow(nextLevel + 1, 4));
  }

  perk(level: number) {
    const perc = 20 + (level - 1) * 4;
    const val = 1 + helper.floor(level / 5);
    return [`§7Boosts the chance to find treasure chests while mining in the §5Crystal Hollows §7by §a${perc}% §7and reduces the amount of locks on the chest by §a${val}§7.`];
  }
}

class ManiacMiner extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "maniac_miner";
    this.name = nodeNames[this.id];
    this.position = 43;
    this.max_level = 1;
    this.upgrade_type = null;
    this.requires = ["great_explorer"];
    this.nodeType = "pickaxe_ability";
    this.positionType = "left_ability";
  }

  get upgradeCost() {
    return 0;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  perk(level: number) {
    const speed = [1, 1, 1][this.pickaxeAbilityLevel - 1];
    const duration = [10, 15, 20][this.pickaxeAbilityLevel - 1];
    const cooldown = [60, 59, 59][this.pickaxeAbilityLevel - 1];
    return ["§6Pickaxe Ability: Maniac Miner", `§7Spends all your Mana and grants §a+${speed} §6${SYMBOLS.mining_speed} Mining Speed §7for every 10 Mana spent, for §a${duration}s§7.`, `§8Cooldown: §a${cooldown}s`, "", "§8Pickaxe Abilities apply to all of your pickaxes. You can select a Pickaxe Ability from your Heart of the Mountain.", "", "§8Upgrade your Pickaxe Abilities by unlocking §cPeak of the Mountain §8in this menu!"];
  }
}

class GoblinKiller extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "goblin_killer";
    this.name = nodeNames[this.id];
    this.position = 47;
    this.max_level = 1;
    this.upgrade_type = null;
    this.requires = ["mining_madness", "lonesome_miner"];
    this.positionType = "vertical_line";
  }

  get upgradeCost() {
    return 0;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  perk(level: number) {
    return [`§7Killing a §6Golden Goblin §7or §bDiamond Goblin §7gives §2200 §7extra §2Mithril Powder§7, while killing other Goblins gives some based on their wits.`];
  }
}

class PeakOfTheMountain extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "special_0";
    this.name = nodeNames[this.id];
    this.position = 49;
    this.max_level = 10;
    this.upgrade_type = data.level >= 5 ? "gemstone_powder" : "mithril_powder";
    this.requires = ["efficient_miner"];
    this.nodeType = "special";
    this.positionType = "peak_of_the_mountain";
  }

  get upgradeCost() {
    const nextLevel = this.level + 1;
    return nextLevel <= 5 ? helper.floor(25000 * nextLevel) : helper.floor(500000 + 250000 * (nextLevel - 6));
  }

  perk(level: number) {
    const output = [];

    const baseTier = level > this.level ? level : 1;

    for (let tier = baseTier; tier <= level; tier++) {
      for (const [reward, qty] of Object.entries(rewards.potm[tier] ?? {})) {
        const qtyColor = rewards.rewards[reward].qtyColor;
        const formatted = rewards.rewards[reward].formatted;
        output.push(`§8+ §${qtyColor}${qty} ${formatted}`);
      }
    }

    return output;
  }

  get unlockCost() {
    return {
      token_of_the_mountain: 0
    };
  }
}

class StarPowder extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "star_powder";
    this.name = nodeNames[this.id];
    this.position = 51;
    this.max_level = 1;
    this.upgrade_type = null;
    this.requires = ["front_loaded", "great_explorer"];
    this.positionType = "vertical_line";
  }

  get upgradeCost() {
    return 0;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  perk(level: number) {
    return [`§7Mining Mithril Ore near §5Fallen Crystals §7gives §a3x §7Mithril Powder.`];
  }
}

class SkyMall extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "daily_effect";
    this.name = nodeNames[this.id];
    this.position = 55;
    this.max_level = 1;
    this.upgrade_type = null;
    this.requires = ["mining_madness"];
    this.positionType = "left_perk";
  }

  get upgradeCost() {
    return 0;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  perk(level: number) {
    return ["§7Every SkyBlock day, you receive a random buff in the §2Dwarven Mines§7.", "", "§7Possible Buffs", `§8 ■ §7Gain §a+100 §6${SYMBOLS.mining_speed} Mining Speed§7.`, `§8 ■ §7Gain §a+50 §6${SYMBOLS.mining_fortune} Mining Fortune§7.`, "§8 ■ §7Gain §a+15% §7chance to gain extra Powder while mining.", "§8 ■ §7Reduce Pickaxe Ability cooldown by §a20%§7.", "§8 ■ §7§a10x §7chance to find Goblins while mining.", "§8 ■ §7Gain §a5x §9Titanium §7drops."];
  }
}

class MiningMadness extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "mining_madness";
    this.name = nodeNames[this.id];
    this.position = 56;
    this.max_level = 1;
    this.upgrade_type = null;
    this.requires = ["random_event", "mining_experience", "goblin_killer"];
    this.positionType = "cross";
  }

  get upgradeCost() {
    return 0;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  perk(level: number) {
    return [`§7Grants §a+50 §6${SYMBOLS.mining_speed} Mining Speed §7and §6${SYMBOLS.mining_fortune} Mining Fortune§7.`];
  }
}

class SeasonedMineman extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "mining_experience";
    this.name = nodeNames[this.id];
    this.position = 57;
    this.max_level = 100;
    this.upgrade_type = "mithril_powder";
    this.requires = ["efficient_miner", "mining_madness"];
    this.positionType = "horizontal_line";
  }

  get upgradeCost() {
    const nextLevel = this.level + 1;
    return helper.floor(Math.pow(nextLevel + 1, 2.3));
  }

  perk(level: number) {
    const val = helper.round(5 + level * 0.1, 1);
    return [`§7Increases your Mining experience gain by §a${val}%§7.`];
  }
}

class EfficientMiner extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "efficient_miner";
    this.name = nodeNames[this.id];
    this.position = 58;
    this.max_level = 100;
    this.upgrade_type = "mithril_powder";
    this.requires = ["daily_powder", "mining_experience", "experience_orbs"];
    this.positionType = "cross";
  }

  get upgradeCost() {
    const nextLevel = this.level + 1;
    return helper.floor(Math.pow(nextLevel + 1, 2.6));
  }

  perk(level: number) {
    const val1 = helper.round(10 + level * 0.4, 1);
    const val2 = helper.ceil((level + 1) / 20);
    return [`§7When mining ores, you have a §a${val1}%§7 chance to mine §a${val2} §7adjacent ores.`];
  }
}

class Orbiter extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "experience_orbs";
    this.name = nodeNames[this.id];
    this.position = 59;
    this.max_level = 80;
    this.upgrade_type = "mithril_powder";
    this.requires = ["efficient_miner", "front_loaded"];
    this.positionType = "horizontal_line";
  }

  get upgradeCost() {
    const nextLevel = this.level + 1;
    return helper.floor(70 * nextLevel);
  }

  perk(level: number) {
    const val = helper.round(0.2 + level * 0.01, 2);
    return [`§7When mining ores, you have a §a${val}%§7 chance to get a random amount of experience orbs.`];
  }
}

class FrontLoaded extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "front_loaded";
    this.name = nodeNames[this.id];
    this.position = 60;
    this.max_level = 1;
    this.upgrade_type = null;
    this.requires = ["fallen_star_bonus", "experience_orbs", "star_powder"];
    this.positionType = "cross";
  }

  get upgradeCost() {
    return 0;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  perk(level: number) {
    return [`§7Grants §a+100 §6${SYMBOLS.mining_speed} Mining Speed §7and §6${SYMBOLS.mining_fortune} Mining Fortune §7as well as §a+2 base powder §7for the first §e2,500 §7ores you mine in a day.`];
  }
}

class PrecisionMining extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "precision_mining";
    this.name = nodeNames[this.id];
    this.position = 61;
    this.max_level = 1;
    this.upgrade_type = null;
    this.requires = ["front_loaded"];
    this.positionType = "right_perk";
  }

  get upgradeCost() {
    return 0;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  perk(level: number) {
    return [`§7When mining ore, a particle target appears on the block that increases your §6${SYMBOLS.mining_speed} Mining Speed §7by §a30% §7when aiming at it.`];
  }
}

class LuckOfTheCave extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "random_event";
    this.name = nodeNames[this.id];
    this.position = 65;
    this.max_level = 45;
    this.upgrade_type = "mithril_powder";
    this.requires = ["mining_speed_boost", "mining_madness"];
    this.positionType = "vertical_line";
  }

  get upgradeCost() {
    const nextLevel = this.level + 1;
    return helper.floor(Math.pow(nextLevel + 1, 3.07));
  }

  perk(level: number) {
    const val = 5 + level * 1;
    return [`§7Increases the chance for you to trigger rare occurrences in §2Dwarven Mines §7by §a${val}%§7.`, ``, `§7Rare occurrences include:`, `§8§l· §6Golden Goblins`, `§8§l· §5Fallen Stars`, `§8§l· §6Powder Ghasts`];
  }
}

class DailyPowder extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "daily_powder";
    this.name = nodeNames[this.id];
    this.position = 67;
    this.max_level = 100;
    this.upgrade_type = "mithril_powder";
    this.requires = ["mining_fortune"];
    this.positionType = "vertical_line";
  }

  get upgradeCost() {
    const nextLevel = this.level + 1;
    return helper.floor(182 + 18 * nextLevel);
  }

  perk(level: number) {
    const val = 400 + (level - 1) * 36;
    return [`§7Gain §a${val} Powder §7from the first ore you mine every day. Works for all Powder types.`];
  }
}

class Crystallized extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "fallen_star_bonus";
    this.name = nodeNames[this.id];
    this.position = 69;
    this.max_level = 30;
    this.upgrade_type = "mithril_powder";
    this.requires = ["pickaxe_toss", "front_loaded"];
    this.positionType = "vertical_line";
  }

  get upgradeCost() {
    const nextLevel = this.level + 1;
    return helper.floor(Math.pow(nextLevel + 1, 3.4));
  }

  perk(level: number) {
    const speed = 20 + (level - 1) * 6;
    const fortune = 20 + (level - 1) * 5;
    return [`§7Increases §6${speed} ${SYMBOLS.mining_speed} Mining Speed §7and §6${fortune} ${SYMBOLS.mining_fortune} Mining Fortune §7near §5Fallen Stars§7.`];
  }
}

class MiningSpeedBoost extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "mining_speed_boost";
    this.name = nodeNames[this.id];
    this.position = 74;
    this.max_level = 1;
    this.upgrade_type = null;
    this.requires = ["titanium_insanium", "random_event"];
    this.nodeType = "pickaxe_ability";
    this.positionType = "left_l";
  }

  get upgradeCost() {
    return 0;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  perk(level: number) {
    const effect = [200, 300, 400][this.pickaxeAbilityLevel - 1];
    const duration = [15, 20, 25][this.pickaxeAbilityLevel - 1];
    const cooldown = [120, 120, 120][this.pickaxeAbilityLevel - 1];
    return ["§6Pickaxe Ability: Mining Speed Boost", `§7Grants §a+${effect}% §6${SYMBOLS.mining_speed} Mining Speed §7for §a${duration}s§7.`, `§8Cooldown: §a${cooldown}s`, "", "§8Pickaxe Abilities apply to all of your pickaxes. You can select a Pickaxe Ability from your Heart of the Mountain.", "", "§8Upgrade your Pickaxe Abilities by unlocking §cPeak of the Mountain §8in this menu!"];
  }
}

class TitaniumInsanium extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "titanium_insanium";
    this.name = nodeNames[this.id];
    this.position = 75;
    this.max_level = 50;
    this.upgrade_type = "mithril_powder";
    this.requires = ["mining_fortune", "mining_speed_boost"];
    this.positionType = "horizontal_line";
  }

  get upgradeCost() {
    const nextLevel = this.level + 1;
    return helper.floor(Math.pow(nextLevel + 1, 3.1));
  }

  perk(level: number) {
    const val = helper.round(2 + level * 0.1, 1);
    return [`§7When mining Mithril Ore, you have a §a${val}%§7 chance to convert the block into Titanium Ore.`];
  }
}

class MiningFortune extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "mining_fortune";
    this.name = nodeNames[this.id];
    this.position = 76;
    this.max_level = 50;
    this.upgrade_type = "mithril_powder";
    this.requires = ["mining_speed"];
    this.positionType = "cross";
  }

  get upgradeCost() {
    const nextLevel = this.level + 1;
    return helper.floor(Math.pow(nextLevel + 1, 3.05));
  }

  perk(level: number) {
    const val = level * 5;
    return [`§7Grants §a+${val} §6${SYMBOLS.mining_fortune} Mining Fortune§7.`];
  }
}

class QuickForge extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "forge_time";
    this.name = nodeNames[this.id];
    this.position = 77;
    this.max_level = 20;
    this.upgrade_type = "mithril_powder";
    this.requires = ["mining_fortune", "pickaxe_toss"];
    this.positionType = "horizontal_line";
  }

  get upgradeCost() {
    const nextLevel = this.level + 1;
    return helper.floor(Math.pow(nextLevel + 1, 4));
  }

  perk(level: number) {
    let val = helper.round(10 + 0.5 * level, 1);
    if (level === this.max_level) {
      val = 30;
    }
    return [`§7Decreases the time it takes to forge by §a${val}%§7.`];
  }
}

class Pickobulus extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "pickaxe_toss";
    this.name = nodeNames[this.id];
    this.position = 78;
    this.max_level = 1;
    this.upgrade_type = null;
    this.requires = ["forge_time", "fallen_star_bonus"];
    this.nodeType = "pickaxe_ability";
    this.positionType = "right_l";
  }

  get upgradeCost() {
    return 0;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  perk(level: number) {
    const radius = [2, 2, 3][this.pickaxeAbilityLevel - 1];
    const cooldown = [120, 110, 110][this.pickaxeAbilityLevel - 1];
    return ["§6Pickaxe Ability: Pickobulus", `§7Throw your pickaxe to create an explosion on impact, mining all ores within a §a${radius}§7 block radius.`, `§8Cooldown: §a${cooldown}s`, "", "§8Pickaxe Abilities apply to all of your pickaxes. You can select a Pickaxe Ability from your Heart of the Mountain.", "", "§8Upgrade your Pickaxe Abilities by unlocking §cPeak of the Mountain §8in this menu!"];
  }
}

class MiningSpeed extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "mining_speed";
    this.name = nodeNames[this.id];
    this.position = 85;
    this.max_level = 50;
    this.upgrade_type = "mithril_powder";
    this.requires = [];
    this.positionType = "vertical_line";
  }

  get upgradeCost() {
    const nextLevel = this.level + 1;
    return helper.floor(Math.pow(nextLevel + 1, 3));
  }

  perk(level: number) {
    const val = level * 20;
    return [`§7Grants §a+${val} §6${SYMBOLS.mining_speed} Mining Speed§7.`];
  }
}
class GemstoneInfusion extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "gemstone_infusion";
    this.name = nodeNames[this.id];
    this.position = 1;
    this.max_level = 1;
    this.upgrade_type = null;
    this.requires = ["gifts_from_the_departed"];
    this.nodeType = "pickaxe_ability";
    this.positionType = "right_ability";
  }

  get upgradeCost() {
    return 0;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  perk(level: number) {
    const boost = [50, 50, 50][this.pickaxeAbilityLevel - 1];
    const duration = [16, 16, 16][this.pickaxeAbilityLevel - 1];
    const cooldown = [140, 140, 140][this.pickaxeAbilityLevel - 1];
    return ["§6Pickaxe Ability: Gemstone Infusion", `§7Increases the effectivness of §6every Gemstone §7in your pick's Gemstone Slots by §a${boost}% §7for §a${duration}s.`, `§8Cooldown: §a${cooldown}s`, "", "§8Pickaxe Abilities apply to all of your pickaxes. You can select a Pickaxe Ability from your Heart of the Mountain.", "", "§8Upgrade your Pickaxe Abilities by unlocking §cPeak of the Mountain §8in this menu!"];
  }
}

class GiftsFromTheDeparted extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "gifts_from_the_departed";
    this.name = nodeNames[this.id];
    this.position = 2;
    this.max_level = 100;
    this.upgrade_type = "glacite_powder";
    this.requires = [];
    this.positionType = "top";
  }

  get upgradeCost() {
    const nextLevel = this.level + 1;

    return nextLevel + 1;
  }

  perk(level: number) {
    const val = level * 0.2;

    return [`§7Gain a §a${val}% §7chance to get an extra item when looting a §bFrozen Corpse§7.`];
  }
}

class FrozenSolid extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "frozen_solid";
    this.name = nodeNames[this.id];
    this.position = 3;
    this.max_level = 1;
    this.upgrade_type = "glacite_powder";
    this.requires = [];
    this.positionType = "horizontal_line";
  }

  perk() {
    return [`§7Gain §a2x §bGlacite Powder §7from killing mobs in the §bGlacite Tunnels §7and §bGlacite Mineshafts§7.`];
  }
}

class HungryForMore extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "hungry_for_more";
    this.name = nodeNames[this.id];
    this.position = 4;
    this.max_level = 50;
    this.upgrade_type = "glacite_powder";
    this.requires = [];
    this.positionType = "top";
  }

  get upgradeCost() {
    const nextLevel = this.level + 1;

    return nextLevel + 1;
  }

  perk(level: number) {
    const val = level * 1;

    return [`§7Gain a §a${val}% §7chance to spawn §a1 §7additional §bFrozen Corpse §7when you enter a §bGlacite Mineshaft§7.`];
  }
}

class Excavator extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "excavator";
    this.name = nodeNames[this.id];
    this.position = 5;
    this.max_level = 50;
    this.upgrade_type = "glacite_powder";
    this.requires = [];
    this.positionType = "horizontal_line";
  }

  get upgradeCost() {
    const nextLevel = this.level + 1;

    return nextLevel + 1;
  }

  perk(level: number) {
    const val = level * 0.5;

    return [`§9Suspicious Scraps §7are §a${val}% §7more likely to contain a fossil.`];
  }
}

class RagsOfRiches extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "rags_of_riches";
    this.name = nodeNames[this.id];
    this.position = 6;
    this.max_level = 1;
    this.upgrade_type = "glacite_powder";
    this.requires = [];
    this.positionType = "top";
  }

  perk(level: number) {
    const val = level * 2;

    return [`§7Grants §a+${val} §6${SYMBOLS.mining_fortune} Mining Fortune §7while mining inside a §bGlaite Mineshaft`];
  }
}

class HazardousMiner extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "hazardous_miner";
    this.name = nodeNames[this.id];
    this.position = 7;
    this.max_level = 1;
    this.upgrade_type = null;
    this.requires = [""];
    this.nodeType = "pickaxe_ability";
    this.positionType = "left_ability";
  }

  get upgradeCost() {
    return 0;
  }

  perk() {
    const boost = [40, 40, 40][this.pickaxeAbilityLevel - 1];
    const duration = [16.5, 16.5, 16.5][this.pickaxeAbilityLevel - 1];
    const radius = [20, 20, 20][this.pickaxeAbilityLevel - 1];
    const cooldown = [140, 140, 140][this.pickaxeAbilityLevel - 1];
    return ["§6Pickaxe Ability: Hazardous Miner", `§7Grants §a+${boost} §6${SYMBOLS.mining_speed} Mining Speed §7for §a${duration}s §7for each enemy within §a${radius} §7blocks`, `§8Cooldown: §a${cooldown}s`, "", "§8Pickaxe Abilities apply to all of your pickaxes. You can select a Pickaxe Ability from your Heart of the Mountain.", "", "§8Upgrade your Pickaxe Abilities by unlocking §cPeak of the Mountain §8in this menu!"];
  }
}

class Surveyor extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "surveyor";
    this.name = nodeNames[this.id];
    this.position = 11;
    this.max_level = 20;
    this.upgrade_type = "glacite_powder";
    this.requires = [];
    this.positionType = "vertical_line";
  }

  perk(level: number) {
    const val = level * 0.75;

    return [`§7Increases your chance of finding a §bGlacite Mineshaft §7when mining in the §bGlacite Tunnels §7by §a+${val}%§7.`];
  }
}

class SubzeroMining extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "subzero_mining";
    this.name = nodeNames[this.id];
    this.position = 13;
    this.max_level = 100;
    this.upgrade_type = "glacite_powder";
    this.requires = [];
    this.positionType = "vertical_line";
  }

  perk(level: number) {
    const val = level * 1;

    return [`§7Grants §a+${val} §6${SYMBOLS.mining_fortune} Mining Fortune §7when mining §bGlacite§7.`];
  }
}

class EagerAdventurer extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "eager_adventurer";
    this.name = nodeNames[this.id];
    this.position = 15;
    this.max_level = 50;
    this.upgrade_type = "glacite_powder";
    this.requires = [];
    this.positionType = "vertical_line";
  }

  perk(level: number) {
    const val = level * 2;

    return [`§7Grants §a+${val} §6${SYMBOLS.mining_speed} Mining Speed §7when inside the §bGlacite Mineshafts§7.`];
  }
}

class KeenEye extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "keen_eye";
    this.name = nodeNames[this.id];
    this.position = 19;
    this.max_level = 1;
    this.upgrade_type = "glacite_powder";
    this.requires = [];
    this.positionType = "left_perk";
  }

  perk() {
    return [`§7Whenever you enter a §bGlacite Mineshaft §7one highlighted Hard Stone §7will contian §a+250 §bGlacite Powder§7.`];
  }
}

class WarmHearted extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "warm_hearted";
    this.name = nodeNames[this.id];
    this.position = 20;
    this.max_level = 50;
    this.upgrade_type = "glacite_powder";
    this.requires = [];
    this.positionType = "cross";
  }

  perk(level: number) {
    const val = level * 0.2;

    return [`§7Grants §a+${val} §b${SYMBOLS.cold_resistence} Cold Resistence§7.`];
  }
}

class DustCollector extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "dust_collector";
    this.name = nodeNames[this.id];
    this.position = 21;
    this.max_level = 20;
    this.upgrade_type = "glacite_powder";
    this.requires = [];
    this.positionType = "horizontal_line";
  }

  perk(level: number) {
    const val = level * 1;

    return [`§7Receive §a${val}% §7more §fFossil Dust §7from all sources.`];
  }
}

class DailyGrind extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "daily_grind";
    this.name = nodeNames[this.id];
    this.position = 22;
    this.max_level = 100;
    this.upgrade_type = "glacite_powder";
    this.requires = [];
    this.positionType = "cross";
  }

  perk() {
    const val = 50;

    return [`§7Your first daily commission in each Mining Zone grants bonus powder: `, ``, `§2Dwarven Mines: §a+${val} §2Mithril Powder`, `§5Crystal Hollows: §a+${val} §dGemstone Powder`, `§bGlacite Tunnels: §a+${val} §bGlacite Powder`];
  }
}

class StrongArm extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "strong_arm";
    this.name = nodeNames[this.id];
    this.position = 23;
    this.max_level = 100;
    this.upgrade_type = "glacite_powder";
    this.requires = [];
    this.positionType = "horizontal_line";
  }

  perk(level: number) {
    const val = level * 5;

    return [`§7Gain §a+${val} §6${SYMBOLS.mining_speed} Mining Speed §7when mining Tungsten or Umber.`];
  }
}

class NoStoneUnturned extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "no_stone_unturned";
    this.name = nodeNames[this.id];
    this.position = 24;
    this.max_level = 50;
    this.upgrade_type = "glacite_powder";
    this.requires = [];
    this.positionType = "cross";
  }

  perk(level: number) {
    const val = level * 0.5;

    return [`§7Increases your chances of finding a §9Suspicious Scrap §7when mining in a §bGlacite Mineshaft by §a${val}%§7.`];
  }
}

class MineshaftMayhem extends Node {
  constructor(data: NodeData) {
    super(data);
    this.id = "mineshaft_mayhem";
    this.name = nodeNames[this.id];
    this.position = 25;
    this.max_level = 1;
    this.upgrade_type = "glacite_powder";
    this.requires = [];
    this.positionType = "right_perk";
  }

  perk() {
    return [`§7Every time your enter a §bGlacite Mineshaft§7, you receive a random buff.`, ``, `§7Possible Buffs`, `§8 ■ §a+5% §7chance to find a §9Suspicious Scrap§7.`, `§8 ■ §7Gain §a100 §6${SYMBOLS.mining_speed} Mining Speed§7.`, `§8 ■ §7Gain §a200 §6${SYMBOLS.mining_fortune} Mining Fortune§7.`, `§8 ■ §7Gain §a+10 §b${SYMBOLS.cold_resistence} Cold Resistence§7.`, `§8 ■ §7Reduce Pickaxe Ability cooldown by §a25%§7.`];
  }
}

/*
.####.########.########.##.....##..######.
..##.....##....##.......###...###.##....##
..##.....##....##.......####.####.##......
..##.....##....######...##.###.##..######.
..##.....##....##.......##.....##.......##
..##.....##....##.......##.....##.##....##
.####....##....########.##.....##..######.
*/

class HotmItem {
  position: number;
  displayName: string;
  itemData: { id: number; Damage: number; glowing: boolean; texture_path: string; skyblock_id?: string };
  resources: { token_of_the_mountain: number; mithril_powder: number; gemstone_powder: number };
  last_reset: number;
  constructor() {
    this.position = 0;
    this.displayName = "";
    this.itemData = { id: 0, Damage: 0, glowing: false, texture_path: "", skyblock_id: "" };
    this.resources = { token_of_the_mountain: 0, mithril_powder: 0, gemstone_powder: 0 };
    this.last_reset = 0;
  }

  get position10x9(): number {
    return 9 * (HOTM.tiers - this.position) + 9;
  }
}

class HotmStats extends HotmItem {
  constructor(data: HotmItemData) {
    super();
    this.displayName = "§5Heart of the Mountain";
    this.position = 1;
    this.itemData = {
      id: 397,
      Damage: 3,
      glowing: false,
      texture_path: "/api/head/86f06eaa3004aeed09b3d5b45d976de584e691c0e9cade133635de93d23b9edb"
    };
    this.resources = {
      token_of_the_mountain: data.resources.token_of_the_mountain || 0,
      mithril_powder: data.resources.mithril_powder || 0,
      gemstone_powder: data.resources.gemstone_powder || 0
    };
  }

  get lore() {
    return [`§7Token of the Mountain: §5${this.resources.token_of_the_mountain.toLocaleString()}`, "", "§7§8Use §5Token of the Mountain §8to unlock perks and abilities above!", "", `§9${SYMBOLS.powder} Powder`, "§9Powders §8are dropped from mining ores in the §2Dwarven Mines §8and are used to upgrade the perks you've unlocked!", "", `§7Mithril Powder: §2${this.resources.mithril_powder.toLocaleString()}`, `§7Gemstone Powder: §d${this.resources.gemstone_powder.toLocaleString()}`, "", "§8Increase your chance to gain extra Powder by unlocking perks, equipping the §2Mithril Golem Pet§8, and more!"];
  }
}

class CrystalHollowsCrystals extends HotmItem {
  crystals: Record<string, Crystal>;
  constructor(data: HotmItemData) {
    super();
    this.displayName = "§5Crystal Hollows Crystals";
    this.position = 2;
    this.itemData = {
      id: 397,
      Damage: 3,
      glowing: false,
      texture_path: "/api/head/ef7835fc9e6daf632160e9b7ff378788a408064cc75ebf9f5158e615bdd59603",
      skyblock_id: "hotm_crystal"
    };
    this.crystals = data.crystals ?? {};
  }

  get lore() {
    return ["§8Crystals are used to forge Gems into §dPerfect §8Gems. They can be found hidden within the §5Crystal Hollows§8.", "", "§8Find and place the full set of §55 §8Crystals in the §5Crystal Nucleus §8to unlock §6rare loot chests§8!", "", "§dYour §5Crystal Nucleus", `§8- §aJade ${this.formatCrystal("jade", this.crystals.jade_crystal?.state)}`, `§8- §6Amber ${this.formatCrystal("amber", this.crystals.amber_crystal?.state)}`, `§8- §5Amethyst ${this.formatCrystal("amethyst", this.crystals.amethyst_crystal?.state)}`, `§8- §bSapphire ${this.formatCrystal("sapphire", this.crystals.sapphire_crystal?.state)}`, `§8- §eTopaz ${this.formatCrystal("topaz", this.crystals.topaz_crystal?.state)}`, "", "§dYour Other Crystals", `§8- §dJasper ${this.formatCrystal("jasper", this.crystals.jasper_crystal?.state)}`, `§8- §cRuby ${this.formatCrystal("ruby", this.crystals.ruby_crystal?.state)}`, `§8- §fOpal ${this.formatCrystal("opal", this.crystals.opal_crystal?.state)}`, `§8- §bAquamarine ${this.formatCrystal("aquamarine", this.crystals.aquamarine_crystal?.state)}`, `§8- §2Peridot ${this.formatCrystal("peridot", this.crystals.peridot_crystal?.state)}`, `§8- §4Citrine ${this.formatCrystal("citrine", this.crystals.citrine_crystal?.state)}`, `§8- §0Onyx ${this.formatCrystal("onyx", this.crystals.onyx_crystal?.state)}`];
  }

  formatCrystal(crystal: string, state: string) {
    if (!state) {
      state = "NOT_FOUND";
    }
    let formatted = state.split("_").join(" ").trim();
    formatted = helper.titleCase(formatted);

    let color = "r";
    let symbol = "";
    switch (state) {
      case "NOT_FOUND":
        color = "c";
        symbol = "✖";
        break;
      case "FOUND":
        color = "e";
        symbol = "✖";
        break;
      case "PLACED":
        color = "a";
        symbol = "✔";
        break;
    }

    // Jasper and Ruby do not have a PLACED state
    if (["jasper", "ruby", "opal", "aquamarine", "peridot", "citrine", "onyx"].includes(crystal) && state === "FOUND") {
      color = "a";
      symbol = "✔";
    }

    return `§${color}${symbol} ${formatted}`;
  }
}

class HotmReset extends HotmItem {
  constructor(data: HotmItemData) {
    super();
    this.displayName = "§cReset Heart of the Mountain";
    this.position = 3;
    this.itemData = {
      id: 397,
      Damage: 3,
      glowing: false,
      texture_path: "/api/head/6448e275313532f54c4ba21894809a23dce52af01ddd1e89fc7689481fab737e",
      skyblock_id: "hotm_reset"
    };
    this.last_reset = data.last_reset;
    this.resources = {
      token_of_the_mountain: data.resources.token_of_the_mountain || 0,
      mithril_powder: data.resources.mithril_powder || 0,
      gemstone_powder: data.resources.gemstone_powder || 0
    };
  }

  get lore() {
    const output = ["§7Resets the Perks and Abilities of your §5Heart of the Mountain§7, locking them and resetting their levels.", "", "§7You will be reimbursed with:", `§8- §5${this.resources.token_of_the_mountain.toLocaleString()} Token of the Mountain`, `§8- §2${this.resources.mithril_powder.toLocaleString()} Mithril Powder`, `§8- §d${this.resources.gemstone_powder.toLocaleString()} Gemstone Powder`, `§8- §b${this.resources.gemstone_powder.toLocaleString()} Glacite Powder`, "", "§7You will §akeep §7any Tiers and §cPeak of the Mountain §7that you have unlocked."];

    // cost
    output.push("", "§7Cost");
    if (this.last_reset === 0) {
      output.push("§aFREE §7for your first reset.");
    } else {
      output.push("§6100,000 Coins");
    }

    // cooldown or warning
    if (Date.now() - this.last_reset > 24 * 60 * 60 * 1000) {
      output.push("", "§7§c§lWARNING: This is permanent.", "§c§lYou can not go back after resetting your Heart of the Mountain!");
    } else {
      const _timeLeft = Math.abs(Date.now() - (this.last_reset + 24 * 60 * 60 * 1000)); // ms
      // output.push('', `§c§lYou can reset again in ${prettyMilliseconds(timeLeft / 1000)}`);
    }

    return output;
  }
}

/*
.########.##.....##.########...#######..########..########..######.
.##........##...##..##.....##.##.....##.##.....##....##....##....##
.##.........##.##...##.....##.##.....##.##.....##....##....##......
.######......###....########..##.....##.########.....##.....######.
.##.........##.##...##........##.....##.##...##......##..........##
.##........##...##..##........##.....##.##....##.....##....##....##
.########.##.....##.##.........#######..##.....##....##.....######.
*/

const nodeClasses = {
  // HOTM 10
  gemstone_infusion: GemstoneInfusion,
  gifts_from_the_departed: GiftsFromTheDeparted,
  frozen_solid: FrozenSolid,
  hungry_for_more: HungryForMore,
  excavator: Excavator,
  rags_of_riches: RagsOfRiches,
  hazardous_miner: HazardousMiner,
  // HOTM 9
  surveyor: Surveyor,
  subzero_mining: SubzeroMining,
  eager_adventurer: EagerAdventurer,
  // HOTM 8
  keen_eye: KeenEye,
  warm_hearted: WarmHearted,
  dust_collector: DustCollector,
  daily_grind: DailyGrind,
  strong_arm: StrongArm,
  no_stone_unturned: NoStoneUnturned,
  mineshaft_mayhem: MineshaftMayhem,
  // HOTM 7
  mining_speed_2: MiningSpeed2,
  powder_buff: PowderBuff,
  mining_fortune_2: MiningFortune2,
  // HOTM 6
  vein_seeker: VeinSeeker,
  lonesome_miner: LonesomeMiner,
  professional: Professional,
  mole: Mole,
  fortunate: Fortunate,
  great_explorer: GreatExplorer,
  maniac_miner: ManiacMiner,
  // HOTM 5
  goblin_killer: GoblinKiller,
  special_0: PeakOfTheMountain,
  star_powder: StarPowder,
  // HOTM 4
  daily_effect: SkyMall,
  mining_madness: MiningMadness,
  mining_experience: SeasonedMineman,
  efficient_miner: EfficientMiner,
  experience_orbs: Orbiter,
  front_loaded: FrontLoaded,
  precision_mining: PrecisionMining,
  // HOTM 3
  random_event: LuckOfTheCave,
  daily_powder: DailyPowder,
  fallen_star_bonus: Crystallized,
  // HOTM 2
  mining_speed_boost: MiningSpeedBoost,
  titanium_insanium: TitaniumInsanium,
  mining_fortune: MiningFortune,
  forge_time: QuickForge,
  pickaxe_toss: Pickobulus,
  // HOTM 1
  mining_speed: MiningSpeed
};

export const HOTM = {
  tiers: Object.keys(rewards.hotm).length,
  rewards: rewards,
  names: nodeNames,
  hotm: HotM,
  nodes: nodeClasses as Record<string, typeof Node>,
  items: [HotmStats, CrystalHollowsCrystals, HotmReset]
};

export const PRECURSOR_PARTS = {
  ELECTRON_TRANSMITTER: "Electron Transmitter",
  FTX_3070: "FTX 3070",
  ROBOTRON_REFLECTOR: "Robotron Reflector",
  SUPERLITE_MOTOR: "Superlite Motor",
  CONTROL_SWITCH: "Control Switch",
  SYNTHETIC_HEART: "Synthetic Heart"
};

export const COMMISSIONS_MILESTONE = 6;

export const MAX_PEAK_OF_THE_MOUNTAIN_LEVEL = 10;

export const GEMSTONE_CRYSTALS = ["jade", "amber", "amethyst", "sapphire", "topaz", "jasper", "ruby", "opal", "aquamarine", "peridot", "citrine", "onyx"];

export const FORGE = {
  BEJEWELED_HANDLE: { name: "Bejeweled Handle", duration: 30000 },
  REFINED_DIAMOND: { name: "Refined Diamond", duration: 28800000 },
  REFINED_MITHRIL: { name: "Refined Mithril", duration: 21600000 },
  REFINED_TITANIUM: { name: "Refined Titanium", duration: 43200000 },
  REFINED_TUNGSTEN: { name: "Refined Tungsten", duration: 3600000 },
  REFINED_UMBER: { name: "Refined Umber", duration: 3600000 },
  FUEL_TANK: { name: "Fuel Tank", duration: 36000000 },
  DRILL_ENGINE: { name: "Drill Engine", duration: 108000000 },
  GOLDEN_PLATE: { name: "Golden Plate", duration: 21600000 },
  MITHRIL_PLATE: { name: "Mithril Plate", duration: 64800000 },
  TUNGSTEN_PLATE: { name: "Tungsten Plate", duration: 10800000 },
  UMBER_PLATE: { name: "Umber Plate", duration: 10800000 },
  GEMSTONE_MIXTURE: { name: "Gemstone Mixture", duration: 14400000 },
  GLACITE_AMALGAMATION: { name: "Glacite Amalgamation", duration: 14400000 },
  PERFECT_JASPER_GEM: { name: "Perfect Jasper Gemstone", duration: 72000000 },
  PERFECT_RUBY_GEM: { name: "Perfect Ruby Gemstone", duration: 72000000 },
  PERFECT_JADE_GEM: { name: "Perfect Jade Gemstone", duration: 72000000 },
  PERFECT_SAPPHIRE_GEM: { name: "Perfect Sapphire Gemstone", duration: 72000000 },
  PERFECT_AMBER_GEM: { name: "Perfect Amber Gemstone", duration: 72000000 },
  PERFECT_TOPAZ_GEM: { name: "Perfect Topaz Gemstone", duration: 72000000 },
  PERFECT_AMETHYST_GEM: { name: "Perfect Amethyst Gemstone", duration: 72000000 },
  PERFECT_OPAL_GEM: { name: "Perfect Opal Gemstone", duration: 72000000 },
  PERFECT_ONYX_GEM: { name: "Perfect Onyx Gem", duration: 72000000 },
  PERFECT_CITRINE_GEM: { name: "Perfect Citrine Gem", duration: 72000000 },
  PERFECT_AQUAMARINE_GEM: { name: "Perfect Aquamarine Gem", duration: 72000000 },
  PERFECT_PERIDOT_GEM: { name: "Perfect Peridot Gem", duration: 72000000 },
  PERFECT_PLATE: { name: "Perfect Plate", duration: 21600000 },
  MITHRIL_PICKAXE: { name: "Mithril Pickaxe", duration: 2700000 },
  BEACON_2: { name: "Beacon II", duration: 72000000 },
  TITANIUM_TALISMAN: { name: "Titanium Talisman", duration: 50400000 },
  DIAMONITE: { name: "Diamonite", duration: 21600000 },
  POWER_CRYSTAL: { name: "Power Crystal", duration: 7200000 },
  FORGE_TRAVEL_SCROLL: { name: "Travel Scroll to the Dwarven Forge", duration: 18000000 },
  BEJEWELED_COLLAR: { name: "Bejeweled Collar", duration: 7200000 },
  CHISEL: { name: "Chisel", duration: 30000 },
  TUNGSTEN_KEY: { name: "Tungsten Key", duration: 30000 },
  UMBER_KEY: { name: "Umber Key", duration: 30000 },
  FRIGID_HUSK: { name: "Frigid Husk", duration: 36000000 },
  BASE_CAMP_TRAVEL_SCROLL: {
    name: "Travel Scroll to the Dwarven Base Camp",
    duration: 36000000
  },
  REFINED_MITHRIL_PICKAXE: { name: "Refined Mithril Pickaxe", duration: 79200000 },
  MITHRIL_DRILL_1: { name: "Mithril Drill SX-R226", duration: 14400000 },
  MITHRIL_FUEL_TANK: { name: "Mithril-Infused Fuel Tank", duration: 36000000 },
  MITHRIL_DRILL_ENGINE: { name: "Mithril-Plated Drill Engine", duration: 54000000 },
  BEACON_3: { name: "Beacon III", duration: 108000000 },
  TITANIUM_RING: { name: "Titanium Ring", duration: 72000000 },
  PURE_MITHRIL: { name: "Pure Mithril", duration: 43200000 },
  ROCK_GEMSTONE: { name: "Rock Gemstone", duration: 79200000 },
  PETRIFIED_STARFALL: { name: "Petrified Starfall", duration: 50400000 },
  GOBLIN_OMELETTE_PESTO: { name: "Pesto Goblin Omelette", duration: 72000000 },
  LVL_1_LEGENDARY_AMMONITE: { name: "[Lvl 1] Ammonite", duration: 1036800000 },
  GEMSTONE_DRILL_1: { name: "Ruby Drill TX-15", duration: 3600000 },
  LVL_1_LEGENDARY_MOLE: { name: "[Lvl 1] Mole", duration: 259200000 },
  MITHRIL_DRILL_2: { name: "Mithril Drill SX-R326", duration: 30000 },
  TITANIUM_DRILL_ENGINE: { name: "Titanium-Plated Drill Engine", duration: 108000000 },
  GOBLIN_OMELETTE: { name: "Goblin Omelette", duration: 64800000 },
  BEACON_4: { name: "Beacon IV", duration: 144000000 },
  TITANIUM_ARTIFACT: { name: "Titanium Artifact", duration: 129600000 },
  HOT_STUFF: { name: "Hot Stuff", duration: 86400000 },
  GOBLIN_OMELETTE_SUNNY_SIDE: { name: "Sunny Side Goblin Omelette", duration: 72000000 },
  GEMSTONE_DRILL_2: { name: "Gemstone Drill LT-522", duration: 30000 },
  TITANIUM_DRILL_1: { name: "Titanium Drill DR-X355", duration: 230400000 },
  TITANIUM_DRILL_2: { name: "Titanium Drill DR-X455", duration: 30000 },
  TITANIUM_DRILL_3: { name: "Titanium Drill DR-X555", duration: 30000 },
  TITANIUM_FUEL_TANK: { name: "Titanium-Infused Fuel Tank", duration: 90000000 },
  BEACON_5: { name: "Beacon V", duration: 180000000 },
  TITANIUM_RELIC: { name: "Titanium Relic", duration: 259200000 },
  GOBLIN_OMELETTE_SPICY: { name: "Spicy Goblin Omelette", duration: 72000000 },
  GEMSTONE_CHAMBER: { name: "Gemstone Chamber", duration: 14400000 },
  GEMSTONE_DRILL_3: { name: "Topaz Drill KGR-12", duration: 30000 },
  RUBY_POLISHED_DRILL_ENGINE: { name: "Ruby-polished Drill Engine", duration: 72000000 },
  GEMSTONE_FUEL_TANK: { name: "Gemstone Fuel Tank", duration: 108000000 },
  GOBLIN_OMELETTE_BLUE_CHEESE: { name: "Blue Cheese Goblin Omelette", duration: 72000000 },
  TITANIUM_DRILL_4: { name: "Titanium Drill DR-X655", duration: 30000 },
  GEMSTONE_DRILL_4: { name: "Jasper Drill X", duration: 30000 },
  SAPPHIRE_POLISHED_DRILL_ENGINE: { name: "Sapphire-polished Drill Engine", duration: 108000000 },
  AMBER_MATERIAL: { name: "Amber Material", duration: 25200000 },
  DIVAN_HELMET: { name: "Helmet Of Divan", duration: 82800000 },
  DIVAN_CHESTPLATE: { name: "Chestplate Of Divan", duration: 82800000 },
  DIVAN_LEGGINGS: { name: "Leggings Of Divan", duration: 82800000 },
  DIVAN_BOOTS: { name: "Boots Of Divan", duration: 82800000 },
  AMBER_POLISHED_DRILL_ENGINE: { name: "Amber-polished Drill Engine", duration: 180000000 },
  PERFECTLY_CUT_FUEL_TANK: { name: "Perfectly-Cut Fuel Tank", duration: 180000000 },
  DIVAN_DRILL: { name: "Divan's Drill", duration: 216000000 },
  SECRET_RAILROAD_PASS: { name: "Secret Railroad Pass", duration: 30000 },
  LVL_1_LEGENDARY_TYRANNOSAURUS: { name: "[Lvl 1] T-Rex", duration: 604800000 },
  LVL_1_LEGENDARY_SPINOSAURUS: { name: "[Lvl 1] Spinosaurus", duration: 604800000 },
  LVL_1_LEGENDARY_GOBLIN: { name: "[Lvl 1] Goblin", duration: 604800000 },
  LVL_1_LEGENDARY_ANKYLOSAURUS: { name: "[Lvl 1] Ankylosaurus", duration: 604800000 },
  LVL_1_LEGENDARY_PENGUIN: { name: "[Lvl 1] Penguin", duration: 604800000 },
  LVL_1_LEGENDARY_MAMMOTH: { name: "[Lvl 1] Mammoth", duration: 604800000 },
  DWARVEN_HANDWARMERS: { name: "Dwarven Handwarmers", duration: 14400000 },
  REINFORCED_CHISEL: { name: "Reinforced Chisel", duration: 43200000 },
  DWARVEN_METAL: { name: "Dwarven Metal Talisman", duration: 86400000 },
  PORTABLE_CAMPFIRE: { name: "Portable Campfire", duration: 1800000 },
  TUNGSTEN_KEYCHAIN: { name: "Tungsten Regulator", duration: 21600000 },
  GLACITE_CHISEL: { name: "Glacite-Plated Chisel", duration: 64800000 },
  PERFECT_CHISEL: { name: "Perfect Chisel", duration: 86400000 },
  DIVAN_PENDANT: { name: "Pendant of Divan", duration: 604800000 },
  POWER_RELIC: { name: "Relic of Power", duration: 28800000 },
  SKELETON_KEY: { name: "Skeleton Key", duration: 1800000 }
} as Record<string, { name: string; duration: number }>;
