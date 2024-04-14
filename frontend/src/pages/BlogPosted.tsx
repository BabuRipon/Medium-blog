import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { HeadingInputField } from "../components/HeadingInputField";
import { ParagraphInputField } from "../components/ParagraphInputField";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface inputType {
  fieldType: string,
  fontSize: string,
  fontWeight: string,
  data: string,
  _id: string
}

export const BlogPosted = () => {
  const inputType = [
    {
      fieldType: 'Heading',
      fontSize: 'text-2xl',
      fontWeight: 'font-bold',
      data: '',
      _id: ''
    },
    {
      fieldType: 'Paragraph',
      fontSize: 'text-sm',
      fontWeight: 'font-medium',
      data: '',
      _id: '',
    }
  ]
  const [inputField, setInputField] = useState<any>({
    title: '',
    content: '' ,
    more:[]
  });

  const navigate = useNavigate();

  const [clicked, setClicked] = useState(false);
  // select an input field
  const onSelectInputHandler = () => {
    setClicked(preState=>!preState);
  }
  // function to handle input change for dynamic input field
  const onInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // get a copy of more array input field
    const forUpdatedArray = inputField.more;
    // find the index which is being updated
    const index = forUpdatedArray.findIndex((el: inputType)=>el._id===e.target.id);
    // updated that field input value into the object.
    forUpdatedArray[index].data = e.target.value;
    // updated the state value again
    setInputField({...inputField,more: forUpdatedArray});
  }
  // on blog posted handler
  const onBlogPostHandler = async () => {
    const newPostData = {
      title: inputField.title,
      content: inputField.content,
      published: true,
    }
    try{
      const res = await axios.post(`${BACKEND_URL}/api/v1/blog`, newPostData ,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('medium_user_token'),
        }
    });
    console.log(res);
    // navigate to blogs page on successfully posted the blog
    navigate('/blogs')
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className="mx-8 my-2">
      <div className="w-full grid grid-cols-12">
        <div className="flex col-span-2 relative">
          <div className="w-10 h-10 text-3xl text-center font-thin cursor-pointer border rounded-full" onClick={onSelectInputHandler}>+</div>
          {!clicked && <div className="ml-4 border-l border-slate-200 h-20"></div>}
          {
            clicked && (
              <div className="border-x border-t absolute border-slate-200 top-12">
                <div className="flex flex-col w-40 text-center">
                  {inputType.map((fieldData, index) => (
                    <span
                      className="w-full py-2 hover:bg-slate-200 cursor-pointer border-b text-base font-thin"
                      key={index}
                      onClick={()=>{
                        fieldData._id = uuidv4();
                        setInputField({...inputField, more: [...inputField.more, fieldData]})
                        setClicked(false);
                      }}  
                    >{fieldData.fieldType}</span>
                  ))}
                </div>
              </div>
            )
          }
        </div>
        <div className="col-span-10">
          <div className="flex flex-col w-3/5">
            <div className="pb-2">
              <input
                type="text"
                className="border border-gray-300 text-sm rounded focus:outline-none focus:ring-1 focus:border-blue-500 w-full p-1"
                placeholder="Type blog title..."
                onChange={(e)=>{
                 setInputField({...inputField,title:e.target.value})
                }}
              />
            </div>
            <div className="pb-2">
              <textarea
                rows={4}
                className="block p-1 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write a short description of your blog..."
                onChange={(e)=>{
                  setInputField({...inputField,content: e.target.value})
                }}  
              ></textarea>
            </div>
            {
              /* dynamic form start*/
              // Return heading input field for heading text
              inputField.more.map((data: any) => {
                if(data.fieldType === 'Heading'){
                  return (
                    <HeadingInputField
                      onInputChangeHandler={onInputChangeHandler}
                      _id={data._id}
                    />
                  )
                 }
  
                 if(data.fieldType === 'Paragraph'){
                  return (
                    <ParagraphInputField
                      onInputChangeHandler={onInputChangeHandler}
                      _id={data._id}
                    />
                  )
                 }
                 return null;
              })
              /* dynamic form end */
            }
            <div className='pt-2'>
              <button onClick={onBlogPostHandler} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium rounded text-sm py-2 px-8 text-center ">Post</button>
            </div>
          </div>
        </div>
       </div>
    </div>
  )
}