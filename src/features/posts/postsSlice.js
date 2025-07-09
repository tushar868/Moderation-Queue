import { createSlice } from '@reduxjs/toolkit'
import mockPosts from '../../data/mockPosts'

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: mockPosts,
    selected: [],
    statusFilter: 'pending',
    modalPostId: null,
    page: 1,
    filters: {
      reason: "",
      from: "",
      to: ""
    }
  },
  reducers: {
    approvePost(state, action) {
      const post = state.posts.find(p => p.id === action.payload)
      if (post) post.status = 'approved'
    },
    rejectPost(state, action) {
      const post = state.posts.find(p => p.id === action.payload)
      if (post) post.status = 'rejected'
    },
    resetPost(state, action) {
      const post = state.posts.find(p => p.id === action.payload)
      if (post) post.status = 'pending'
    },
    toggleSelect(state, action) {
      const id = action.payload
      if (state.selected.includes(id)) {
        state.selected = state.selected.filter(item => item !== id)
      } else {
        state.selected.push(id)
      }
    },
    selectAll(state) {
      state.selected = state.posts
        .filter(p => p.status === state.statusFilter)
        .map(p => p.id)
    },
    clearSelected(state) {
      state.selected = []
    },
    setStatusFilter(state, action) {
      state.statusFilter = action.payload
      state.page = 1
      state.selected = []
    },
    setFilters(state, action) {
      state.filters = action.payload
      state.page = 1
    },
    batchApprove(state) {
      state.selected.forEach(id => {
        const post = state.posts.find(p => p.id === id)
        if (post) post.status = 'approved'
      })
      state.selected = []
    },
    batchReject(state) {
      state.selected.forEach(id => {
        const post = state.posts.find(p => p.id === id)
        if (post) post.status = 'rejected'
      })
      state.selected = []
    },
    openModal(state, action) {
      state.modalPostId = action.payload
    },
    closeModal(state) {
      state.modalPostId = null
    },
    loadMore(state) {
      state.page += 1
    }
  }
})

export const {
  approvePost, rejectPost, resetPost, toggleSelect,
  selectAll, clearSelected, setStatusFilter,
  setFilters, batchApprove, batchReject,
  openModal, closeModal, loadMore
} = postsSlice.actions

export default postsSlice.reducer
