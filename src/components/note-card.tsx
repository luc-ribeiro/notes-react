import * as Dialog from '@radix-ui/react-dialog'
import { formatDistanceToNow } from 'date-fns'
import { X } from 'lucide-react'

interface NoteCardProps {
  note: {
    date: Date
    content: string
  }
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md text-left flex flex-col bg-zinc-800 p-5 gap-3 overflow-hidden relative hover:ring-2 ring-zinc-600 focus-visible:ring-2 outline-none">
        <span className="text-sm font-medium text-zinc-200">
          {note.date.toString()}
        </span>
        <p className="text-sm leading-6 text-zinc-400">
          {note.content}
        </p>

        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] h-[60vh] w-full bg-zinc-700 rounded-md flex flex-col outline-none overflow-hidden'>
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