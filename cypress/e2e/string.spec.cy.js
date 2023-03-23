import {DELAY_IN_MS} from '../../src/constants/delays';

describe('reverse the string', () => {
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
  
  describe('correct coloring of circles for string with odd number of chars', ()=>{
    it('circles colors changing correctly', ()=>{
      cy.get('input').type('ALBUS');
      cy.get('@button').click();
      cy.get('[class*=circle_circle]').as('circles').should('have.length', 5).each((item, index)=>{
        if(index === 0) cy.wrap().contains('A');
        if(index === 1) cy.wrap().contains('L');
        if(index === 2) cy.wrap().contains('B');
        if(index === 3) cy.wrap().contains('U');
        if(index === 4) cy.wrap().contains('S');

        if(index === 0 || index === 4) {
          cy.wrap(item).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
          if(index === 0) expect(item).to.contain('A');
          if(index === 4) cy.wrap(item).contains('S');
        }
      });

        cy.wait(DELAY_IN_MS);

        cy.get('@circles').each((item, index) => {
          cy.wrap(item).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
            if(index === 0) expect(item).to.contain('S');
            if(index === 4) cy.wrap(item).contains('A');
        });

        cy.wait(DELAY_IN_MS);

        cy.get('@circles').each((item, index) => {
          cy.wrap(item).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
            if(index === 1) expect(item).to.contain('U');
            if(index === 3) cy.wrap(item).contains('L');
        });

        cy.wait(DELAY_IN_MS);

        cy.get('@circles').each((item, index) => {
          cy.wrap(item).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
            if(index === 2) expect(item).to.contain('B');
        });
    })
  })
  
  describe('correct coloring of circles for string with even number of chars', ()=>{
    it('circles colors changing correctly', ()=>{
      cy.get('input').type('MALFOY');
      cy.get('@button').click();
      cy.get('[class*=circle_circle]').as('circles').should('have.length', 6).each((item, index)=>{
        if(index === 0) cy.wrap().contains('M');
        if(index === 1) cy.wrap().contains('A');
        if(index === 2) cy.wrap().contains('L');
        if(index === 3) cy.wrap().contains('F');
        if(index === 4) cy.wrap().contains('O');
        if(index === 5) cy.wrap().contains('Y');

        if(index === 0 || index === 5) {
          cy.wrap(item).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
          if(index === 0) expect(item).to.contain('M');
          if(index === 5) cy.wrap(item).contains('Y');
        }
      });

        cy.wait(DELAY_IN_MS);

        cy.get('@circles').each((item, index) => {
          cy.wrap(item).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
            if(index === 0) expect(item).to.contain('Y');
            if(index === 5) cy.wrap(item).contains('M');
        });

        cy.wait(DELAY_IN_MS);

        cy.get('@circles').each((item, index) => {
          cy.wrap(item).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
            if(index === 1) expect(item).to.contain('O');
            if(index === 4) cy.wrap(item).contains('A');
        });

        cy.wait(DELAY_IN_MS);

        cy.get('@circles').each((item, index) => {
          cy.wrap(item).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
            if(index === 2) expect(item).to.contain('F');
            if(index === 3) cy.wrap(item).contains('L');
        });
    })
  })

})