export type DbProvider = {
  // Intentionally minimal at first. Add query helpers here as the shell grows.
  getHealth(): Promise<{ ok: true }>;
};

