import type { AccessoriesOutput, DungeonsStats, Farming, Items, MainStats, MiningStats, Misc, Pets, Rank, Skill, Skills, SlayerData } from "./global";
import type { BestiaryStats } from "./processed/profile/bestiary";
import type { Collections } from "./processed/profile/collections";
import type { CrimsonIsle } from "./processed/profile/crimson_isle";
import type { Minions } from "./processed/profile/minions";
export * from "./processed/profile/main_stats";
export * from "./processed/profile/skills";
export * from "./processed/profile/rank";
export * from "./processed/profile/items";
export * from "./processed/profile/pets";
export * from "./processed/profile/pet-stats";
export * from "./processed/profile/mining";
export * from "./processed/profile/farming";
export * from "./processed/profile/fishing";
export * from "./processed/profile/slayer";
export * from "./processed/profile/dungeons";
export * from "./processed/profile/collections";
export * from "./processed/profile/crimson_isle";
export * from "./processed/profile/rift";
export * from "./processed/profile/misc";

export type Stats = {
  username: string;
  uuid: string;
  profile_id: string;
  profile_cute_name: string;
  game_mode: string;
  selected: boolean;
  members: string[];
  skills: Skills;
  rank: Rank | undefined;
  social: Record<string, string>;
  profiles: { profile_id: string; cute_name: string; game_mode: string; selected: boolean }[];
  skyblock_level: Skill;
  stats: MainStats;
  items: Items;
  accessories: AccessoriesOutput;
  pets: Pets;
  mining: MiningStats;
  farming: Farming;
  fishing: Fishing;
  slayer: SlayerData;
  dungeons: DungeonsStats;
  minions: Minions;
  bestiary: BestiaryStats;
  collections: Collections;
  crimson_isle: CrimsonIsle;
  rift: Rift;
  misc: Misc;
};
