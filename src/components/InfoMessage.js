import React from "react"

const InfoMessage = (props) => {
  if (props.message === null) {
    return null
  }
  return <div className={`message ${props.alertType}`}>{props.message}</div>
}

export default InfoMessage
