import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import Blog from "../components/Blog"

describe("blog component renders", () => {
  const blog = {
    title: "Test Title",
    author: "Test Author",
    url: "Test Url",
    likes: 5,
  }

  let component

  const mockLikeHandler = jest.fn()
  const mockDeleteHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        handleLike={mockLikeHandler}
        handleDelete={mockDeleteHandler}
        showRemove={true}
      />
    )
  })

  test("at start render title and blog, but url is hidden", () => {
    const title = component.container.querySelector(".blog__title-and-author")
    expect(title).toHaveTextContent("Test Title")

    const details = component.container.querySelector(".blog__details")
    expect(details).toHaveStyle("display: none")

    component.debug()
  })

  test("after clicking the button, details are displayed", () => {
    const button = component.container.querySelector(".blog__visibility-button")
    fireEvent.click(button)

    const details = component.container.querySelector(".blog__details")
    expect(details).not.toHaveStyle("display: none")
  })

  test("like clicked 2 times", () => {
    const button = component.container.querySelector(".blog__like-button")
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })
})

// test("renders content", () => {
//   const component = render(<Blog blog={blog} />)

//   component.debug()

//   // method 1
//   expect(component.container).toHaveTextContent(
//     "Component testing is done with react-testing-library"
//   )

//   // method 2
//   const element = component.getByText(
//     "Component testing is done with react-testing-library"
//   )
//   expect(element).toBeDefined()

//   // method 3
//   const div = component.container.querySelector(".note")
//   expect(div).toHaveTextContent(
//     "Component testing is done with react-testing-library"
//   )
// })
