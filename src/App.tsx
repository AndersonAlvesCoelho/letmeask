import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";

import { AuthContextProver } from './contexts/Auth';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { AdminRoom } from './pages/AdminRoom';

function App() {

  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <AuthContextProver>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/rooms/new" component={NewRoom} />
            <Route path="/rooms/:id" component={Room} />

            <Route path="/admin/rooms/:id" component={AdminRoom} />
          </Switch>
        </AuthContextProver>
      </ThemeContextProvider>
    </BrowserRouter>
  );
}

export default App;
