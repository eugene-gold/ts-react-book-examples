import { Outlet } from 'react-router-dom';
import './App.css';
import { Header } from './Header';
import { AuthButton } from './AuthButton';
import { Main } from './Main';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { GraphHeader } from './githubapi/GraphHeader';
import { RepoPage } from './githubapi/RepoPage';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const queryClient = new ApolloClient({
  uri: process.env.REACT_APP_GITHUB_URL!,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_PAT}`,
  },
});

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Provider store={store}>
        <AuthButton />
        <Main />
      </Provider>
      <ApolloProvider client={queryClient}>
        <GraphHeader />
        <RepoPage />
      </ApolloProvider>
    </>
  );
}

export default App;
