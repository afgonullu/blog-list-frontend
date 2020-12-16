import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import CreateBlog from "../components/Blog/CreateBlog"
import blogService from "../services/blogs"

test("<NoteForm /> updates parent state and calls onSubmit", () => {
  const mockHandler = jest.fn()

  const component = render(
    <CreateBlog
      //   toggleRef={createBlogRef}
      setAlert={mockHandler}
      //   blogs={blogs}
      //   setBlogs={setBlogs}
    />
  )

  const title = component.container.querySelector("#title")
  const author = component.container.querySelector("#author")
  const url = component.container.querySelector("#url")
  const form = component.container.querySelector("form")

  component.debug()

  fireEvent.change(title, {
    target: { value: "Test Title 2" },
  })
  expect(title.value).toBe("Test Title 2")

  fireEvent.change(author, {
    target: { value: "Test Author 2" },
  })
  expect(author.value).toBe("Test Author 2")

  fireEvent.change(url, {
    target: { value: "Test Url 2" },
  })
  expect(url.value).toBe("Test Url 2")

  fireEvent.submit(form)

  expect(mockHandler.mock.calls.length).toBe(1)
  //   expect(mockHandler.mock.calls[0][0]).toBe({
  //     message: "New Blog is Created: Test Title 2 by Test Author 2",
  //     type: "success",
  //   })
})
