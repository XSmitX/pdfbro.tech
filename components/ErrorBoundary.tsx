"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw } from "lucide-react";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  /** Optional custom fallback. Defaults to a clean error card. */
  fallback?: React.ReactNode;
  /** Tool name for the error message */
  toolName?: string;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // In production you'd send this to Sentry/Datadog
    if (process.env.NODE_ENV === "development") {
      console.error("[ErrorBoundary]", error, info.componentStack);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div
          className="rounded-2xl p-8 text-center"
          style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
          role="alert"
        >
          <div
            className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full"
            style={{ backgroundColor: "rgba(248,113,113,0.12)" }}
          >
            <AlertCircle className="h-6 w-6" style={{ color: "var(--accent-red)" }} />
          </div>

          <h3
            className="text-base font-semibold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            {this.props.toolName
              ? `${this.props.toolName} encountered an error`
              : "Something went wrong"}
          </h3>

          <p
            className="text-sm mb-6 max-w-sm mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            An unexpected error occurred. Your files are safe — nothing was uploaded.
            Try refreshing or use a different browser.
          </p>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-80"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--bg-secondary)",
                color: "var(--text-primary)",
              }}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Try Again
            </button>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-80"
              style={{ backgroundColor: "var(--accent-blue)" }}
            >
              Browse All Tools
            </Link>
          </div>

          {process.env.NODE_ENV === "development" && this.state.error && (
            <details className="mt-6 text-left">
              <summary
                className="cursor-pointer text-xs mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                Error details (dev only)
              </summary>
              <pre
                className="text-xs rounded-lg p-3 overflow-x-auto"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  color: "var(--accent-red)",
                  fontFamily: "monospace",
                }}
              >
                {this.state.error.message}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
