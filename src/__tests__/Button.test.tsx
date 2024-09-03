import Button from '@components/button/Button';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Button', () => {
  test('Render outlined button', () => {
    render(<Button design='outlined' text='Outlined button' />);
    const elem = screen.getByText('Outlined button');
    expect(elem).toBeInTheDocument();
  });

  test('Handling button events when disabled', () => {
    const handleClick = jest.fn();
    render(<Button design='outlined' onClick={handleClick} disabled text='disabled' />);
    fireEvent.click(screen.getByText('disabled'));
    expect(handleClick).toBeCalledTimes(0);
  });
});
