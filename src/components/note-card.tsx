export function NoteCard() {
  return (
    <button className="rounded-md text-left bg-zinc-800 p-5 space-y-6 overflow-hidden relative hover:ring-2 ring-zinc-600 focus-visible:ring-2 outline-none">
    <span className="text-sm font-medium text-zinc-200">
      2 days ago
    </span>
    <p className="text-sm leading-6 text-zinc-400">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at, voluptatum, tempora numquam quidem cupiditate dolore culpa, ex soluta quaerat fuga magni quae libero nulla? Eligendi ullam tempore delectus praesentium.
    </p>

    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
  </button>
  )
}