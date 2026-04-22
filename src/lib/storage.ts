// Safe localStorage wrapper
const PREFIX = 'kmg.';

export function get<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw == null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function set<T>(key: string, value: T) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {}
}

export function addCollected(id: string): string[] {
  const list = get<string[]>('collected', []);
  if (!list.includes(id)) {
    list.push(id);
    set('collected', list);
  }
  return list;
}

export function getCollected(): string[] {
  return get<string[]>('collected', []);
}

export function setBestScore(score: number): number {
  const best = get<number>('bestScore', 0);
  if (score > best) {
    set('bestScore', score);
    return score;
  }
  return best;
}

export function getBestScore(): number {
  return get<number>('bestScore', 0);
}
