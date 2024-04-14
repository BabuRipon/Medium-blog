import { ChangeEvent } from "react";

interface propType{
  onInputChangeHandler: (e: ChangeEvent<HTMLTextAreaElement>) => void,
  _id: string,
}

export const ParagraphInputField = ({onInputChangeHandler, _id}: propType) => {
  return (
    <div className="pb-2" key={_id}>
      <textarea
        id = {_id}
        rows={8}
        className="block p-1 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        placeholder="Paragraph..."
        onChange={onInputChangeHandler}  
      ></textarea>
    </div>
  )
  }