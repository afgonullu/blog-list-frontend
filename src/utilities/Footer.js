import React from "react"
import { Col, Row } from "react-bootstrap"

const Footer = () => {
  return (
    <Row className="bg-dark text-light p-5">
      <Col>
        This Project is part of the Fullstack Open Course Curriculum, a free
        course offered by University of Helsinki. You can find more info here{" "}
        <a href="https:///www.fullstackopen.com">Fullstack Open</a>.
      </Col>
      <Col className="text-end">
        Created by <a href="https://afaruk.dev">Afg</a>
      </Col>
    </Row>
  )
}

export default Footer
