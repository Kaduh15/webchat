// testes
import {afterEach ,beforeEach, describe, expect, test, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as userStore from '../../store/userStore';
import '@testing-library/jest-dom';

import App from '../../App';
import renderWithRouter from '../../tests/renderWithRouter';

describe('Pagina Chat', () => {
  beforeEach(async () => {
    renderWithRouter(<App />, '/');
    vi.spyOn(userStore, 'default').mockImplementation(() => ({user: {userName: 'Fernando'}}))
  });

  test('test', () => {

  })

  test('Espera ter o titulo chat', async () => {
    const heading = screen.getByRole('heading', {name: /chat/i});

    expect(heading).toBeInTheDocument();
  });

  test('Espera que tenhe um Input de texto', async () => {
    const inputChat = screen.getByRole('textbox');

    expect(inputChat).toBeInTheDocument();
  });

  test("Verificando se o inputChat tem o valor '' (vazio).", async () => {
    const inputChat = screen.getByRole('textbox');

    expect(inputChat).toHaveValue('');
  });

  test('Verifica se é possível inserir algum valor no inputChat', async () => {
    const inputChat = screen.getByRole('textbox');

    await userEvent.type(inputChat, 'test');
    expect(inputChat).toHaveValue('test');
  });

  test("Clicando no botão e depois verificando se o inputChat tem o valor '' (vazio).", async () => {
    const inputChat = screen.getByRole('textbox');
    const buttonSend = screen.getByRole('button', { name: /Enviar/i });

    expect(inputChat).toHaveValue('');

    await userEvent.type(inputChat, 'test');
    expect(inputChat).toHaveValue('test');

    await userEvent.click(buttonSend);
    expect(inputChat).toHaveValue('');
  });

  test('Clicando no botão e depois verificando se o inputChat valor do input está em tela.', async () => {
    const inputChat = screen.getByRole('textbox');
    const buttonSend = screen.getByRole('button', { name: /Enviar/i });

    const texts = ['test1', 'test2', 'test3'];
    for (let text of texts) {
      await userEvent.type(inputChat, text);
      await userEvent.click(buttonSend);
    }

    const listItem = screen.getAllByRole('listitem');
    expect(listItem).toHaveLength(texts.length);
  });
});
