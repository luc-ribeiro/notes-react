import * as Dialog from '@radix-ui/react-dialog'
import { formatDistanceToNow } from 'date-fns'
import { X } from 'lucide-react'

interface NoteCardProps {
  note: {
    id: string
    date: Date
    content: string
  }
  onNoteDeleted: (id: string) => void
}

export function NoteCard({ note, onNoteDeleted }: NoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md text-left flex flex-col bg-zinc-800 p-5 gap-3 overflow-hidden relative hover:ring-2 ring-zinc-600 focus-visible:ring-2 outline-none">
        <span className="text-sm font-medium text-zinc-200">
          {formatDistanceToNow(note.date, { addSuffix: true })}
        </span>
        <p className="text-sm leading-6 text-zinc-400">
          {note.content}
        </p>

        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className='fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] md:h-[60vh] w-full bg-zinc-700 md:rounded-md flex flex-col outline-none overflow-hidden'>
          <Dialog.Close className='absolute right-0 top-0 bg-zinc-800 p-1.5 text-zinc-400 hover:text-zinc-100'>
            <X className='size-5' />
          </Dialog.Close>

          <div className='flex flex-1 flex-col gap-3 p-5'>
            <span className="text-sm font-medium text-zinc-200">
              {formatDistanceToNow(note.date, { addSuffix: true })}
            </span>
            <p className="text-sm leading-6 text-zinc-400">
              {note.content}
            </p>
          </div>

          <button
            onClick={() => onNoteDeleted(note.id)}
            type="button"
            className='w-full bg-zinc-800 py-4 text-center text-sm text-zinc-300 outline-none font-medium group'
          >
            Do you want to <span className='text-red-400 group-hover:underline'>delete this note?</span>
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}