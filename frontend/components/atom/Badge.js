export default function Badge({ text }) {
  return (
    <div className="inline-block">
      <span style={{ borderRadius: '36px' }} className="inline-block bg-red-500 text-xs text-white px-2 py-0.5">{text}</span>
    </div>
  )
}
