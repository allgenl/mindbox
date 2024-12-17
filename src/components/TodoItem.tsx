import React from 'react';
import { Todo } from '../types/Todo';
import { Checkbox, styled } from '@mui/material';
import { colors } from '../styles/colors';
import CheckIcon from '../assets/checked.svg';
import UncheckIcon from '../assets/unchecked.svg';

interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onToggle }) => (
  <StyledItem>
    <Checkbox
      icon={<img src={UncheckIcon} />}
      checkedIcon={<img src={CheckIcon} />}
      checked={todo.completed}
      onChange={() => onToggle(todo.id)}
      aria-label={`checkbox-${todo.id}`}
      role="checkbox"
      data-testid={`task-${todo.id}`}
      id={`task-${todo.id}`}
    />
    <span
      style={{
        textDecoration: todo.completed ? 'line-through' : 'none',
        color: todo.completed ? colors.grey : colors.primary,
      }}
    >
      {todo.text}
    </span>
  </StyledItem>
);

const StyledItem = styled('li')(() => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '.5rem',
  alignItems: 'center',
  fontSize: '1.5rem',
  borderBottom: `1px solid ${colors.grey}`,
  '& .MuiCheckbox-root': {
    padding: '.875rem',
  },
  '& .MuiCheckbox-root.Mui-checked': {
    color: colors.green,
  },
}));

export default TodoItem;
