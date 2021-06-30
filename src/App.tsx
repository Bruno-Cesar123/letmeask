import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import { ToastContainer } from 'react-toastify';

import usePersistedTheme from './hooks/usePersistedTheme';
import { light } from './styles/themes/light';
import { dark } from './styles/themes/dark';

import { NewRoom } from "./pages/NewRoom";
import { Home } from "./pages/Home";
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';

import GlobalStyle from './styles/global';

import { AuthContextProvider } from './contexts/AuthContext';

import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  const [theme, setTheme] = usePersistedTheme<DefaultTheme>('theme', light);

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  };

  return (
    <BrowserRouter>

      <ThemeProvider theme={theme}>
          <AuthContextProvider>

            <Switch>
              <Route path='/' exact>
                <Home toggleTheme={toggleTheme} />
              </Route>
              <Route path='/rooms/new' component={NewRoom} />
              <Route path='/rooms/:id' component={Room} />

              <Route path='/admin/rooms/:id' component={AdminRoom} />
            </Switch>
            <ToastContainer autoClose={3000} className="toast-container" />
            <GlobalStyle />
          </AuthContextProvider>
      </ThemeProvider>

    </BrowserRouter>
  );
}

export default App;
