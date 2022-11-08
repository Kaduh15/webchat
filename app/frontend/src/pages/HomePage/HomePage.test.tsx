import { describe, expect, test, vi, vitest } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../../App';
import renderWithRouter from '../../tests/renderWithRouter';
import * as userStore from '../../store/userStore';

const mockUserName = (userName: string = 'Fernando') => {
  return vi
    .spyOn(userStore, 'default')
    .mockImplementation(() => ({ user: { userName } }));
};

describe.concurrent('Pagina Principal', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('1 - Testes de Usuário', () => {
    test('Verifica se é redirecionado para tela de login sem um UserName', () => {
      const { history } = renderWithRouter(<App />);
      expect(history.location.pathname).toBe('/login');
    });
    test('Verifica se permanece na pagina caso tenha um UserName', () => {
      mockUserName('Thiago');
      const { history } = renderWithRouter(<App />);
      expect(history.location.pathname).toBe('/');
    });
  });

  test('Verifica se um titulo WebChat', () => {
    mockUserName('Thiago');
    const { history } = renderWithRouter(<App />);

    const headingWebchat = screen.getByRole('heading', { name: /webchat/i});
    expect(headingWebchat).toBeInTheDocument();
  });

  
});
