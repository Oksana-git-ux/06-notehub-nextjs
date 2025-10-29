import axios from 'axios';
import { type Note, type NewNote } from '@/types/note'; 

const BASE_URL = 'https://notehub-public.goit.study/api';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface FetchNotesResponse {
    notes: Note[];
    perPage: number;
    total: number;
    totalPages: number;
}

export interface NotesQueryResult {
    notes: Note[];
    totalPages: number;
    totalNotes: number;
}

interface FetchNotesParams {
    page?: number;
    search?: string;
    perPage?: number;
}

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
    },
});

export async function fetchNotes({ 
    page = 1, 
    perPage = 12, 
    search = '' 
}: FetchNotesParams): Promise<NotesQueryResult> {
    
    if (!TOKEN) throw new Error("API Token is missing.");

    const response = await axiosInstance.get<FetchNotesResponse>('/notes', {
        params: { page, perPage, search },
    });

    return {
        notes: response.data.notes,
        totalPages: response.data.totalPages,
        totalNotes: response.data.total,
    };
}

export async function createNote(noteData: NewNote): Promise<Note> {
    if (!TOKEN) throw new Error("API Token is missing.");
    
    const response = await axiosInstance.post<Note>('/notes', noteData);
    return response.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
    if (!TOKEN) throw new Error("API Token is missing.");
    
    const response = await axiosInstance.delete<Note>(`/notes/${noteId}`);
    return response.data;
}

export async function fetchNoteById(noteId: string): Promise<Note> {
    if (!TOKEN) throw new Error("API Token is missing.");

    const response = await axiosInstance.get<Note>(`/notes/${noteId}`); 
    return response.data;
}