describe('app works correctly with routes', function() {
  it('should open main page by default', () => {
    cy.visit('http://localhost:3000');
});

beforeEach(function () {
    cy.visit('http://localhost:3000');
});

it('should open string page after its link click', function () {
    cy.get('a[href*="/recursion"]').click();
    cy.contains('Строка');
    cy.get('button').contains('К оглавлению').click();
    cy.contains('МБОУ АЛГОСОШ');
});

it('should open string page after its link click', function () {
  cy.get('a[href*="/fibonacci"]').click();
  cy.contains('Фибоначчи');
  cy.get('button').contains('К оглавлению').click();
  cy.contains('МБОУ АЛГОСОШ');
});

it('should open string page after its link click', function () {
  cy.get('a[href*="/sorting"]').click();
  cy.contains('Сортировка');
  cy.get('button').contains('К оглавлению').click();
  cy.contains('МБОУ АЛГОСОШ');
});

it('should open string page after its link click', function () {
  cy.get('a[href*="/stack"]').click();
  cy.contains('Стек');
  cy.get('button').contains('К оглавлению').click();
  cy.contains('МБОУ АЛГОСОШ');
});

it('should open string page after its link click', function () {
  cy.get('a[href*="/queue"]').click();
  cy.contains('Очередь');
  cy.get('button').contains('К оглавлению').click();
  cy.contains('МБОУ АЛГОСОШ');
});

it('should open string page after its link click', function () {
  cy.get('a[href*="/list"]').click();
  cy.contains('Связный список');
  cy.get('button').contains('К оглавлению').click();
  cy.contains('МБОУ АЛГОСОШ');
});



})