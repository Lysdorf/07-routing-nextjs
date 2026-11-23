"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import Modal from "../../components/Modal/Modal";
import NoteForm from "../../components/NoteForm/NoteForm";
import NoteList from "../../components/NoteList/NoteList";
import Pagination from "../../components/Pagination/Pagination";
import SearchBox from "../../components/SearchBox/SearchBox";
import { fetchNotes } from "../../lib/api";

import css from "./Notes.module.css";

export default function Notes() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setCurrentPage(1);
    setSearchValue(value);
  }, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", currentPage, searchValue],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        perPage: 12,
        ...(searchValue ? { search: searchValue } : {}),
      }),
    placeholderData: keepPreviousData,
  });

  const handleSearch = (value: string) => {
    debouncedSearch(value);
  };

  if (isLoading) {
    return <p>Loading notes...</p>;
  }

  if (isError) {
    return <p>Something went wrong. Please try again.</p>;
  }

  return (
    <section className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={searchValue} onSearch={handleSearch} />

        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

        <button
          className={css.createButton}
          type="button"
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </div>

      {data && data.notes.length > 0 ? (
        <NoteList
          notes={data.notes}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      ) : (
        <p>No notes found.</p>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </section>
  );
}
