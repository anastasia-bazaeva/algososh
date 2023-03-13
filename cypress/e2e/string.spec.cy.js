describe('reverse thi string', () => {
  beforeEach(function() {
    cy.visit('http://localhost:3000/recursion')
  })

  describe('correct button behaviour', function () {
    it('button must me active only when chars are typed into the input', function() {
      cy.contains('Развернуть').as('button');
      cy.get('@button').should('be.disabled');
      cy.get('input').type('blabla');
      cy.get('@button').should('not.be.disabled');
      cy.get('input').clear();
      cy.get('@button').should('be.disabled');
    })
  })

  

})