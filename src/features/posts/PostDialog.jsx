import { useDispatch } from 'react-redux'
import { FaTimes, FaCheck, FaExclamationTriangle, FaUser } from 'react-icons/fa'
import { setStatusFilter } from './postsSlice'

export default function PostDialog({ post, onClose, onApprove, onReject, onPrev, onNext, statusFilter }) {
  const dispatch = useDispatch()

  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col">

        {/* Fixed inside modal with sticky */}
        <div className="sticky top-0 bg-white z-10 border-b p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
              <FaExclamationTriangle />
            </div>
            <h2 className="text-xl font-bold">Post Details</h2>
          </div>
          <div className="flex gap-2">
            <button onClick={onPrev} className="text-gray-400 hover:text-black px-2">&lt;</button>
            <button onClick={onNext} className="text-gray-400 hover:text-black px-2">&gt;</button>
            <button onClick={onClose} className="text-gray-400 hover:text-black">
              <FaTimes size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable content below header */}
        <div className="overflow-y-auto p-6 space-y-6">
          <h3 className="text-2xl font-bold">{post.title}</h3>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple-200 text-purple-700 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                {post.author.username[0].toUpperCase()}
              </div>
              <div>
                <div className="font-semibold">@{post.author.username}</div>
                <div className="text-xs text-gray-500">Posted {new Date(post.reportedAt).toLocaleString()}</div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                {post.reportedReason}
              </div>
              <div className="flex items-center gap-1 text-sm text-red-600">
                <FaExclamationTriangle /> {post.reportCount} reports
              </div>
            </div>
          </div>

          {post.imageUrl && (
            <img src={post.imageUrl} alt="Post" className="rounded-lg w-full object-cover max-h-[400px]" />
          )}

          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <h4 className="font-semibold mb-2">Content</h4>
            <p className="text-gray-700">{post.content}</p>
          </div>

          <div className="bg-red-50 p-4 rounded-xl shadow-inner">
            <h4 className="font-semibold mb-3 text-red-700">Report Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-red-800">
              <div>
                <div className="font-semibold">Reason</div>
                <div>{post.reportedReason}</div>
              </div>
              <div>
                <div className="font-semibold">Report Count</div>
                <div>{post.reportCount}</div>
              </div>
              <div>
                <div className="font-semibold">Reported At</div>
                <div>{new Date(post.reportedAt).toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar stays after content */}
        <div className="border-t p-6 flex justify-between items-center">
          <div className="text-xs text-gray-400">ESC Close • ← → Navigate</div>

          {statusFilter === 'pending' && (
            <div className="flex gap-4">
              <button
                onClick={() => {
                  onReject(post.id)
                  dispatch(setStatusFilter('rejected'))
                  onClose()
                }}
                className="flex items-center gap-2 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow"
              >
                <FaTimes /> Reject Post
              </button>
              <button
                onClick={() => {
                  onApprove(post.id)
                  dispatch(setStatusFilter('approved'))
                  onClose()
                }}
                className="flex items-center gap-2 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow"
              >
                <FaCheck /> Approve Post
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
