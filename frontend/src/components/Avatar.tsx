export const Avatar = ({name, size='small'}: {name: string, size?: 'big'|'small'}) => {
  return (     
  <div
    className={`relative inline-flex items-center justify-center ${size === 'small' ? 'w-6 h-6' : 'w-8 h-8'} overflow-hidden ${size==='small'?'bg-gray-200':'bg-gray-100'} rounded-full`}
  >
    <span className="font-medium text-gray-600">{name[0].toUpperCase()}</span>
  </div>
  )
}