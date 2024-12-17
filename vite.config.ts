/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Включаем глобальные функции, такие как describe, test, expect
    environment: 'jsdom', // Устанавливаем среду для работы с DOM
    setupFiles: './src/test/setup.ts', // Настройка перед тестами
  },
});