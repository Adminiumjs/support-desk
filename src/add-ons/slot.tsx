/**
 * THE SEAM, BOUND TO THIS APP — once, at module scope.
 *
 * The mount component reaches out of the seam twice on the way in: it writes a
 * class name only this app's stylesheet knows, and it reads a store only this
 * app has. Both are arguments to the factory, and this file is where this app
 * supplies them. CALL IT ONCE: a second `createAddOnSlot` makes a second
 * component identity, so React unmounts and remounts every fill under it
 * whenever a screen renders the other one. Every screen imports `AddOnSlot`
 * from here.
 */

import { createAddOnSlot, type UseSlotFills } from "./kit/index.ts";
import { hostKit } from "./host-kit.config.ts";
import type { HostedSlotId } from "./slots.ts";
import { useAppStore } from "../state/store.ts";

/*
 * Three separate selectors, not one that builds an object: zustand compares a
 * selector's result with `Object.is`, so a selector returning `{ fills,
 * settings }` is a new object on every store change and the component
 * re-renders on every keystroke anywhere. Each field below compares a stable
 * reference; the fills are recomputed only here, where the result is not a
 * subscription.
 */
const useSlotFills: UseSlotFills<HostedSlotId> = (slot, forAddOn) => {
  const registry = useAppStore((s) => s.registry);
  const enabled = useAppStore((s) => s.enabled);
  const settings = useAppStore((s) => s.addOnSettings);
  return { fills: registry.fillsFor(slot, enabled, forAddOn), settings };
};

export const { AddOnSlot, SlotFill } = createAddOnSlot(hostKit, useSlotFills);
