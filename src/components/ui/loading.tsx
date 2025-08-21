import clsx from "clsx";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "pulse";
  fullScreen?: boolean;
  className?: string;
  message?: string;
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-12 h-12",
};

export default function Loading({
  size = "md",
  variant = "spinner",
  fullScreen = true,
  className,
  message,
}: LoadingProps) {
  const LoadingSpinner = () => (
    <div
      className={clsx(
        "animate-spin rounded-full border-2 border-primary/20 border-t-primary",
        sizeClasses[size]
      )}
    />
  );

  const LoadingDots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={clsx(
            "bg-primary rounded-full animate-bounce",
            size === "sm"
              ? "w-1.5 h-1.5"
              : size === "md"
              ? "w-2 h-2"
              : "w-3 h-3"
          )}
          style={{
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );

  const LoadingPulse = () => (
    <div
      className={clsx(
        "bg-primary rounded-full animate-pulse",
        sizeClasses[size]
      )}
    />
  );

  const renderLoader = () => {
    switch (variant) {
      case "dots":
        return <LoadingDots />;
      case "pulse":
        return <LoadingPulse />;
      default:
        return <LoadingSpinner />;
    }
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="flex flex-col items-center space-y-4">
          {renderLoader()}
          {message && (
            <p className="text-text-secondary text-sm font-medium">{message}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={clsx("flex items-center justify-center", className)}>
      <div className="flex flex-col items-center space-y-2">
        {renderLoader()}
        {message && <p className="text-text-secondary text-xs">{message}</p>}
      </div>
    </div>
  );
}
