import React from "react"
import { Alert } from "react-bootstrap"
import { useSelector } from "react-redux"

const InfoMessage = (props) => {
  const notification = useSelector((state) => state.notification)
  if (notification === null) {
    return null
  }
  return (
    <Alert className={`m-5 ${notification.type}`}>{notification.message}</Alert>
  )
}

export default InfoMessage
