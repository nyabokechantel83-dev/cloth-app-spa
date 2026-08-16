import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar';

function renderNavbar() {
    render(
        <MemoryRouter>
            <Navbar />
        </MemoryRouter>
    );
}

test('renders the navigation links', () => {
    renderNavbar();
    const navLinks = screen.getByRole('navigation');
    expect(navLinks).toBeInTheDocument();
});

test('renders the correct number of links', () => {
    renderNavbar();
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(4);
});

test('renders the correct link text', () => {
    renderNavbar();
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const shopLink = screen.getByRole('link', { name: 'Shop' });
    const cartLink = screen.getByRole('link', { name: 'Cart' });
    const adminLink = screen.getByRole('link', { name: 'Admin' });

    expect(homeLink).toBeInTheDocument();
    expect(shopLink).toBeInTheDocument();
    expect(cartLink).toBeInTheDocument();
    expect(adminLink).toBeInTheDocument();
});