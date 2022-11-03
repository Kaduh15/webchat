// testes
import {beforeEach, describe, expect, test} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../../App';
import renderWithRouter from '../../tests/renderWithRouter';


describe('Pagina Login', () => {

  test('Verifica se tem o titulo Login', () => {
    const { history } = renderWithRouter(<App />, '/login');
    const heading = screen.getByRole('heading', { name: /login/i})
    expect(heading).toBeInTheDocument();
  })

  describe('1 - Testa o input', () => {

    test('Verifica se tem um input de userName', () => {
      const { history } = renderWithRouter(<App />, '/login');
      const inputUserName = screen.getByPlaceholderText(/Insira seu nome/i)
      expect(inputUserName).toBeInTheDocument();
    })

    test('Verifica de o input pode ser inderido um valor', async () => {
      const { history } = renderWithRouter(<App />, '/login');
      const inputUserName = screen.getByPlaceholderText(/Insira seu nome/i)

      await userEvent.type(inputUserName, 'Fernando')
      expect(inputUserName).toHaveValue('Fernando')
    })
  })

  describe('2 - Testa o Button Login', () => {
    test('Verifica se tem um button de login', () => {
      const { history } = renderWithRouter(<App />, '/login');
      const buttonLogin = screen.getByRole('button', { name: /fazer login/i})
      expect(buttonLogin).toBeInTheDocument();
    })

    test('Verifica se tem o button inicia desabilitado', () => {
      const { history } = renderWithRouter(<App />, '/login');
      const buttonLogin = screen.getByRole('button', { name: /fazer login/i})
      expect(buttonLogin).toBeDisabled();
    })

    test('Verifica se o input tiver mais que 3 caracteres o button é abilitado', async () => {
      const { history } = renderWithRouter(<App />, '/login');
      const buttonLogin = screen.getByRole('button', { name: /fazer login/i})
      const inputUserName = screen.getByPlaceholderText(/Insira seu nome/i)

      await userEvent.type(inputUserName, 'Fer')
      expect(buttonLogin).toBeDisabled();
      await userEvent.type(inputUserName, 'Fernando')
      expect(buttonLogin).not.toBeDisabled();
    })

    test('Verifica se ao clicar no button com o userName valido é redirecionado parar o rota "/"', async () => {
      const { history } = renderWithRouter(<App />, '/login');
      const buttonLogin = screen.getByRole('button', { name: /fazer login/i})
      const inputUserName = screen.getByPlaceholderText(/Insira seu nome/i)

      await userEvent.type(inputUserName, 'Fernando')
      await userEvent.click(buttonLogin)
      expect(history.location.pathname).toBe('/')
    })
  })
  // test('Verifica se o userName está é mostrado na tela de Chat', async () => {
  //   const { history, getByRole } = renderWithRouter(<App />, '/login');
  //   const buttonLogin = screen.getByRole('button', { name: /fazer login/i})
  //   const inputUserName = screen.getByPlaceholderText(/Insira seu nome/i)
  //   expect(history.location.pathname).toBe('/login')

  //   await userEvent.type(inputUserName, 'Fernando')
  //   await userEvent.click(buttonLogin)
  //   expect(history.location.pathname).toBe('/')

  //   const heading2 = getByRole('heading', { name: /fernando/i})
  //   expect(heading2).toBeInTheDocument()
  // })
})
