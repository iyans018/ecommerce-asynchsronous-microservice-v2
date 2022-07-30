import { Input, Label, Spacer } from "../atom"

export default function InputLabel({ label, type, placeholder, name, value, id, children, htmlFor, onChange }) {
    if (type === 'checkbox') {
        return (
            <div className="form-check flex flex-row gap-2">
                <Input type="checkbox" placeholder={placeholder} name={name} value={value} id={id} onChange={onChange} />
                <Label text={label} htmlFor={htmlFor}/>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col">
                <Label text={label} />
                <Spacer size={6}/>
                {type === 'select' ? (
                    <Input type="select" placeholder={placeholder} name={name} value={value} id={id} onChange={onChange}>
                        {children}
                    </Input>
                ) : (
                    <Input type={type} placeholder={placeholder} name={name} value={value} id={id} onChange={onChange}/>
                )}
            </div>
        )
    }
}
  