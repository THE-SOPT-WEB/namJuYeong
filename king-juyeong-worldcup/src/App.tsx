import { BrowserRouter } from 'react-router-dom';

import Router from './Router';
import GlobalStyle from './style/global';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}
