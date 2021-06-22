import { BrowserRouter, Route } from 'react-router-dom';

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { AuthContextProver } from './contexts/Auth';

function App() {

  return (
    <BrowserRouter>
      <AuthContextProver>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </AuthContextProver>
    </BrowserRouter>
  );
}

export default App;
