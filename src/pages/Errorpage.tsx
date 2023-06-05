import { useRouteError } from 'react-router-dom';
import { Header } from '../Header';

export const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      <Header />
      <div className="text-center p-5 text-xl">
        <h1 className="text-xl text-slate-900">An Error Occured</h1>
        {isError(error) && <p className="text-base text-slate-700">{error.statusText}</p>}
      </div>
    </>
  );
};

function isError(error: any): error is { statusText: string } {
  console.log(error.statusText);

  return 'statusText' in error;
}
