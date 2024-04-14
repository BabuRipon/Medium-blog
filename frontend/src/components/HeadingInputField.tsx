import { ChangeEvent } from "react";

interface propType{
  onInputChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void,
  _id: string
}

export const HeadingInputField = ({onInputChangeHandler,_id}: propType) => {
  return (
    <div className="pb-2" key={_id}>
      <input
        id={_id}
        type="text"
        className="border border-gray-300 text-sm rounded focus:outline-none focus:ring-1 focus:border-blue-500 w-full p-1"
        placeholder="Heading..."
        onChange={onInputChangeHandler}
      />
    </div>
  )
}