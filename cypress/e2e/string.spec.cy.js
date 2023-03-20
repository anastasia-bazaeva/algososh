import {DELAY_IN_MS} from '../../src/constants/delays';

describe('reverse thi string', () => {
  beforeEach(function() {
    cy.visit('http://localhost:3000/recursion');
    cy.contains('Развернуть').as('button');
  })


  describe('correct button behaviour', ()=>{
    it('button must me active only when chars are typed into the input', function() {
      cy.get('@button').should('be.disabled');
      cy.get('input').type('blabla');
      cy.get('@button').should('not.be.disabled');
      cy.get('input').clear();
      cy.get('@button').should('be.disabled');
    })
  })
  
  describe('correct coloring of circles', ()=>{
    it('circles colors changing correctly', ()=>{
      cy.get('input').type('melon');
      cy.get('@button').click();
      cy.get('[class*=circle_circle]').as('circles').should('have.length', 5).each((item, index)=>{
        if(index === 0) cy.wrap().contains('m');
        if(index === 1) cy.wrap().contains('e');
        if(index === 2) cy.wrap().contains('l');
        if(index === 3) cy.wrap().contains('o');
        if(index === 4) cy.wrap().contains('n');

        if(index === 0 || index === 4) {
          cy.wrap(item).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
          if(index === 0) expect(item).to.contain('m');
          if(index === 4) cy.wrap(item).contains('n');
        }
      });

        cy.wait(DELAY_IN_MS);

        cy.get('@circles').each((item, index) => {
          cy.wrap(item).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
            if(index === 0) expect(item).to.contain('n');
            if(index === 4) cy.wrap(item).contains('m');
        });

        cy.wait(DELAY_IN_MS);

        cy.get('@circles').each((item, index) => {
          cy.wrap(item).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
            if(index === 1) expect(item).to.contain('o');
            if(index === 3) cy.wrap(item).contains('e');
        });

        cy.wait(DELAY_IN_MS);

        cy.get('@circles').each((item, index) => {
          cy.wrap(item).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
            if(index === 2) expect(item).to.contain('l');
        });
    })
  })
  

})