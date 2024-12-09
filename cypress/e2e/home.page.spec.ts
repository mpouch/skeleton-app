describe('Prueba E2E Home Page', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.viewport(390, 844);
        cy.get('ion-input[formControlName="username"]').type('usuario');
        cy.get('ion-input[formControlName="password"').type('1234');
        cy.get('ion-button[type="submit"]').click();
    });

    it('Debe cargar correctamente la página', () => {
        cy.contains('Inicio');
    });

    it('Debe cargar los items correctamente', () => {
        cy.get('.recommended-container .book-entry-container').should('have.length.greaterThan', 0);
    });

    it('Debe mostrar correctamente los detalles de los libros', () => {
        cy.get('.recommended-container .book-entry-container').each(($book) => {
          cy.wrap($book).find('.book-title').should('not.be.empty');
          cy.wrap($book).find('.book-author').should('not.be.empty');
          cy.wrap($book).find('img').should('have.attr', 'src');
        });
    });

    it('Debe redirigir correctamente a un item', () => {
        cy.get('.recommended-container .book-entry-container').first().click();
        cy.url().should('include', '/tabs/home/book/100');
    });
})
