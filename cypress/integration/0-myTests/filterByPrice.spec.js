/// <reference types="cypress" />

describe('search for hotels', () => {
  beforeEach(() => {

    cy.visit('http://localhost:3000')
  })

  it('selects to date and clicks on search then filters by price', () => {

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
    cy.get('input[type=range]').eq(0)
    .then(($el) => {
      cy.wrap($el)
        .invoke('val', 240733)
        .trigger('change', { force: true })
    });
    cy.get('#search').click()

  })
})


