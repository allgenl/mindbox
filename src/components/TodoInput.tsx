import React, { useState } from 'react';
import { Button, Input, styled } from '@mui/material';
import { colors } from '../styles/colors';
import ArrowDownIcon from '../assets/arrow-down.svg';

interface Props {
  onAdd: (text: string) => void;
}

const TodoInput: React.FC<Props> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  const handleAdornmentClick = () => {
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <StyledInput
      startAdornment={
        <Button
          onClick={handleAdornmentClick}
          startIcon={<img src={ArrowDownIcon} alt="Icon" />}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          data-testid="add-task"
        />
      }
      type="text"
      placeholder="What needs to be done?"
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyPress={handleKeyPress}
    />
  );
};

const StyledInput = styled(Input)(() => ({
  width: '100%',
  backgroundColor: colors.input,
  outline: 'none',
  border: 'none',
  color: colors.primary,
  fontStyle: 'italic',
  fontSize: '1.5rem',
  display: 'flex',
  gap: '1rem',
  borderBottom: `1px solid ${colors.grey}`,
  '&::placeholder': {
    color: colors.secondary,
  },
  '&::before': {
    content: 'none',
  },
  '&::after': {
    content: 'none',
  },
  '& .MuiButtonBase-root': {
    minWidth: 'unset',
    outline: 'none',
    '&:focus': {
      outline: 'none',
    },
  },
  '& .MuiButton-startIcon': {
    margin: '0',
    padding: '.25rem',
  },
}));

export default TodoInput;
