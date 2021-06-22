import { BrowserRouter, Route } from 'react-router-dom'

import { AuthContextProvider } from './contexts/authContext';
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";


function App() {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Route path="/" component={Home} exact/>
                <Route path="/rooms/new" component={NewRoom} />
            </AuthContextProvider>
        </BrowserRouter>

    );
}

export default App;
