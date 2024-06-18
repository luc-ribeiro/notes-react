import { NewNoteCard } from "./components/new-note-card"
import { NoteCard } from "./components/note-card"

export function App() {
  return (
    <div className="mx-auto my-12 max-w-6xl space-y-6">
      <form className="w-full">
        <input
          type="text" placeholder="Search for a note..." className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-zinc-500" />
      </form>

      <div className="h-px bg-zinc-700" />

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard />

        <NoteCard />

        <NoteCard />
      </div>
    </div>
  )
}