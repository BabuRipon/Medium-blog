import { ChangeEvent } from "react";

interface propType{
  label: string,
  placeholder: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  type?: string,
}
const LabelInput = ({label, type, placeholder, onChange}: propType) => {
  return (
    <div className="flex flex-col w-full px-2 pb-1">
      <label className="block mb-1 text-lg font-medium text-gray-900 dark:text-white">{label}</label>
      <input
        type={type || "text"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-1 focus:border-blue-900 focus:outline-none focus:ring-1"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  )
}

export default LabelInput;
