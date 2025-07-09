import { useDispatch, useSelector } from 'react-redux'
import { selectAll, clearSelected, batchApprove, setFilters } from '../features/posts/postsSlice'
import { useState, useEffect } from 'react'
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/themes/material_blue.css" 

export default function BatchToolbar({ setConfirm }) {
  const selectedCount = useSelector(state => state.posts.selected.length)
  const dispatch = useDispatch()

  const [selectedReason, setSelectedReason] = useState("")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")

  // auto filter reason
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

  return (
    <>
    
      
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <button
          className="px-4 py-1.5 border border-white rounded-full hover:bg-gray-100 hover:text-black transition text-white"
          onClick={() => dispatch(selectAll())}
        >
          Select All
        </button>
        <button
          className="px-4 py-1.5 border border-white rounded-full hover:bg-gray-100 hover:text-black transition text-white"
          onClick={() => dispatch(clearSelected())}
        >
          Clear
        </button>

        <div className="ml-auto text-sm text-white">
          Selected: <span className="font-semibold">{selectedCount}</span>
        </div>

        <button
          className="px-5 py-2 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 
          text-white rounded-full shadow-md transition transform hover:scale-105 active:scale-95 disabled:opacity-50"
          onClick={() => dispatch(batchApprove())}
          disabled={selectedCount === 0}
        >
          Batch Approve
        </button>
        <button
          className="px-5 py-2 bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 
          text-white rounded-full shadow-md transition transform hover:scale-105 active:scale-95 disabled:opacity-50"
          onClick={() => setConfirm({ type: 'batchReject' })}
          disabled={selectedCount === 0}
        >
          Batch Reject
        </button>
      </div>

      
      <div className="flex flex-wrap justify-center items-center gap-4 
        bg-white/10 backdrop-blur-lg px-6 py-4 rounded-xl shadow">

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
            setFromDate("")
            setToDate("")
            dispatch(setFilters({
              reason: selectedReason,
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

    </>
  )
}
