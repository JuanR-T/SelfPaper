import { Menu, MenuProps } from 'antd';
import Nav from '../ui/Nav';
import Contact from '../ui/Contact';

const BurgerMenu = ({ isMobile }: { isMobile: boolean }) => {
    const items = [
        {
            key: 'sub1',
            label: 'Menu',
            children: [
                {
                    key: 'g1',
                    label: <Nav isMobile={isMobile} />,
                    type: 'group',
                    children: [],
                },
                {
                    key: 'g2',
                    label: <Contact isMobile={isMobile} />,
                    type: 'group',
                    children: [],
                },
            ],
        },
    ];

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };

    return (
        <div className="header mobile">
            <Menu
                onClick={onClick}
                style={{
                    width: 200,
                    color: 'white',
                    backgroundColor: 'transparent',
                    fontSize: '18px',
                }}
                mode="inline"
                items={items}
            />
        </div>
    );
};

export default BurgerMenu;
