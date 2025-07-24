import { render } from '@testing-library/react';
import Root from './root.component';
import { BrowserRouter } from 'react-router-dom';

describe('Root component', () => {
  it('should render Product List page', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    );
    expect(getByText(/Product List/i)).toBeInTheDocument();
  });
});
