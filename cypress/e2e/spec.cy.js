describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('');
  });

  it('Insere uma tarefa', () => {
    cy.visit('');
    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de Engenharia de Software');
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');
    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);
    cy.get('[data-cy=remove-todo-btn]')
      .invoke('show')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit('');
    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');
    cy.get('[data-cy=toggle-todo-checkbox]')
      .first()
      .click();
    cy.get('[data-cy=filter-active-link]').click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');
    cy.get('[data-cy=filter-completed-link]').click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');
    cy.get('[data-cy=filter-all-link]').click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  // ——————————————
  // Testes adicionais solicitados
  // ——————————————

  it('Não adiciona tarefa vazia', () => {
    cy.visit('');
    cy.get('[data-cy=todo-input]')
      .type('{enter}');
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Marca todas as tarefas como completas', () => {
    cy.visit('');
    cy.get('[data-cy=todo-input]')
      .type('Tarefa A{enter}')
      .type('Tarefa B{enter}');
    cy.get('.toggle-all').check();
    cy.get('[data-cy=toggle-todo-checkbox]')
      .each($cb => expect($cb).to.be.checked);
  });

  it('Limpa apenas as tarefas concluídas', () => {
    cy.visit('');
    cy.get('[data-cy=todo-input]')
      .type('X{enter}')
      .type('Y{enter}')
      .type('Z{enter}');
    cy.contains('li', 'Y')
      .find('[data-cy=toggle-todo-checkbox]')
      .click();
    cy.get('.clear-completed').click();
    cy.get('[data-cy=todos-list] > li')
      .should('have.length', 2)
      .then($items => {
        expect($items.eq(0)).to.contain('X');
        expect($items.eq(1)).to.contain('Z');
      });
  });
});
