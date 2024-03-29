import * as React from 'react';
import { App } from './components/App';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
container && createRoot(container).render(<App />);
