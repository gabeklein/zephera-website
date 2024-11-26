import './style.css';

import { createRoot } from 'react-dom/client';

import { Home } from './home';

window.addEventListener("load", () => {
  const root = createRoot(
    document.getElementById('react-root')
  );
  
  root.render(<Home />);
});