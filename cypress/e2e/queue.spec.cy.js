describe('checking queue work', () => {
  beforeEach(function() {
    cy.visit('http://localhost:3000/queue');
    cy.contains('Добавить').as('addButton');
    cy.contains('Удалить').as('deleteButton');
    cy.contains('Очистить').as('clearButton');
    cy.get('[class*=circle_circle]').as('circles');
    cy.get('[class*=circle_content]').as('circlesContent');
  })


  describe('correct add button behaviour', ()=>{
    it('button must me active only when chars are typed into the input', function() {
      cy.get('@addButton').should('be.disabled');
      cy.get('input').type('4');
      cy.get('@addButton').should('not.be.disabled');
      cy.get('input').clear();
      cy.get('@addButton').should('be.disabled');
    })
  })

  describe('check adding element in queue', ()=>{
    it('element must be added to queue correctly', ()=>{
      cy.get('input').type('1');
      cy.get('@addButton').click();
      cy.get('@circles').eq(0).contains('1');
      cy.get('@circles').eq(0).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
      cy.get('@circlesContent').eq(0).contains('head');
      cy.get('@circlesContent').eq(0).contains('tail');


      cy.get('input').type('AA');
      cy.get('@addButton').click();
      cy.get('@circles').eq(1).contains('AA');
      cy.get('@circles').eq(1).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
      cy.get('@circlesContent').eq(0).contains('head');
      cy.get('@circlesContent').eq(1).contains('tail');
    })
  })

  describe('check deleting element from queue', ()=>{
    it('delete button deletes firt element in queue', ()=>{
      cy.get('input').type('A');
      cy.get('@addButton').click();
      cy.get('input').type('B');
      cy.get('@addButton').click();
  
      cy.get('@deleteButton').click();
  
      cy.get('@circles').eq(0).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
      cy.get('@circles').eq(0).should('not.contain', 'A');
      cy.get('@circlesContent').eq(1).contains('head');
      cy.get('@circlesContent').eq(1).contains('tail');

      cy.get('@deleteButton').click();

      cy.get('@circles').eq(1).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
      cy.get('@circles').eq(1).should('not.contain', 'B');
    })

    describe('check clear button work', ()=>{
      it('clear button clears all elements from queue', ()=>{
        cy.get('input').type('A');
        cy.get('@addButton').click();
        cy.get('input').type('B');
        cy.get('@addButton').click();

        cy.get('@clearButton').click();
        cy.get('@circles').eq(0).should('not.contain', 'A');
        cy.get('@circles').eq(1).should('not.contain', 'B');
        cy.get('@circlesContent').each(item => {
          cy.wrap(item).should('not.contain', 'head');
          cy.wrap(item).should('not.contain', 'tail');
        })
      })
    })
    
  })
})