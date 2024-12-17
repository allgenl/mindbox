import { Button, styled, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { colors } from '../styles/colors';

interface Props {
  activeCount: number;
  onClearCompleted: () => void;
  setShowStatus: (value: boolean | null) => void;
}

interface TabContent {
  title: string;
  value: boolean | null; // `null` для всех, `true` для активных, `false` для выполненных
}

const TodoFooter: React.FC<Props> = ({ activeCount, onClearCompleted, setShowStatus }) => {
  const tabsContent: TabContent[] = [
    {
      title: 'All',
      value: null,
    },
    {
      title: 'Active',
      value: false,
    },
    {
      title: 'Completed',
      value: true,
    },
  ];

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    setShowStatus(tabsContent[newValue].value);
  };

  return (
    <StyledFooter>
      <StyledCount>{activeCount} items left</StyledCount>
      <StyledTabs value={selectedTab} onChange={handleTabChange} TabIndicatorProps={{ style: { display: 'none' } }}>
        {tabsContent.map((tab, index) => (
          <StyledTab key={index} label={tab.title} />
        ))}
      </StyledTabs>
      <StyledButton onClick={onClearCompleted} data-testid="delete-task">
        Clear completed
      </StyledButton>
    </StyledFooter>
  );
};

const StyledCount = styled('span')(() => ({
  padding: '.5rem',
  fontSize: '.75rem',
  color: colors.secondary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
}));

const StyledTabs = styled(Tabs)(() => ({
  '& .MuiTabs-fixed': {
    display: 'flex',
  },
  '& .MuiTabs-flexContainer': {
    display: 'flex',
    gap: '.5rem',
    margin: 'auto 0',
  },
}));

const StyledTab = styled(Tab)(() => ({
  padding: '.5rem',
  fontSize: '.75rem',
  width: 'fit-content',
  minWidth: 'unset',
  minHeight: 'unset',
  outline: 'none',
  height: 'fit-content',
  borderRadius: '.25rem',
  textTransform: 'none',
  color: colors.secondary,
  '&:focus': {
    outline: 'none',
  },
  '&.Mui-selected': {
    color: colors.secondary,
    outline: `1px solid ${colors.pink}`,
    outlineOffset: '-1px',
  },
}));

const StyledButton = styled(Button)(() => ({
  padding: '.5rem',
  fontSize: '.75rem',
  width: 'fit-content',
  minWidth: 'unset',
  minHeight: 'unset',
  outline: 'none',
  height: 'fit-content',
  borderRadius: '.25rem',
  textTransform: 'none',
  color: colors.secondary,
  justifySelf: 'end',
  alignSelf: 'center',
  '&:focus': {
    outline: 'none',
  },
  '&.Mui-selected': {
    color: colors.secondary,
    outline: `1px solid ${colors.pink}`,
    outlineOffset: '-1px',
  },
}));

const StyledFooter = styled('footer')(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '.5rem',
  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.05)',
  zIndex: '2',
  backgroundColor: 'white',
}));

export default TodoFooter;
