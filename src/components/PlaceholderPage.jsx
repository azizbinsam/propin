export default function PlaceholderPage({ title, description }) {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[60vh] px-6">
      <div className="w-14 h-14 rounded-full bg-gold-50 flex items-center justify-center mb-4">
        <span className="text-gold-600 font-bold text-lg">P</span>
      </div>
      <h1 className="text-xl font-bold text-neutral-800">{title}</h1>
      <p className="text-neutral-500 mt-2 max-w-sm">{description}</p>
      <span className="mt-4 inline-block text-xs font-semibold text-gold-700 bg-gold-50 px-3 py-1 rounded-full">
        Akan dibangun di Part berikutnya
      </span>
    </div>
  )
}