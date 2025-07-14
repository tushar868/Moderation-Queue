import { useDispatch, useSelector } from 'react-redux'
import { approvePost, toggleSelect, openModal } from './postsSlice'
import { FaCheck, FaTimes, FaEye, FaUser } from 'react-icons/fa'

export default function PostItem({ post, index, setLastAction, setConfirm }) {
  const dispatch = useDispatch()
  const selected = useSelector(state => state.posts.selected.includes(post.id))
  const formattedDate = post.reportedAt ? post.reportedAt.slice(0, 10) : ''

  // dynamic badge style
  const statusBadge = post.status === 'approved'
    ? <span className="absolute top-3 right-4 px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">Approved</span>
    : post.status === 'rejected'
    ? <span className="absolute top-3 right-4 px-3 py-1 text-xs rounded-full bg-red-100 text-red-700">Rejected</span>
    : <span className="absolute top-3 right-4 px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">Pending Review</span>

  return (
    <div className="relative flex justify-between bg-white rounded-xl border border-gray-300 p-4 shadow hover:shadow-md transition">
      {/* Top right badge */}
      {statusBadge}

      {/* Left content */}
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => dispatch(toggleSelect(post.id))}
          className="accent-blue-600 w-5 h-5 mt-1"
        />
        <img
          src={post.imageUrl || "https://via.placeholder.com/60"}
          alt="cover"
          className="w-14 h-14 rounded object-cover"
        />
        <div>
          <div
            onClick={() => dispatch(openModal(post.id))}
            className="font-semibold text-lg hover:underline cursor-pointer"
          >
            {post.title}
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
            <FaUser className="text-gray-400" /> {post.author.username}
            <span className="text-gray-300">•</span> {formattedDate}
          </div>
          <div className="text-sm text-gray-600 mt-1 line-clamp-2">{post.content}</div>
          <div className="flex gap-2 mt-2 flex-wrap">
            <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600">
              Reason: {post.reportedReason}
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-red-50 text-red-600">
              ⚠ {post.reportCount} reports
            </span>
          </div>
        </div>
      </div>

      {/* Right-bottom buttons */}
      <div className="flex flex-col justify-end items-end ml-6">
        <div className="flex gap-2">
          <button
            onClick={() => dispatch(openModal(post.id))}
            className="flex items-center gap-2 px-4 py-1.5 text-sm border border-gray-300 rounded-full hover:bg-gray-100 transition"
          >
            <FaEye /> View
          </button>
          
          {/* Only show Approve / Reject if still pending */}
          {post.status === 'pending' && (
            <>
              <button
                onClick={() => {
                  dispatch(approvePost(post.id))
                  setLastAction({ postId: post.id })
                  setTimeout(() => setLastAction(null), 5000)
                }}
                className="flex items-center gap-2 px-4 py-1.5 text-sm bg-green-500 hover:bg-green-600 text-white rounded-full transition"
              >
                <FaCheck /> Approve
              </button>
              <button
                onClick={() => setConfirm({ type: 'reject', postId: post.id })}
                className="flex items-center gap-2 px-4 py-1.5 text-sm bg-red-500 hover:bg-red-600 text-white rounded-full transition"
              >
                <FaTimes /> Reject
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
