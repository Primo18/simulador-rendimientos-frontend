import { Outlet } from 'react-router';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

export const App = () => {
    return (
        <div>
            <Navbar />
            <main className="p-4">
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};
