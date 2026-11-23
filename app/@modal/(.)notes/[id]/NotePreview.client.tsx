"use client";

import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";

interface NotePreviewProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewProps) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) {
    return <p>Loading note...</p>;
  }

  if (isError || !note) {
    return <p>Could not find this note.</p>;
  }

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <article className={css.item}>
          <header className={css.header}>
            <h2>{note.title}</h2>
            <button type="button" className={css.backBtn} onClick={handleClose}>
              Close
            </button>
          </header>

          <p className={css.content}>{note.content}</p>

          <p className={css.date}>
            Created: {new Date(note.createdAt).toLocaleDateString("en-GB")}
          </p>

          <span className={css.tag}>{note.tag}</span>
        </article>
      </div>
    </Modal>
  );
}
