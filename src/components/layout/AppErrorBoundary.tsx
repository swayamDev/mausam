import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

/**
 * Section-level error boundary. Prevents a single failing widget
 * (e.g. map token missing, chart data malformed) from crashing the whole app.
 */
export class AppErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("[AppErrorBoundary]", error, info.componentStack);
  }

  handleRetry = () => {
    this.setState({ hasError: false, errorMessage: "" });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div
          role="alert"
          className="flex min-h-40 flex-col items-center justify-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center text-sm"
        >
          <p className="text-destructive font-medium">
            Something went wrong loading this section.
          </p>
          {this.state.errorMessage && (
            <p className="text-muted-foreground font-mono text-xs">
              {this.state.errorMessage}
            </p>
          )}
          <button
            onClick={this.handleRetry}
            className="text-foreground/70 underline underline-offset-4 hover:text-foreground transition-colors text-xs"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
