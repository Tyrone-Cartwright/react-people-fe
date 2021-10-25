import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <header className='Header'>
      <Link to='/'>
        <div>People App</div>
      </Link>
    </header>
  );
};

export default Header;
