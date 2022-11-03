import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

function renderWithRouter(componente: React.ReactElement, route: string = '/') {
  const history = createMemoryHistory();
  history.push(route)

  const returnFromRender = render(
    <Router location={history.location} navigator={ history }>
      {componente}
    </Router>,
  );

  return { history, ...returnFromRender };
}

export default renderWithRouter;
