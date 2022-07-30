export default function Button({ variant, text, small, onClick }) {
  const className = `
    ${small ? 'py-2 px-4 text-md' : 'py-4 px-8 text-lg'} 
    font-medium rounded-md border-slate-400
  `;

  if (variant === 'white') {
    return (
      <button onClick={onClick} className={`${className} border-2 border-black text-black bg-white hover:bg-black hover:border-black hover:text-white`}>
        {text}
      </button>
    )
  } else if (variant === 'primary') {
    return (
      <button onClick={onClick} className={`${className} text-red-50 bg-red-500 hover:bg-red-700`}>
        {text}
      </button>
    )
  } else {
    return (
      <button onClick={onClick} className={`${className} text-red-50 bg-red-500 hover:bg-red-700`}>
        {text}
      </button>
    )
  }
}
