// testes
import {afterEach, beforeEach, describe, expect, test} from 'vitest';
import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import * as userStore from '../../store/userStore';
import '@testing-library/jest-dom';

import App from '../../App';
import renderWithRouter from '../../tests/renderWithRouter';


describe('Pagina Chat', () => {
  beforeEach(() => {
    renderWithRouter(<App />)
    sinon.stub(userStore, 'default').callsFake(() => ({user: { userName: 'Fernando' }}))
  })

  afterEach(() => {
    sinon.restore();
  })

  test('Espera ter o titulo do chat', () => {
    const heading = screen.getByRole('heading', { name: /chat/i });
    expect(heading).toBeInTheDocument();
  })

  test('Espera que tenhe um Input de texto', async () => {
    const inputChat = screen.getByRole('textbox');

    expect(inputChat).toBeInTheDocument();
  })

  test("Checking if the inputChat has the value '' (empty)..", async () => {
    const inputChat = screen.getByRole('textbox');

    expect(inputChat).toHaveValue('')
  })

  test("Checks if it is possible to enter some value in inputChat", async () => {
    const inputChat = screen.getByRole('textbox');

    await userEvent.type(inputChat, 'test')
    expect(inputChat).toHaveValue('test')
  })

  test("Clicking the button and then checking if the inputChat has the value '' (empty).", async () => {
    const inputChat = screen.getByRole('textbox');
    const buttonSend = screen.getByRole('button', { name: /Enviar/i});

    expect(inputChat).toHaveValue('')

    await userEvent.type(inputChat, 'test')
    expect(inputChat).toHaveValue('test')

    await userEvent.click(buttonSend)
    expect(inputChat).toHaveValue('')
  })

  test("Clicking the button and then checking if the inputChat has the value '' (empty).", async () => {
    const inputChat = screen.getByRole('textbox');
    const buttonSend = screen.getByRole('button', { name: /Enviar/i});

    const texts = [ 'test1', 'test2', 'test3']
    for( let text of texts) {
      await userEvent.type(inputChat, text)
      await userEvent.click(buttonSend)
    }

    const listItem = screen.getAllByRole('listitem')
    expect(listItem).toHaveLength(texts.length)
  })
})
