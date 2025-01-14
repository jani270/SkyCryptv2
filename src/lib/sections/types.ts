import type { Component } from "svelte";

export type SectionComponent = {
  component: () => Promise<{
    default: Component;
  }>;
  condition: () => boolean;
};

export type SectionName = "Armor" | "Weapons" | "Accessories" | "Pets" | "Inventory" | "Skills" | "Dungeons" | "Slayer" | "Minions" | "Bestiary" | "Collections" | "Crimson_Isle" | "Rift" | "Misc";

export type SectionComponents = Record<SectionName, SectionComponent>;
export type SectionID = { id: number; name: SectionName };
