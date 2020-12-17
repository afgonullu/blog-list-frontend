import React, { useState, useImperativeHandle } from "react"
import PropTypes from "prop-types"
import { Button } from "react-bootstrap"

const Toggleable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button className="my-3" variant="primary" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div className="my-3 border p-3" style={showWhenVisible}>
        {props.children}
        <Button className="my-3" variant="danger" onClick={toggleVisibility}>
          Cancel
        </Button>
      </div>
    </div>
  )
})

Toggleable.displayName = "Toggleable"

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Toggleable
