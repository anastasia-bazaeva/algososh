import { DELAY_IN_MS } from "../../src/constants/delays";

describe('checking stack work', () => {
  beforeEach(function() {
    cy.visit('http://localhost:3000/stack');
    cy.contains('Добавить').as('addButton');
    cy.contains('Удалить').as('deleteButton');
    cy.contains('Очистить').as('clearButton');
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

  describe('correct adding to stack', ()=>{
    it('adding element to stack', ()=>{
      const four = 4;
      const char = 'A';

      cy.get('input').type(`${four}`);
      cy.get('@addButton').click();
      // cy.wait(DELAY_IN_MS);

      cy.get('[class*=circle_circle]').as('circles').should('have.length', 1).each(item => {
        cy.wait(DELAY_IN_MS);
        expect(item).to.contain(`${four}`);
        cy.wrap(item).should('have.css', 'border', '4px solid rgb(0, 50, 255)')
      })

      cy.get('input').type(`${char}`);
      cy.get('@addButton').click();

      cy.get('[class*=circle_circle]').as('circles').should('have.length', 2).each((item, index) => {
        cy.wait(DELAY_IN_MS);
        if(index === length-1) expect(item).to.contain(`${char}`);
        cy.wrap(item).should('have.css', 'border', '4px solid rgb(0, 50, 255)')
      })

    })
  })

  describe('correct removing from stack',()=>{
    it('removes items from stack correct', ()=>{
      cy.get('input').type('1');
      cy.get('@addButton').click();
      cy.get('input').type('2');
      cy.get('@addButton').click();
      cy.get('input').type('3');
      cy.get('@addButton').click();

      cy.get('[class*=circle_circle]').as('circles').should('have.length', 3);

      cy.get('@deleteButton').click();
      cy.wait(DELAY_IN_MS);
      cy.get('@circles').each((item, index)=>{
        if (index === 3) cy.wrap(item).should('have.css', 'border', '4px solid rgb(0, 50, 255)')
      })
      cy.get('@circles').should('have.length', 2);

      cy.get('@deleteButton').click();
      cy.wait(DELAY_IN_MS);
      cy.get('@circles').each((item, index)=>{
        if (index === 2) cy.wrap(item).should('have.css', 'border', '4px solid rgb(0, 50, 255)')
      })
      cy.get('@circles').should('have.length', 1);
    })
  })

  describe('clear button works correct', ()=>{
    it('clear button clears all stack', ()=>{
      cy.get('input').type('1');
      cy.get('@addButton').click();
      cy.get('input').type('2');
      cy.get('@addButton').click();
      cy.get('[class*=circle_circle]').as('circles').should('have.length', 2);

      cy.get('@clearButton').click();
      cy.get('@circles').should('not.exist');
    })
  })

})