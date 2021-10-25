import { Link } from 'react-router-dom';
// Link tags allow us to perform client side routing to avoid default refresh
// Link tags manipulate our browser's history or AKA "HTML history API"

const Header = (props) => {
  return (
    <header className='Header'>
      <Link to='/'>
        <h1>People App</h1>
      </Link>
    </header>
  );
};

export default Header;
