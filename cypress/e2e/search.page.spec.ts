describe('Prueba E2E Search Page', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.viewport(390, 844);
        cy.get('ion-input[formControlName="username"]').type('usuario');
        cy.get('ion-input[formControlName="password"').type('1234');
        cy.get('ion-button[type="submit"]').click();
        cy.get('ion-tab-button[tab="search"]').click();
    });

    it("Debe cargar correctamente la página", () => {
        cy.contains('Búsqueda');
    })

    it("Debe obtener items de la API 1", () => {
        cy.get('ion-input[placeholder="Buscar libros..."] input').type('El señor');
        cy.get('.book-entry-container').should('contain.text', 'El señor de los anillos').and('be.visible');
    })

    it("Debe obtener items de la API 2", () => {
        cy.get('ion-input[placeholder="Buscar libros..."] input').type('Rayu');
        cy.get('.book-entry-container').should('contain.text', 'Rayuela').and('be.visible');
    })

    it("Debe obtener items de la API 3", () => {
        cy.get('ion-input[placeholder="Buscar libros..."] input').type('dick');
        cy.get('.book-entry-container').should('contain.text', 'Moby Dick').and('be.visible');
    })

    it("Debe obtener items de la API 4", () => {
        cy.get('ion-input[placeholder="Buscar libros..."] input').type('gatsby');
        cy.get('.book-entry-container').should('contain.text', 'El gran Gatsby').and('be.visible');
    })

    it("Debe obtener items de la API 5", () => {
        cy.get('ion-input[placeholder="Buscar libros..."] input').type('fantas');
        cy.get('.book-entry-container').should('contain.text', 'El señor de los anillos').and('be.visible');
        cy.get('.book-entry-container').should('contain.text', 'Circe').and('be.visible');
        cy.get('.book-entry-container').should('contain.text', 'El Camino de los Reyes').and('be.visible');
    })


})
