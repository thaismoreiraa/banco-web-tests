describe('login', () => {
  beforeEach(() => {
    // Arrange
    cy.visit(Cypress.env('URL'))
    cy.screenshot('após-visitar-página')

  })

  it('Login com dados válidos devem permitir entrada no sistema', () => {
    // Act((
    cy.fixture('credenciais').then(credenciais => {
      cy.get('#username').click().type(credenciais.valida.usuario)
      cy.get('#senha').click().type(credenciais.valida.senha)
      })

    cy.screenshot('após-preencher-dados-válidos')
    cy.contains('button', 'Entrar').click()
    cy.screenshot('após-clicar-no-botão-entrar')

    // Assert
    cy.contains('h4', 'Realizar Transferência').should('be.visible')
  })

  it('Login com dados inválidos devem apresentar mensagem de erro', () => {

    // Act
    cy.fixture('credenciais').then(credenciais => {
      cy.get('#username').click().type(credenciais.invalida.usuario)
      cy.get('#senha').click().type(credenciais.invalida.senha)
    })
    
    cy.contains('button', 'Entrar').click()

    // Assert
    cy.get('.toast').should('have.text', 'Erro no login. Tente novamente.')
  })
})