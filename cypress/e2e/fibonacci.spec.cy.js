
describe('checking fibonacci sequense work', () => {
  beforeEach(function() {
    cy.visit('http://localhost:3000/fibonacci');
    cy.contains('Рассчитать').as('button');
  })


  describe('correct button behaviour', ()=>{
    it('button must me active only when chars are typed into the input', function() {
      cy.get('@button').should('be.disabled');
      cy.get('input').type('4');
      cy.get('@button').should('not.be.disabled');
      cy.get('input').clear();
      cy.get('@button').should('be.disabled');
    })
  })

  describe('correct number returned', ()=>{
    const three = 3;
    const five = 5;

    it('typed number returns fibonacci sequence member by number`s index', ()=>{
      cy.get('input').type(`${three}`);
      cy.get('@button').click();
      
      cy.get('[class*=circle_circle]').as('circles').should('have.length', three+1).each((item, index) => {
        if(index === 0) expect(item).to.contain('1');
        if(index === 1) expect(item).to.contain('1');
        if(index === 2) expect(item).to.contain('2');
        if(index === three) expect(item).to.contain('3');
      })

      cy.get('input').type(`${five}`);
      cy.get('@button').click();
      
      cy.get('[class*=circle_circle]').as('circles').should('have.length', five+1).each((item, index) => {
        if(index === 0) expect(item).to.contain('1');
        if(index === 1) expect(item).to.contain('1');
        if(index === 2) expect(item).to.contain('2');
        if(index === 3) expect(item).to.contain('3');
        if(index === 4) expect(item).to.contain('5');
        if(index === five) expect(item).to.contain('8');
      })
    })
  })
})