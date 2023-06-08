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
import { CheckList, IdValue } from './CheckList';
import { useState } from 'react';

const queryClient = new ApolloClient({
  uri: process.env.REACT_APP_GITHUB_URL!,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_PAT}`,
  },
});

function App() {
  const [checkedId, setCheckedId] = useState<IdValue | null>(null);

  function handleCheckedIdsChange(newCheckedIds: IdValue[]) {
    const newCheckedIdArr = newCheckedIds.filter((id) => id !== checkedId);
    if (newCheckedIdArr.length === 1) {
      setCheckedId(newCheckedIdArr[0]);
    } else {
      setCheckedId(null);
    }
  }

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
      <div className="p-10">
        <CheckList
          data={[
            { id: 1, name: 'Lucy', role: 'Manager' },
            { id: 2, name: 'Bob', role: 'Developer' },
            { id: 3, name: 'Bill', role: 'Developer' },
            { id: 4, name: 'Dill', role: 'Developer' },
            { id: 5, name: 'Fill', role: 'QA' },
            { id: 6, name: 'Kill', role: 'UX' },
          ]}
          id="id"
          primary="name"
          secondary="role"
          style={{
            width: '300px',
            maxHeight: '380px',
            overflowY: 'auto',
          }}
          checkedIds={checkedId === null ? [] : [checkedId]}
          onCheckedIdsChange={handleCheckedIdsChange}
          // renderItem={(item) => (
          //   <li
          //     key={item.id}
          //     className="bg-white p-4
          //   border-b-2"
          //   >
          //     <div className="text-xl text-slate-800 pb-1">{item.name}</div>
          //     <div className="text-slate-500">{item.role}</div>
          //   </li>
          // )}
        />
      </div>
    </>
  );
}

export default App;
