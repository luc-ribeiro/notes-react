import { useState, type ChangeEvent } from "react"
import { NewNoteCard } from "./components/new-note-card"
import { NoteCard } from "./components/note-card"

interface Note {
  id: string
  date: Date
  content: string
}

export function App() {
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Note[]>(getNotesFromStorage)

  function getNotesFromStorage() {
    const notesOnStorage = localStorage.getItem('notes')

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage)
    }

    return []
  }

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content
    }

    const notesArray = [newNote, ...notes]

    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value

    setSearch(query)
  }

  const filteredNotes = search !== ''
    ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    : notes

  return (
    <div className="mx-auto my-12 max-w-6xl space-y-6">
      <form className="w-full">
        <input
          type="text" placeholder="Search for a note..." className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-zinc-500" onChange={handleSearch} />
      </form>

      <div className="h-px bg-zinc-700" />

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {
          filteredNotes.map(note => {
            return <NoteCard key={note.id} note={note} />
          })
        }
      </div>
    </div>
  )
}