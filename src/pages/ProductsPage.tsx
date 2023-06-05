import { Link, useSearchParams } from 'react-router-dom';
import { products } from '../data/products';

export const ProductsPage = () => {
  const [searchParams] = useSearchParams();

  const getFiltredProducts = () => {
    const search = searchParams.get('search');
    if (search === null || search === '') {
      return products;
    } else {
      return products.filter(
        (product) => product.name.toLowerCase().indexOf(search.toLowerCase()) > -1,
      );
    }
  };
  return (
    <div className="text-center p-5">
      <h2 className="text-xl font-bold text-slate-600">Here some tools from React</h2>
      <ul className="list-none m-0 p-0">
        {getFiltredProducts().map((product) => (
          <li key={product.id}>
            <Link to={`${product.id}`} className="p-1 text-base text-slate-800 hover:underline">
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
