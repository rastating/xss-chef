import React from 'react'

const toast = {
  success: (msg, options) => {
    if (global.toastSuccess) {
      global.toastSuccess(msg, options)
    }
  },
  POSITION: {
    BOTTOM_RIGHT: 'BOTTOM_RIGHT'
  }
}

const ToastContainer = (props) => (<div />)

export { toast, ToastContainer }
