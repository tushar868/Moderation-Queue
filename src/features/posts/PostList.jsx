import { useDispatch, useSelector } from 'react-redux'
import { setStatusFilter, approvePost, rejectPost, resetPost, openModal, closeModal, loadMore, batchReject } from './postsSlice'
import PostItem from './PostItem'
import BatchToolbar from '../../components/BatchToolbar'
import Header from '../../components/Header'
import PostDialog from './PostDialog'
import { useEffect, useState } from 'react'

export default function PostList() {
  const { posts, statusFilter, modalPostId, page, filters } = useSelector(state => state.posts)
  const dispatch = useDispatch()
  const [lastAction, setLastAction] = useState(null)
  const [confirm, setConfirm] = useState(null)

  // counts for tabs
  const pendingCount = posts.filter(p => p.status === 'pending').length
  const approvedCount = posts.filter(p => p.status === 'approved').length
  const rejectedCount = posts.filter(p => p.status === 'rejected').length

  // filter posts
  const filteredPosts = posts
    .filter(p => p.status === statusFilter)
    .filter(p =>
      (filters.reason === "" || p.reportedReason === filters.reason) &&
      (filters.from === "" || p.reportedAt >= filters.from) &&
      (filters.to === "" || p.reportedAt <= filters.to)
    )

  const visiblePosts = filteredPosts.slice(0, page * 5)
  const modalPost = posts.find(p => p.id === modalPostId)

  // keyboard shortcuts
  useEffect(() => {
    const handleKey = (e) => {
      if (modalPostId) {
        if (e.key === 'Escape') dispatch(closeModal())
        if (e.key === 'ArrowLeft') goPrev()
        if (e.key === 'ArrowRight') goNext()
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

  // modal prev / next
  const goPrev = () => {
    const idx = filteredPosts.findIndex(p => p.id === modalPostId)
    if (idx > 0) dispatch(openModal(filteredPosts[idx - 1].id))
  }
  const goNext = () => {
    const idx = filteredPosts.findIndex(p => p.id === modalPostId)
    if (idx < filteredPosts.length - 1) dispatch(openModal(filteredPosts[idx + 1].id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#202036] to-[#34335C] p-6">
      <div className="max-w-6xl mx-auto">

        <Header />

        {/* Tabs with counts */}
        <div className="flex justify-center gap-6 mb-10 flex-wrap">
          <button
            onClick={() => dispatch(setStatusFilter('pending'))}
            className={`px-8 py-2 rounded-full font-semibold transition 
              ${statusFilter === 'pending' 
                ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-lg'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
          >
            Pending <span className="ml-2 font-bold">{pendingCount}</span>
          </button>
          <button
            onClick={() => dispatch(setStatusFilter('approved'))}
            className={`px-8 py-2 rounded-full font-semibold transition 
              ${statusFilter === 'approved' 
                ? 'bg-gradient-to-r from-green-400 to-green-500 text-white shadow-lg'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
          >
            Approved <span className="ml-2 font-bold">{approvedCount}</span>
          </button>
          <button
            onClick={() => dispatch(setStatusFilter('rejected'))}
            className={`px-8 py-2 rounded-full font-semibold transition 
              ${statusFilter === 'rejected' 
                ? 'bg-gradient-to-r from-red-400 to-red-500 text-white shadow-lg'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
          >
            Rejected <span className="ml-2 font-bold">{rejectedCount}</span>
          </button>
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

        {/* Modal */}
        <PostDialog 
          post={modalPost}
          onClose={() => dispatch(closeModal())}
          onApprove={(id) => {
            dispatch(approvePost(id));
            setLastAction({ postId: id });
            setTimeout(() => setLastAction(null), 5000);
          }}
          onReject={(id) => {
            dispatch(rejectPost(id));
            setLastAction({ postId: id });
            setTimeout(() => setLastAction(null), 5000);
          }}
          onPrev={() => {/* your prev logic */}}
          onNext={() => {/* your next logic */}}
          statusFilter={statusFilter}
       />


        {/* Confirm */}
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

        {/* Undo */}
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
