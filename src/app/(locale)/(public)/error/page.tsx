"use client";

import { Button } from "@/components/ui/button/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card/card";
import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="max-w-2xl w-full">
        {/* Main Error Card */}
        <Card variant="elevated" className="text-center">
          <CardHeader className="pb-8 flex-col items-center justify-center text-center">
            {/* Error Icon */}
            <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-error"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-text-primary mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-lg text-text-secondary max-w-md mx-auto">
              We apologize for the inconvenience. We&apos;ve encountered an
              unexpected technical issue.
            </p>
          </CardHeader>

          <CardContent className="pb-8">
            <div className="space-y-6">
              {/* Help Information */}
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold text-text-primary">
                  What can you do?
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3 text-center">
                    <div className="space-y-2">
                      <p className="font-medium text-text-primary">Try again</p>
                      <p className="text-sm text-text-secondary">
                        The issue might be temporary
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium text-text-primary">
                        Go to homepage
                      </p>
                      <p className="text-sm text-text-secondary">
                        Return to the main page
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3 text-center">
                    <div className="space-y-2">
                      <p className="font-medium text-text-primary">
                        Contact support
                      </p>
                      <p className="text-sm text-text-secondary">
                        If the problem persists
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium text-text-primary">Go back</p>
                      <p className="text-sm text-text-secondary">
                        Return to the previous page
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="primary"
              onClick={handleRetry}
              className="w-full sm:w-auto"
            >
              Try Again
            </Button>
            <Button
              variant="secondary"
              onClick={handleGoHome}
              className="w-full sm:w-auto"
            >
              Go to Homepage
            </Button>
            <Button
              variant="ghost"
              onClick={handleGoBack}
              className="w-full sm:w-auto"
            >
              Go Back
            </Button>
          </CardFooter>
        </Card>

        {/* Additional Help Section */}
        <div className="mt-8 text-center">
          <p className="text-text-muted mb-4">
            Need help? Contact our support team
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@gavilan.com"
              className="inline-flex items-center space-x-2 text-primary hover:text-primary-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
              <span>support@gavilan.com</span>
            </a>
            <a
              href="tel:+34965123456"
              className="inline-flex items-center space-x-2 text-primary hover:text-primary-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                  clipRule="evenodd"
                />
              </svg>
              <span>+34 965 123 456</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
