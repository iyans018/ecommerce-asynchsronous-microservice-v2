export default function Label({ text, htmlFor }) {
    return (
        <label className="text-md text-gray-800 font-medium" htmlFor={htmlFor}>
            {text}
        </label>
    )
}
  