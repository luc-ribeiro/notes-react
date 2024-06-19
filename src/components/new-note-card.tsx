import { useState, type ChangeEvent, type FormEvent } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { toast } from 'sonner'

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void
}

let speechRecognition: SpeechRecognition | null = null

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
  const [isRecording, setIsRecording] = useState(false)
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

    if (content === '') {
      return
    }

    onNoteCreated(content)

    setContent('')
    setShouldShowOnboarding(true)

    toast.success('Note saved!')
  }

  function handleStartRecording() {
    const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

    if (!isSpeechRecognitionAPIAvailable) {
      alert('Unfortunately, your browser does not support speech recognition.')
      setIsRecording(false)
      return
    }

    setIsRecording(true)
    setShouldShowOnboarding(false)

    const speechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

    speechRecognition = new speechRecognitionAPI()

    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true
    
    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')

      setContent(transcription)
    }

    speechRecognition.onerror = (event) => {
      console.error(event.error)
    }

    speechRecognition.start()
  }

  function handleStopRecording() {
    setIsRecording(false)

    if (speechRecognition !== null) {
      speechRecognition.stop()
    }
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
        <Dialog.Content className='fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] md:h-[60vh] w-full bg-zinc-700 md:rounded-md flex flex-col outline-none overflow-hidden'>
          <Dialog.Close className='absolute right-0 top-0 bg-zinc-800 p-1.5 text-zinc-400 hover:text-zinc-100'>
            <X className='size-5' />
          </Dialog.Close>

          <form className='flex flex-col flex-1'>
            <div className='flex flex-1 flex-col gap-3 p-5'>
              <span className="text-sm font-medium text-zinc-200">
                Add note
              </span>
              {
                shouldShowOnboarding ? (
                  <p className="text-sm leading-6 text-zinc-400">
                    Start <button type='button' onClick={handleStartRecording} className='font-medium text-lime-600 hover:underline'>recording an audio note</button> or you can <button type='button' onClick={handleStartEditor} className='font-medium text-lime-600 hover:underline'>use text</button> if you like.
                  </p>
                ) : (
                  <textarea autoFocus className='text-sm leading-6 text-zinc-400 bg-transparent resize-none flex-1 outline-none' onChange={handleContentChange} value={content} />
                )
              }
            </div>

            {
              isRecording ? (
                <button
                  type="button"
                  onClick={handleStopRecording}
                  className='w-full flex items-center justify-center gap-2 bg-zinc-900 py-4 text-center text-sm text-zinc-300 outline-none font-medium hover:text-slate-100'
                >
                  <div className='size-3 rounded-full bg-red-500 animate-pulse'/>
                  Recording! (click to stop)
                </button>

              ) : (
                <button
                  type="button"
                  onClick={handleSaveNote}
                  className='w-full bg-lime-600 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-700'
                >
                  Save note
                </button>
              )
            }
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}