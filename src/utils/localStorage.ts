import { Todo } from '../types/Todo';

const STORAGE_KEY = 'todoApp';

export const saveToLocalStorage = (todos: Todo[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

export const loadFromLocalStorage = (): Todo[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};
