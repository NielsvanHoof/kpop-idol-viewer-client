import { Button } from "@headlessui/react";
import { NextPageContext } from "next/types";

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
  statusCode?: number;
}

function Error({ message, onRetry, statusCode }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="text-red-600 text-center">
        <svg
          className="h-16 w-16 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M12 6v6m0 4h.01M12 20h.01"
          />
        </svg>
        <h2 className="text-2xl font-semibold mb-2">
          Oops! Something went wrong.
          {statusCode && <span> Error: {statusCode}</span>}
        </h2>
        <p className="text-gray-700">
          {message || "An unexpected error occurred. Please try again."}
        </p>
      </div>
      {onRetry && (
        <Button
          onClick={onRetry}
          className="mt-6 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none"
        >
          Retry
        </Button>
      )}
    </div>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
