import { useDispatch, useSelector } from 'react-redux'
import { selectAll, clearSelected, batchApprove, setStatusFilter, setFilters } from '../features/posts/postsSlice'
import { useState, useEffect } from 'react'
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/themes/material_blue.css"

export default function BatchToolbar({ setConfirm }) {
  const dispatch = useDispatch()
  const selectedCount = useSelector(state => state.posts.selected.length)
  const { statusFilter, posts } = useSelector(state => state.posts)

  const [selectedReason, setSelectedReason] = useState("")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")

  useEffect(() => {
    dispatch(setFilters({
      reason: selectedReason,
      from: fromDate,
      to: toDate
    }))
  }, [selectedReason, dispatch])

  const applyDateFilter = () => {
    dispatch(setFilters({
      reason: selectedReason,
      from: fromDate,
      to: toDate
    }))
  }

  // counts
  const pendingCount = posts.filter(p => p.status === 'pending').length
  const approvedCount = posts.filter(p => p.status === 'approved').length
  const rejectedCount = posts.filter(p => p.status === 'rejected').length

  return (
    <>
      {/* TABS */}
      

      {/* FILTERS */}
      <div className="flex flex-wrap justify-center items-center gap-4 
        bg-white/10 backdrop-blur-lg px-6 py-4 rounded-xl shadow mb-6">

        <select
          value={selectedReason}
          onChange={(e) => setSelectedReason(e.target.value)}
          className="
            appearance-none bg-white text-black border-none 
            rounded-full px-5 py-2 shadow 
            focus:outline-none focus:ring-2 focus:ring-blue-400 
            transition
            bg-[url('data:image/svg+xml;utf8,<svg fill=\'black\' height=\'20\' viewBox=\'0 0 24 24\' width=\'20\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>')]
            bg-no-repeat bg-[right_1rem_center]
            pr-10
          "
        >
          <option value="">All Reasons</option>
          <option value="Spam">Spam</option>
          <option value="Harassment">Harassment</option>
          <option value="Hate Speech">Hate Speech</option>
          <option value="Fake News">Fake News</option>
        </select>

        <Flatpickr
          options={{ dateFormat: "d-m-Y" }}
          value={fromDate}
          onChange={([date]) => setFromDate(date)}
          placeholder="dd-mm-yyyy"
          className="
            border-none rounded-full px-5 py-2 
            bg-white text-black shadow 
            focus:ring-2 focus:ring-blue-400 transition
            w-[180px]
          "
        />

        <Flatpickr
          options={{ dateFormat: "d-m-Y" }}
          value={toDate}
          onChange={([date]) => setToDate(date)}
          placeholder="dd-mm-yyyy"
          className="
            border-none rounded-full px-5 py-2 
            bg-white text-black shadow 
            focus:ring-2 focus:ring-blue-400 transition
            w-[180px]
          "
        />

        <button
          onClick={applyDateFilter}
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white 
          rounded-full shadow hover:scale-105 active:scale-95 transition"
        >
          Filter Dates
        </button>

        <button
          onClick={() => {
            setSelectedReason("")   
            setFromDate("")       
            setToDate("")           
            dispatch(setFilters({
              reason: "",
              from: "",
              to: ""
            }))
          }}
          className="px-6 py-2 bg-gradient-to-r from-gray-400 to-gray-600 text-white 
          rounded-full shadow hover:scale-105 active:scale-95 transition"
        >
          Reset
        </button>
      </div>

      {/* SELECT ALL for Pending */}
      {statusFilter === 'pending' && (
        <>
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => dispatch(selectAll())}
              className="px-6 py-2 border border-white rounded-full text-white 
              hover:bg-gray-100 hover:text-black transition shadow"
            >
               Select All
            </button>
          </div>

          {selectedCount > 0 && (
            <div className="flex flex-wrap justify-between items-center bg-blue-100 text-blue-800 px-6 py-3 rounded-xl shadow mb-6">
              <div className="font-semibold text-lg flex items-center gap-2">
                🔵 {selectedCount} posts selected
                <button
                  onClick={() => dispatch(clearSelected())}
                  className="flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-blue-200 rounded-full transition"
                >
                  ❌ Clear selection
                </button>
              </div>
              <div className="flex flex-wrap gap-4 mt-2 sm:mt-0">
                <button
                  onClick={() => dispatch(batchApprove())}
                  className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full 
                  shadow-md transition transform hover:scale-105 active:scale-95"
                >
                  ✅ Approve All ({selectedCount})
                </button>
                <button
                  onClick={() => setConfirm({ type: 'batchReject' })}
                  className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full 
                  shadow-md transition transform hover:scale-105 active:scale-95"
                >
                  ❌ Reject All ({selectedCount})
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}
