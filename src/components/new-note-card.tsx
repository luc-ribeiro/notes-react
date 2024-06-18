import { useState, type ChangeEvent, type FormEvent } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { toast } from 'sonner'

export function NewNoteCard() {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
  const [content, setContent] = useState('')

  function handleStartEditor() {
    setShouldShowOnboarding(false)
  }

  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value)

    if (event.target.value === '') {
      setShouldShowOnboarding(true)
    }
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault()

    toast.success('Note saved!')
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md flex flex-col  bg-zinc-700 p-5 text-left gap-3 hover:ring-2 ring-zinc-600 focus-visible:ring-2 outline-none">
        <span className="text-sm font-medium text-zinc-200">
          Add note
        </span>
        <p className="text-sm leading-6 text-zinc-400">
          Record a audio note that will be converted to a text automatically.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] h-[60vh] w-full bg-zinc-700 rounded-md flex flex-col outline-none overflow-hidden'>
          <Dialog.Close className='absolute right-0 top-0 bg-zinc-800 p-1.5 text-zinc-400 hover:text-zinc-100'>
            <X className='size-5' />
          </Dialog.Close>

          <form onSubmit={handleSaveNote} className='flex flex-col flex-1'>
            <div className='flex flex-1 flex-col gap-3 p-5'>
              <span className="text-sm font-medium text-zinc-200">
                Add note
              </span>
              {
                shouldShowOnboarding ? (
                  <p className="text-sm leading-6 text-zinc-400">
                    Start <button className='font-medium text-lime-600 hover:underline'>recording an audio note</button> or you can <button onClick={handleStartEditor} className='font-medium text-lime-600 hover:underline'>use text</button> if you like.
                  </p>
                ) : (
                  <textarea autoFocus className='text-sm leading-6 text-zinc-400 bg-transparent resize-none flex-1 outline-none' onChange={handleContentChange} />
                )
              }
            </div>

            <button
              type="submit"
              className='w-full bg-lime-600 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-700'
            >
              Save note
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}