import clsx from 'clsx';
import { Link } from 'react-router-dom';

const Nav = ({ isMobile }: { isMobile: boolean }) => {
    console.log('isMobile', isMobile);
    return (
        <div className={clsx('nav', isMobile ? 'mobile' : '')}>
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
