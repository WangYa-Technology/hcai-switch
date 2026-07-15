import { generateUUID } from "@/utils/uuid";
import type { HcaiLinkedProvider, HcaiSavedKey, HcaiStoreState } from "./types";

const STORAGE_KEY = "cc-switch-hcai-keys";

function emptyState(): HcaiStoreState {
  return { version: 1, keys: [], activeKeyId: null };
}

export function loadHcaiStore(): HcaiStoreState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw) as HcaiStoreState;
    if (!parsed || parsed.version !== 1 || !Array.isArray(parsed.keys)) {
      return emptyState();
    }
    return parsed;
  } catch {
    return emptyState();
  }
}

export function saveHcaiStore(state: HcaiStoreState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function maskApiKey(key: string): string {
  const k = key.trim();
  if (k.length <= 12) return "••••••••";
  return `${k.slice(0, 6)}…${k.slice(-4)}`;
}

export function upsertHcaiKey(
  state: HcaiStoreState,
  input: { apiKey: string; label?: string; id?: string },
): HcaiStoreState {
  const apiKey = input.apiKey.trim();
  if (!apiKey) return state;

  const existingByKey = state.keys.find((k) => k.apiKey === apiKey);
  if (existingByKey && !input.id) {
    return {
      ...state,
      activeKeyId: existingByKey.id,
      keys: state.keys.map((k) =>
        k.id === existingByKey.id
          ? {
              ...k,
              label: input.label?.trim() || k.label,
              lastUsedAt: Date.now(),
            }
          : k,
      ),
    };
  }

  if (input.id) {
    return {
      ...state,
      activeKeyId: input.id,
      keys: state.keys.map((k) =>
        k.id === input.id
          ? {
              ...k,
              apiKey,
              label: input.label?.trim() || k.label,
              lastUsedAt: Date.now(),
            }
          : k,
      ),
    };
  }

  const id = generateUUID();
  const entry: HcaiSavedKey = {
    id,
    label: input.label?.trim() || maskApiKey(apiKey),
    apiKey,
    createdAt: Date.now(),
    lastUsedAt: Date.now(),
    linkedProviders: [],
  };
  return {
    version: 1,
    activeKeyId: id,
    keys: [entry, ...state.keys],
  };
}

export function setActiveHcaiKey(
  state: HcaiStoreState,
  keyId: string,
): HcaiStoreState {
  if (!state.keys.some((k) => k.id === keyId)) return state;
  return {
    ...state,
    activeKeyId: keyId,
    keys: state.keys.map((k) =>
      k.id === keyId ? { ...k, lastUsedAt: Date.now() } : k,
    ),
  };
}

export function appendLinkedProviders(
  state: HcaiStoreState,
  keyId: string,
  links: HcaiLinkedProvider[],
): HcaiStoreState {
  if (links.length === 0) return state;
  return {
    ...state,
    keys: state.keys.map((k) => {
      if (k.id !== keyId) return k;
      const next = [...k.linkedProviders];
      for (const link of links) {
        const idx = next.findIndex(
          (x) => x.app === link.app && x.providerId === link.providerId,
        );
        if (idx >= 0) next[idx] = link;
        else next.push(link);
      }
      return { ...k, linkedProviders: next };
    }),
  };
}

export function removeHcaiKey(
  state: HcaiStoreState,
  keyId: string,
): { state: HcaiStoreState; removed: HcaiSavedKey | null } {
  const removed = state.keys.find((k) => k.id === keyId) ?? null;
  if (!removed) return { state, removed: null };
  const keys = state.keys.filter((k) => k.id !== keyId);
  const activeKeyId =
    state.activeKeyId === keyId ? (keys[0]?.id ?? null) : state.activeKeyId;
  return { state: { version: 1, keys, activeKeyId }, removed };
}

export function getActiveHcaiKey(state: HcaiStoreState): HcaiSavedKey | null {
  if (!state.activeKeyId) return state.keys[0] ?? null;
  return state.keys.find((k) => k.id === state.activeKeyId) ?? null;
}
