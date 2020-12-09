describe("Blog List App", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    const user = {
      name: "abdullah faruk",
      username: "afgonullu",
      password: "123456",
    }
    cy.request("POST", "http://localhost:3003/api/users/", user)
    const user2 = {
      name: "second user",
      username: "second",
      password: "123456",
    }
    cy.request("POST", "http://localhost:3003/api/users/", user2)

    cy.visit("http://localhost:3000")
  })

  it("front page can be opened, login page is shown", function () {
    cy.contains("Log in to application")
  })

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click()
      cy.get("#username").type("afgonullu")
      cy.get("#password").type("123456")
      cy.get("#login-button").click()

      cy.get(".message")
        .should("contain", "login successful for afgonullu")
        .and("have.css", "background-color", "rgb(0, 153, 34)")
    })

    it("fails with wrong credentials", function () {
      cy.contains("login").click()
      cy.get("#username").type("afgonullu")
      cy.get("#password").type("wrong")
      cy.get("#login-button").click()

      cy.get(".message")
        .should("contain", "Wrong credentials")
        .and("have.css", "background-color", "rgb(153, 0, 34)")
    })
  })

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "afgonullu", password: "123456" })
    })

    it("A blog can be created", function () {
      cy.createBlog({
        title: "Cypress Test Entry",
        author: "Cypress Rules",
        url: "ww.cypress.co",
      })
      cy.get(".blog__title-and-author").should("contain", "Cypress Test Entry")
    })

    it("user can like a blog", function () {
      cy.createBlog({
        title: "Cypress Test Entry 2",
        author: "Cypress Rules 2",
        url: "ww.cypress.co",
      })
      cy.get(".blog__visibility-button").click()
      cy.get(".blog__details").should("contain", "likes: 0")
      cy.get(".blog__like-button").click()
      cy.get(".blog__details").should("contain", "likes: 1")
    })

    it("user can delete own entry", function () {
      cy.createBlog({
        title: "Cypress Test Entry 3",
        author: "Cypress Rules 3",
        url: "ww.cypress.co",
      })
      cy.get(".blog__visibility-button").click()
      cy.get(".blog__remove-button").click()

      cy.get(".blogsList").should("not.contain", "Cypress Test Entry 3")
    })

    it("user can't delete others entry", function () {
      cy.createBlog({
        title: "Cypress Test Entry 4",
        author: "Cypress Rules 4",
        url: "ww.cypress.co",
      })

      cy.get(".logout").click()

      cy.login({ username: "second", password: "123456" })

      cy.get(".blog__visibility-button").click()
      cy.get(".blog__remove-button").should("not.exist")

      cy.get(".blogsList").should("contain", "Cypress Test Entry 4")
    })
  })

  describe("blogs are sorted from most liked to least", function () {
    beforeEach(function () {
      cy.login({ username: "afgonullu", password: "123456" })
      cy.createBlog({
        title: "Cypress Test Entry a",
        author: "Cypress Rules a",
        url: "ww.cypress.co",
        likes: 10,
      })
      cy.createBlog({
        title: "Cypress Test Entry b",
        author: "Cypress Rules b",
        url: "ww.cypress.co",
        likes: 15,
      })
      cy.createBlog({
        title: "Cypress Test Entry c",
        author: "Cypress Rules c",
        url: "ww.cypress.co",
        likes: 4,
      })
    })

    it("list is sorted", function () {
      cy.get(".blogLikes").then((blogs) => {
        let a = []
        for (let i = 0; i < blogs.length; i++) {
          a.push(blogs[i].innerHTML)
        }
        console.log(a)
        cy.get(a).should("contain", ["15", "10", "4"])
      })
    })
  })
})
