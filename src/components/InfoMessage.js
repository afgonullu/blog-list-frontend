import React from "react"

const InfoMessage = (props) => {
  if (props.message === null) {
    return null
  }
  return (
    <div className={props.alertType}>
      <span>{props.message}</span>
    </div>
  )
}

export default InfoMessage
