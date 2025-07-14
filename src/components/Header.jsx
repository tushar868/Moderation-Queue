import { FaRegCheckCircle, FaCircle } from 'react-icons/fa'

export default function Header() {
  return (
    <div className="flex justify-between items-center mb-20">
      
      {/* Left side with logo and text */}
      <div className="flex items-center gap-4">
        <div className="bg-blue-600 text-white p-2 rounded-full">
          <FaRegCheckCircle size={20} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Content Moderation</h1>
          <p className="text-sm text-gray-300">Review and manage reported content</p>
        </div>
      </div>

      {/* Right side with online and profile */}
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-green-200 p-1 rounded-2xl px-3 gap-2">
          <FaCircle className="text-green-500 text-xs" /> 
          <span className="text-sm text-green-900">Online</span> 
        </div>
        <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
          T
        </div>
      </div>

    </div>
  )
}
