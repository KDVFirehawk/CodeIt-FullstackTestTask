import 'materialize-css';
import { useAuthorization } from './hooks/auth.hook';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Loader } from './components/Loader';
import { AuthContext } from './context/AuthContext';
import { useRoutes } from './routes';

function App() {
	const authContext = useAuthorization();
	const routes = useRoutes();

	if (!authContext.ready) return <Loader />;

	return (
		<AuthContext.Provider value={{ ...authContext }}>
			<BrowserRouter>
				<Navbar />
				{routes}
			</BrowserRouter>
		</AuthContext.Provider>
	);
}

export default App;
