import axios from "axios";
import type { Note, NoteTag } from "../types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

const API_URL = "https://notehub-public.goit.study/api";

const getAuthHeaders = () => ({
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
});

export async function fetchNotes(
  params: FetchNotesParams,
): Promise<FetchNotesResponse> {
  const response = await axios.get<FetchNotesResponse>(`${API_URL}/notes`, {
    params,
    headers: getAuthHeaders(),
  });

  return response.data;
}

export async function createNote(noteData: CreateNoteData): Promise<Note> {
  const response = await axios.post<Note>(`${API_URL}/notes`, noteData, {
    headers: getAuthHeaders(),
  });

  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await axios.delete<Note>(`${API_URL}/notes/${id}`, {
    headers: getAuthHeaders(),
  });

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await axios.get<Note>(`${API_URL}/notes/${id}`, {
    headers: getAuthHeaders(),
  });

  return response.data;
}
