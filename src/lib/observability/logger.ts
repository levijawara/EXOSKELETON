export type LogLevel = "debug" | "info" | "warn" | "error";

export type LogContext = {
  requestId?: string;
  userId?: string;
  route?: string;
  extra?: Record<string, unknown>;
};

function emit(level: LogLevel, message: string, ctx: LogContext = {}) {
  const payload = {
    ts: new Date().toISOString(),
    level,
    message,
    ...ctx,
  };

  // Keep it dead simple by default; swap to pino/otel later.
  console[level === "debug" ? "log" : level](JSON.stringify(payload));
}

export const log = {
  debug: (message: string, ctx?: LogContext) => emit("debug", message, ctx),
  info: (message: string, ctx?: LogContext) => emit("info", message, ctx),
  warn: (message: string, ctx?: LogContext) => emit("warn", message, ctx),
  error: (message: string, ctx?: LogContext) => emit("error", message, ctx),
};

