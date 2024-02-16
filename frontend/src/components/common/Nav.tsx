import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div className="nav">
            <ul>
                <li>
                    <Link to={'/'}> Home </Link>
                </li>
                <li>
                    <Link to={'/'}> A propos </Link>
                </li>
                <li>
                    <Link to={'/dashboard/publications'}> Dashboard </Link>
                </li>
            </ul>
        </div>
    );
};

export default Nav;
