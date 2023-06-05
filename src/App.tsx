import { Outlet } from 'react-router-dom';
import './App.css';
import { Header } from './Header';
import { AuthButton } from './AuthButton';
import { Main } from './Main';
import { store } from './store/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Provider store={store}>
        <AuthButton />
        <Main />
      </Provider>
    </>
  );
}

export default App;
