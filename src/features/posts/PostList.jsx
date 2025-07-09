import { useSelector, useDispatch } from 'react-redux'
import { setStatusFilter, approvePost, rejectPost, resetPost, openModal, closeModal, loadMore, batchReject } from './postsSlice'
import PostItem from './PostItem'
import BatchToolbar from '../../components/BatchToolbar'
import { useEffect, useState } from 'react'

export default function PostList() {
  const { posts, statusFilter, modalPostId, page, filters } = useSelector(state => state.posts)
  const dispatch = useDispatch()
  const [lastAction, setLastAction] = useState(null)
  const [confirm, setConfirm] = useState(null)

  // NEW: apply reportedReason + date range filters
  const filteredPosts = posts
    .filter(p => p.status === statusFilter)
    .filter(p =>
      (filters.reason === "" || p.reportedReason === filters.reason) &&
      (filters.from === "" || p.reportedAt >= filters.from) &&
      (filters.to === "" || p.reportedAt <= filters.to)
    )

  const visiblePosts = filteredPosts.slice(0, page * 5)
  const modalPost = posts.find(p => p.id === modalPostId)

  useEffect(() => {
    const handleKey = (e) => {
      if (modalPostId) {
        if (e.key === 'Escape') dispatch(closeModal())
        return
      }
      if (e.key.toLowerCase() === 'a' && filteredPosts.length) {
        const postId = filteredPosts[0].id
        dispatch(approvePost(postId))
        setLastAction({ postId })
        setTimeout(() => setLastAction(null), 5000)
      }
      if (e.key.toLowerCase() === 'r' && filteredPosts.length) {
        const postId = filteredPosts[0].id
        dispatch(rejectPost(postId))
        setLastAction({ postId })
        setTimeout(() => setLastAction(null), 5000)
      }
      if (e.key === ' ') {
        e.preventDefault()
        if (filteredPosts.length) dispatch(openModal(filteredPosts[0].id))
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [dispatch, filteredPosts, modalPostId])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#202036] to-[#34335C] p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-white">Moderation Queue</h1>

        {/* Tabs */}
        <div className="flex gap-4 justify-center mb-10">
          {['pending', 'approved', 'rejected'].map(status => (
            <button
              key={status}
              className={`px-6 py-2 rounded-full font-semibold transition 
              ${statusFilter === status
                ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg ring-4 ring-blue-200'
                : 'bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => dispatch(setStatusFilter(status))}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <BatchToolbar setConfirm={setConfirm} />

        <div className="mt-8 space-y-6">
          {visiblePosts.length ? visiblePosts.map(post => (
            <PostItem key={post.id} post={post} setLastAction={setLastAction} setConfirm={setConfirm} />
          )) : (
            <div className="text-center text-gray-300 mt-20">No posts to display</div>
          )}
        </div>

        {filteredPosts.length > visiblePosts.length && (
          <div className="text-center mt-12">
            <button
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-md 
              hover:from-blue-600 hover:to-blue-800 hover:shadow-xl transition transform hover:scale-105 active:scale-95"
              onClick={() => dispatch(loadMore())}
            >
              Load More
            </button>
          </div>
        )}

        {/* Content Modal */}
        {modalPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full ring-4 ring-blue-400 bg-gradient-to-br from-[#e0f2ff] to-[#f9f9ff]" role="dialog" aria-modal="true">
              <h2 className="text-2xl font-extrabold mb-2">{modalPost.title}</h2>
              <div className="text-sm text-gray-600 mb-4">
                By {modalPost.author.username} • Reported for: {modalPost.reportedReason} • Date: {modalPost.reportedAt}
              </div>
              <p className="mb-4">{modalPost.content}</p>
              {modalPost.imageUrl && (
                <img src={modalPost.imageUrl} alt="Attached" className="mb-4 rounded shadow" />
              )}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => {
                    const index = filteredPosts.findIndex(p => p.id === modalPost.id)
                    const prev = filteredPosts[index - 1]
                    if (prev) dispatch(openModal(prev.id))
                  }}
                  disabled={!filteredPosts[filteredPosts.findIndex(p => p.id === modalPost.id) - 1]}
                  className="px-5 py-2 border border-black rounded-full hover:bg-black hover:text-white transition disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => {
                    const index = filteredPosts.findIndex(p => p.id === modalPost.id)
                    const next = filteredPosts[index + 1]
                    if (next) dispatch(openModal(next.id))
                  }}
                  disabled={!filteredPosts[filteredPosts.findIndex(p => p.id === modalPost.id) + 1]}
                  className="px-5 py-2 border border-black rounded-full hover:bg-black hover:text-white transition disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <button
                onClick={() => dispatch(closeModal())}
                className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow hover:scale-105 active:scale-95 transition w-full"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {confirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm text-center ring-2 ring-red-300">
              <div className="text-lg font-bold mb-4 text-red-600">
                {confirm.type === 'reject'
                  ? 'Are you sure you want to reject this post?'
                  : 'Are you sure you want to reject selected posts?'}
              </div>
              <div className="flex justify-center gap-4">
                <button
                  className="px-5 py-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-full shadow hover:scale-105 active:scale-95 transition"
                  onClick={() => {
                    if (confirm.type === 'reject') {
                      dispatch(rejectPost(confirm.postId))
                      setLastAction({ postId: confirm.postId })
                      setTimeout(() => setLastAction(null), 5000)
                    } else if (confirm.type === 'batchReject') {
                      dispatch(batchReject())
                    }
                    setConfirm(null)
                  }}
                >
                  Yes, Reject
                </button>
                <button
                  className="px-5 py-2 border rounded-full hover:bg-gray-100 transition"
                  onClick={() => setConfirm(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {lastAction && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg transition">
            Action performed.
            <button
              onClick={() => {
                dispatch(resetPost(lastAction.postId))
                setLastAction(null)
              }}
              className="ml-4 underline"
            >
              Undo
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
