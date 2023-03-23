describe('app works correctly with routes', function() {
  it('should open main page by default', () => {
    cy.visit('http://localhost:3000');
});

beforeEach(function () {
    cy.visit('http://localhost:3000');
});


it('should open string page after its link click', function () {
  const pages = [
    {name: 'Строка', url: '/recursion'},
    {name: 'Фибоначчи', url: '/fibonacci'},
    {name: 'Сортировка', url: '/sorting'},
    {name: 'Стек', url: '/stack'},
    {name: 'Очередь', url: '/queue'},
    {name: 'Связный список', url: '/list'},
  ]
  
    pages.forEach(page => {
      cy.get(`a[href*='${page.url}']`).click();
      cy.contains(`${page.name}`);
      cy.get('button').contains('К оглавлению').click();
      cy.contains('МБОУ АЛГОСОШ');
    })
});
})