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

})
