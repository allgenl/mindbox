import React, { useState, useEffect } from 'react';
import { Todo } from './types/Todo';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoFooter from './components/TodoFooter';
import { saveToLocalStorage, loadFromLocalStorage } from './utils/localStorage';
import { styled } from '@mui/material';
import { colors } from './styles/colors';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(loadFromLocalStorage());
  const [statusShow, setShowStatus] = useState<boolean | null>(null);

  useEffect(() => {
    saveToLocalStorage(todos);
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  return (
    <StyledContainer>
      <StyledTitle>todos</StyledTitle>
      <TodoContainer>
        <TodoInput onAdd={addTodo} />
        <TodoList todos={todos} onToggle={toggleTodo} statusShow={statusShow} />
        <TodoFooter
          activeCount={todos.filter((t) => !t.completed).length}
          onClearCompleted={clearCompleted}
          setShowStatus={setShowStatus}
        />
      </TodoContainer>
    </StyledContainer>
  );
};

export default App;

const StyledContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  width: '100%',
  maxWidth: '40rem',
  alignItems: 'center',
}));

const StyledTitle = styled('h1')(() => ({
  color: colors.pink,
  fontSize: '5rem',
  fontWeight: 'lighter',
}));

const TodoContainer = styled('div')(() => ({
  backgroundColor: 'white',
  fontSize: '5rem',
  fontWeight: '300',
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  boxShadow: '0 0 6px 0 rgba(0, 0, 0, 0.1)',
  position: 'relative',
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    bottom: '-.375rem',
    height: '.375rem',
    width: 'calc(100% - 1rem)',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'white',
    zIndex: '1',
    boxShadow: '0 0 6px 0 rgba(0, 0, 0, 0.1)',
  },
  '&::after': {
    boxShadow: '0 0 6px 0 rgba(0, 0, 0, 0.1)',
    bottom: '-.75rem',
    height: '.75rem',
    width: 'calc(100% - 2rem)',
    zIndex: '0',
  },
}));
