// testes
import {beforeEach, describe, expect, test} from 'vitest';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Chat from '.';


describe('Pagina Chat', () => {
  beforeEach(() => {
    render(<Chat />)
  })

  test('Espera que tenhe um Input de texto', async () => {
    const input = await screen.findByRole('textbox');

    expect(input).toBeInTheDocument()
  })
})
