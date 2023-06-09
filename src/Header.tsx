import logo from './assets/logo.svg';
import { Link, NavLink, useSearchParams, Form } from 'react-router-dom';

export const Header = () => {
  const [searchParams] = useSearchParams();

  return (
    <header className="text-center text-slate-50 bg-slate-900 h-40 p-5">
      <Form className="relative text-right" action="/products">
        <input
          type="search"
          name="search"
          placeholder="Search"
          defaultValue={searchParams.get('search') ?? ''}
          className="absolute right-0 rounded py-2 px-3 text-gray-700"
        ></input>
      </Form>
      <Link to="">
        <img src={logo} alt="Logo" className="inline-block h-20" />
      </Link>
      <Link to="">
        <h1 className="text-2xl">React Tools</h1>
      </Link>
      <nav>
        <NavLink
          to="products"
          className={({ isActive }) =>
            `text-white no-underline p-1 pb-0.5 border-solid border-b-2 ${
              isActive ? 'border-white' : 'border-transparent'
            }`
          }
        >
          Products
        </NavLink>
        <NavLink
          to="admin"
          className={({ isActive }) =>
            `text-white no-underline p-1 pb-0.5 border-solid border-b-2 ${
              isActive ? 'border-white' : 'border-transparent'
            }`
          }
        >
          Admin
        </NavLink>
        <NavLink
          to="contact"
          className={({ isActive }) =>
            `text-white no-underline p-1 pb-0.5 border-solid border-b-2 ${
              isActive ? 'border-white' : 'border-transparent'
            }`
          }
        >
          Contact
        </NavLink>
        <NavLink
          to="posts"
          className={({ isActive }) =>
            `text-white no-underline p-1 pb-0.5 border-solid border-b-2 ${
              isActive ? 'border-white' : 'border-transparent'
            }`
          }
        >
          Posts
        </NavLink>
      </nav>
    </header>
  );
};
