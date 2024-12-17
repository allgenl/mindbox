import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';
import { loadFromLocalStorage } from './utils/localStorage';

describe('To-Do App', () => {
  test('renders the app title', () => {
    render(<App />);
    expect(screen.getByText('todos')).toBeInTheDocument();
  });
  test('allows users to add a task', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    const addButton = screen.getByTestId('add-task');
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(addButton);
    expect(screen.getByText('New Task')).toBeInTheDocument();
  });
  test('clears the input field after adding a task', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    const addButton = screen.getByTestId('add-task');
    fireEvent.change(input, { target: { value: 'Another Task' } });
    fireEvent.click(addButton);
    expect(input).toHaveValue('');
  });
  test('allows users to toggle task completion', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    const addButton = screen.getByTestId('add-task');
    fireEvent.change(input, { target: { value: 'Task to Completed' } });
    fireEvent.click(addButton);

    const todos = loadFromLocalStorage();

    const checkboxContainer = screen.getByTestId(`task-${todos[2].id}`);
    const inputCheckbox = within(checkboxContainer).getByRole('checkbox');
    expect(inputCheckbox).not.toBeChecked();
    fireEvent.click(inputCheckbox);
    expect(inputCheckbox).toBeChecked();
  });
  test('allows users to delete a task', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    const addButton = screen.getByTestId('add-task');
    fireEvent.change(input, { target: { value: 'Task to Delete' } });
    fireEvent.click(addButton);

    const todos = loadFromLocalStorage();

    const checkboxContainer = screen.getByTestId(`task-${todos[3].id}`);
    const inputCheckbox = within(checkboxContainer).getByRole('checkbox');
    fireEvent.click(inputCheckbox);

    expect(checkboxContainer).toHaveClass('Mui-checked');

    const deleteButton = screen.getByTestId('delete-task');
    fireEvent.click(deleteButton);

    expect(screen.queryByTestId(`task-${todos[3].id}`)).not.toBeInTheDocument();
  });
});
