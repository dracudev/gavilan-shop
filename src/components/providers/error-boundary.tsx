"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetOnPropsChange?: boolean;
  resetKeys?: Array<string | number | boolean | undefined | null>;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  private resetTimeoutId: number | null = null;

  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);

    this.setState({ error, errorInfo });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  public componentDidUpdate(prevProps: Props) {
    const { resetKeys } = this.props;
    const { hasError } = this.state;

    if (hasError && prevProps.resetKeys !== resetKeys) {
      if (resetKeys?.some((key, i) => key !== prevProps.resetKeys?.[i])) {
        this.resetErrorBoundary();
      }
    }
  }

  private resetErrorBoundary = () => {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }

    this.resetTimeoutId = window.setTimeout(() => {
      this.setState({
        hasError: false,
        error: undefined,
        errorInfo: undefined,
      });
    }, 0);
  };

  private handleRetry = () => {
    this.resetErrorBoundary();
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-[300px] flex items-center justify-center p-4">
          <Card variant="elevated" className="max-w-md w-full">
            <CardHeader className="text-center">
              {/* Error Icon */}
              <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-error"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <h3 className="text-xl font-semibold text-text-primary mb-2">
                Something went wrong
              </h3>
              <p className="text-text-secondary">
                We apologize for the inconvenience. This section encountered an
                error.
              </p>
            </CardHeader>

            <CardContent>
              {/* Error Details */}
              {this.state.error && (
                <div className="p-3 bg-error/5 border border-error/20 rounded-md mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <svg
                      className="w-4 h-4 text-error flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm font-medium text-error">
                      Error Details
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary font-mono break-words">
                    {this.state.error.message}
                  </p>
                </div>
              )}

              <div className="text-sm text-text-muted">
                <p>You can try the following:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Retry the action</li>
                  <li>Refresh the page</li>
                  <li>Go back to the homepage</li>
                  <li>Contact support if the issue persists</li>
                </ul>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col sm:flex-row gap-2">
              <Button variant="primary" size="sm" onClick={this.handleRetry}>
                Try Again
              </Button>
              <Button variant="secondary" size="sm" onClick={this.handleReload}>
                Refresh Page
              </Button>
              <Button variant="ghost" size="sm" onClick={this.handleGoHome}>
                Go Home
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Fallback for smaller components
export const SimpleErrorFallback = ({
  onRetry,
  message = "Something went wrong",
}: {
  onRetry?: () => void;
  message?: string;
}) => (
  <div className="p-6 text-center">
    <div className="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-3">
      <svg
        className="w-6 h-6 text-error"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    </div>
    <h3 className="font-medium text-text-primary mb-2">{message}</h3>
    <p className="text-sm text-text-secondary mb-4">
      We&apos;re having trouble loading this content.
    </p>
    {onRetry && (
      <Button size="sm" variant="secondary" onClick={onRetry}>
        Try Again
      </Button>
    )}
  </div>
);
