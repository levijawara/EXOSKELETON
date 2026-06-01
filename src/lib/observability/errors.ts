export type ErrorReporter = {
  captureException(error: unknown, context?: Record<string, unknown>): void;
};

class ConsoleErrorReporter implements ErrorReporter {
  captureException(error: unknown, context?: Record<string, unknown>) {
    console.error("captureException", { error, context });
  }
}

let reporter: ErrorReporter = new ConsoleErrorReporter();

export function setErrorReporter(next: ErrorReporter) {
  reporter = next;
}

export function captureException(
  error: unknown,
  context?: Record<string, unknown>,
) {
  reporter.captureException(error, context);
}

