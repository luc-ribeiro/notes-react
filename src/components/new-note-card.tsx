export function NewNoteCard() {
  return (
    <div className="rounded-md bg-zinc-700 p-5 space-y-6">
    <span className="text-sm font-medium text-zinc-200">
      Add note
    </span>
    <p className="text-sm leading-6 text-zinc-400">
      Record a audio note that will be converted to a text automatically.
    </p>
  </div>
  )
}