/// <reference types="cypress" />

describe('search for hotels', () => {
  beforeEach(() => {

    cy.visit('http://localhost:3000')
  })

  it('selects to date and clicks on search then sorts by price', () => {

    let moveInCal = async()=>{
      return await new Promise((resolve) => {
        for (let i = 1; i < 6; i++)
          cy.get(`[aria-label="Next Month"]`).click()
        resolve()
      })
    }
    cy.get(`#toDate`).click()
    moveInCal()
    cy.get(`.react-datepicker__day`).eq((Math.random()*31 -1).toFixed(0)).click()
    cy.get('#search').click()
    cy.wait(2000)
    cy.get("#sortByPrice").click();
    cy.wait(2000)
    cy.get("#sortByPrice").click();
    cy.wait(2000)
    cy.get("#sortByPrice").click();




  })
})


