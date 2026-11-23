"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { fetchNoteById } from "../../../lib/api";

interface NoteDetailsProps {
  id: string;
}

export default function NoteDetails({ id }: NoteDetailsProps) {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading note...</p>;
  }

  if (isError || !note) {
    return <p>Could not find this note.</p>;
  }

  return (
    <article>
      <Link href="/notes">← Back to notes</Link>

      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <span>{note.tag}</span>
    </article>
  );
}
