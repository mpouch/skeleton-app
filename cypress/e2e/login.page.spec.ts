describe('Prueba E2E Login Page', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.viewport(390, 844);
    })

    it("Debe cargar correctamente la página", () => {
        cy.contains('Bookdive');
        cy.get('form').should('exist');
    })

    it("Debe mostrar error si los campos están vacíos", () => {
        cy.get('ion-input[formControlName="username"').click();
        cy.get('ion-input[formControlName="password"]').click();
        cy.get('ion-input[formControlName="username"').click();
        cy.contains('El nombre de usuario es requerido.').should('be.visible');
        cy.contains('La contraseña es requerida.').should('be.visible');
    });

    it("Debe mostrar error si el username tiene menos de 3 caracteres", () => {
        cy.get('ion-input[formControlName="username"').type('aa');
        cy.contains('El nombre de usuario debe tener entre 3 y 8 caracteres.').should('be.visible');
    });

    it("Debe mostrar error si la contraseña no tiene 4 caracteres", () => {
        cy.get('ion-input[formControlName="password"]').type('aaa');
        cy.contains('La contraseña debe tener 4 caracteres.').should('be.visible');
    });

    it("Debe redirigir al usuario a home", () => {
        cy.get('ion-input[formControlName="username"]').type('usuario');
        cy.get('ion-input[formControlName="password"').type('1234');
        cy.get('ion-button[type="submit"]').click();
        cy.url().should('include', '/tabs');
    });
})
