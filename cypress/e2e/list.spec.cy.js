import { wait } from "@testing-library/user-event/dist/utils";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe('checking list work', () => {
  beforeEach(function() {
    cy.visit('http://localhost:3000/list');
    cy.contains('Добавить в head').as('addHeadButton');
    cy.contains('Добавить в tail').as('addTailButton');
    cy.contains('Добавить по индексу').as('addIndexButton');
    cy.contains('Удалить из head').as('deleteHeadButton');
    cy.contains('Удалить из tail').as('deleteTailButton');
    cy.contains('Удалить по индексу').as('deleteIndexButton');
    cy.get('[class*=circle_circle]').as('circles');
    cy.get('[class*=circle_content]').as('circlesContent');
  })

  // describe('correct add buttons behaviour', ()=>{
  //   it('button must me active only when chars are typed into the input', function() {
  //     cy.get('@addHeadButton').should('be.disabled');
  //     cy.get('@addTailButton').should('be.disabled');
  //     cy.get('@addIndexButton').should('be.disabled');
  //     cy.get('input').first().type('4');
  //     cy.get('@addHeadButton').should('not.be.disabled');
  //     cy.get('@addTailButton').should('not.be.disabled');
  //     cy.get('@addIndexButton').should('be.disabled');
  //     cy.get('input').last().type('1');
  //     cy.get('@addIndexButton').should('not.be.disabled');
  //     cy.get('input').first().clear();
  //     cy.get('input').last().clear();
  //     cy.get('@addHeadButton').should('be.disabled');
  //     cy.get('@addTailButton').should('be.disabled');
  //     cy.get('@addIndexButton').should('be.disabled');
  //   })
  // })

  // describe('default list exist', ()=>{
  //   it('default list must be rendered correctly on page', ()=>{
  //     cy.get('@circles').should('have.length.above', 3);
  //     cy.get('@circlesContent').eq(0).contains('head');
  //     cy.get('@circlesContent').eq(length-1).contains('tail');
  //   })
  // })
  
  // describe('add element in head', ()=>{
  //   it('add to head button adding element to the head of list', ()=>{
  //     cy.get('input').first().type('5');
  //     cy.get('@addHeadButton').click();
  //     cy.get('@circlesContent').eq(0).contains('5');
  //     cy.get('@circles').eq(0).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
  //     wait(DELAY_IN_MS);
  //     cy.get('@circles').eq(0).contains('5');
  //     cy.get('@circles').eq(0).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
  //   })
  // })

  // describe('add element in tail', ()=>{
  //   it('add to tail button adding element to the tail of list', ()=>{
  //     cy.get('input').first().type('5');
  //     cy.get('@addTailButton').click();
  //     cy.get('@circlesContent').eq(length-1).contains('5');
  //     cy.get('@circles').eq(length-1).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
  //     wait(DELAY_IN_MS);
  //     cy.get('@circles').eq(length-1).contains('5');
  //     cy.get('@circles').eq(length-1).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
  //   })
  // })

  // describe('add element by index', ()=>{
  //   it('add by index button adding element into the list by index', ()=>{
  //     cy.get('input').first().type('5');
  //     cy.get('input').last().type('2');
  //     cy.get('@addIndexButton').click();
  //     cy.get('@circles').eq(2).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
  //     cy.get('@circlesContent').eq(2).contains('5');
  //     cy.get('@circles').eq(2).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
  //     wait(DELAY_IN_MS);
  //     cy.get('@circles').eq(2).contains('5');
  //     cy.get('@circles').eq(2).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
  //     cy.get('@circlesContent').eq(0).contains('head');
  //     cy.get('@circlesContent').eq(length-1).contains('tail');
  //   })
  // })

  // describe('delete element from head', ()=>{
  //   it('delete from head button deletes element from head', ()=>{
  //     cy.get('input').first().type('A');
  //     cy.get('@addHeadButton').click();
  //     cy.get('@deleteHeadButton').click();
  //     cy.get('@circlesContent').find('[class*=circle_changing]');
  //     cy.get('@circles').eq(0).should('not.contain','A');
  //   })
  // })

  // describe('delete element from tail', ()=>{
  //   it('delete from tail button deletes element from tail', ()=>{
  //     cy.get('input').first().type('A');
  //     cy.get('@addTailButton').click();
  //     cy.get('@deleteTailButton').click();
  //     cy.get('@circlesContent').find('[class*=circle_changing]');
  //     cy.get('@circles').eq(length-1).should('not.contain','A');
  //   })
  // })

  describe('delete element by index', ()=>{
    it('delete from index button deletes element from any position in list', ()=>{
      cy.get('input').last().type('2');
      cy.get('@deleteIndexButton').click();
      cy.get('@circles').eq(0).find('[class*=circle_changing]');
      cy.get('@circles').eq(1).find('[class*=circle_changing]');
      cy.get('@circles').eq(2).find('[class*=circle_changing]');
    })
  })

})