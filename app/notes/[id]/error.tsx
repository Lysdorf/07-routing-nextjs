"use client";

interface NoteErrorProps {
  error: Error;
  reset: () => void;
}

export default function NoteError({ error, reset }: NoteErrorProps) {
  return (
    <div>
      <h2>Something went wrong while loading this note.</h2>
      <p>{error.message}</p>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
