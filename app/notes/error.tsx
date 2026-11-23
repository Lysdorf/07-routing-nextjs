"use client";

interface NotesErrorProps {
  error: Error;
  reset: () => void;
}

export default function NotesError({ error, reset }: NotesErrorProps) {
  return (
    <div>
      <h2>Something went wrong while loading notes.</h2>
      <p>{error.message}</p>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
