// testes
import {beforeEach, describe, expect, test} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../../App';


describe('Pagina Chat', () => {
  beforeEach(() => {
    render(<App />)
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
    expect(listItem.map(e => e.innerHTML)).toStrictEqual(texts)
  })
})
