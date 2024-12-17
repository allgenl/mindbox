import React from 'react';
import { Todo } from '../types/Todo';
import TodoItem from './TodoItem';
import { styled } from '@mui/material';

interface Props {
  todos: Todo[];
  onToggle: (id: number) => void;
  statusShow: boolean | null;
}

const TodoList: React.FC<Props> = ({ todos, onToggle, statusShow }) => {
  const filteredTodos = todos.filter((todo) => {
    if (statusShow === null) {
      return true;
    }
    return statusShow === todo.completed; // Показываем задачи в зависимости от статуса completed
  });

  return (
    <StyledList>
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </StyledList>
  );
};

const StyledList = styled('ul')(() => ({
  listStyle: 'none',
  margin: '0',
  zIndex: '2',
  boxShadow: '0 -2px 2px 0 rgba(0, 0, 0, 0.05)',
  background: 'white',
}));

export default TodoList;
