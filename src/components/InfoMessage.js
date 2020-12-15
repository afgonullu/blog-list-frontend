import React from "react"
import { useSelector } from "react-redux"

const InfoMessage = (props) => {
  const notification = useSelector((state) => state.notification)
  if (notification === null) {
    return null
  }
  return <div className={notification.type}>{notification.message}</div>
}

export default InfoMessage
