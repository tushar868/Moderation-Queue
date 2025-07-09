import { useDispatch, useSelector } from 'react-redux'
import { approvePost, toggleSelect, openModal } from './postsSlice'

export default function PostItem({ post, index, setLastAction, setConfirm }) {
  const dispatch = useDispatch()
  const selected = useSelector(state => state.posts.selected.includes(post.id))

  const borderColor = post.status === 'approved'
    ? 'border-green-400'
    : post.status === 'rejected'
    ? 'border-red-400'
    : 'border-blue-400'

  const icon = post.reportedReason === 'Spam' ? '🚫'
    : post.reportedReason === 'Harassment' ? '😡'
    : post.reportedReason === 'Hate Speech' ? '⚠️'
    : '❗'

  const formattedDate = post.reportedAt ? post.reportedAt.slice(0, 10) : ''

  return (
    <div className={`max-w-3xl mx-auto border-t-4 ${borderColor} 
    ${index % 2 === 0 ? 'bg-gradient-to-br from-[#e0f2ff] to-[#f9f9ff]' : 'bg-gradient-to-br from-[#e0f2ff] to-[#f9f9ff]'}
    p-6 rounded-xl shadow hover:shadow-lg 
    hover:scale-[1.02] hover:rotate-0.5 
    transition-all duration-300 ease-out`}>
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => dispatch(toggleSelect(post.id))}
          className="mt-1 accent-blue-600 w-5 h-5"
        />
        <div className="flex-1">
          <div
            className="flex items-center gap-2 text-xl font-extrabold mb-1 cursor-pointer hover:underline"
            onClick={() => dispatch(openModal(post.id))}
          >
            <span className="text-2xl">{icon}</span>
            {post.title}
          </div>
          <div className="text-sm text-gray-500 mb-1">
            By {post.author.username}
          </div>
          <div className="text-xs mb-1">
            Reason: <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded">{post.reportedReason}</span>
          </div>
          <div className="text-xs text-gray-400 mb-4">
            Reported on: {formattedDate}
          </div>
          <div className="flex gap-4 mt-2">
            <button
              className="px-5 py-2 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600
              text-white rounded-full shadow-md transition transform hover:scale-105 active:scale-95 disabled:opacity-50"
              onClick={() => {
                dispatch(approvePost(post.id))
                setLastAction({ postId: post.id })
                setTimeout(() => setLastAction(null), 5000)
              }}
              disabled={post.status !== 'pending'}
            >
              Approve
            </button>
            <button
              className="px-5 py-2 bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600
              text-white rounded-full shadow-md transition transform hover:scale-105 active:scale-95 disabled:opacity-50"
              onClick={() => setConfirm({ type: 'reject', postId: post.id })}
              disabled={post.status !== 'pending'}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
