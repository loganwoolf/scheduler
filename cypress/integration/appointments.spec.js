describe('Appointments', () => {
  beforeEach(() => {
    cy.request('get', '/api/debug/reset')
    cy.visit('/')
    cy.contains('Monday')
  })

  it('should book an interview', () => {
    cy.get('[alt=Add]').first().click()
    cy.get('[data-testid=student-name-input').type(
      'Lydia Miller-Jones'
    )
    cy.get('[alt="Tori Malcolm"]').click()
    cy.contains('Save').click()
    cy.contains('.appointment__card--show', 'Tori Malcolm')
    cy.contains(
      '.appointment__card--show',
      'Lydia Miller-Jones'
    )
  })

  it('should edit an interview', () => {
    cy.get('[alt=Edit]').click({ force: true })
    cy.get('[alt="Tori Malcolm"]').click()
    cy.get('[type=text]').clear().type('Major Tom')
    cy.contains('Save').click()
    cy.contains('.appointment__card--show', 'Tori Malcolm')
    cy.contains('.appointment__card--show', 'Major Tom')
  })

  it('should cancel an interview', () => {
    cy.get('[alt=Delete]').click({ force: true })
    cy.contains('Confirm').click()
    cy.contains(/delet/i).should('exist')
    cy.contains(/delet/i).should('not.exist')
    cy.contains(
      '.appointment__card--show',
      /archie cohen/i
    ).should('not.exist')
  })
})
