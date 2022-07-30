export default function Input({ type, name, placeholder, value, id, children, onChange }) {
    const className = `
        form-control block w-full px-3 py-1.5 text-base
        font-normal text-gray-700 bg-white bg-clip-padding
        border border-solid border-gray-300 rounded transition ease-in-out m-0
        focus:text-gray-700 focus:bg-white focus:border-red-500 focus:outline-none
    `;

    if (type === 'textarea') {
        return (
            <textarea
                className={`${className} h-56`}
                name={name}
                id={id}
                placeholder={placeholder}
                onChange={onChange}
            >
                {value}
            </textarea>
        )
    } else if (type === 'select') {
        return (
            <select className={className} name={name} id={id} onChange={onChange}>
                {children}
            </select>
        )
    } else if (type === 'checkbox') {
        return (
            <input 
                id={id}
                type={type} 
                name={name} 
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        )
    } else {
        return (
            <input 
                className={className}
                id={id}
                type={type} 
                name={name} 
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        )
    }
}