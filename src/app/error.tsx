'use client';

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error, reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-white text-black flex items-center justify-center h-screen">
      <div className="flex items-center justify-center flex-col">
        <h2 className="text-center">Something went wrong!</h2>
        <button
          onClick={() => reset()}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
