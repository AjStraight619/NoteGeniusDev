'use client';
import { useState, useEffect } from 'react';
import { useFetchData } from '@/hooks/useFetchData';

type FolderOption = {
  id: string;
  name: string;
};

type NoteOption = {
  id: string;
  title: string;
};

type RefinedNoteOption = {
  id: string;
  title: string;
};

export default function CreateNotePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFolderId, setSelectedFolderId] = useState<FolderOption | null>(
    null
  );
  const [selectedNoteId, setSelectedNoteId] = useState<NoteOption | null>(null);
  const [selectedRefinedNoteId, setSelectedRefinedNoteId] =
    useState<RefinedNoteOption | null>(null);
  const [item, setItem] = useState<'Folder' | 'Note' | 'RefinedNote' | null>(
    null
  );
  const [id, setID] = useState('');

  const fetchData = useFetchData(item, id);
}
