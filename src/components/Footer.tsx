export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-6">
            <div className="container mx-auto text-center">
                <div className="mb-4">
                    <h4 className="text-lg font-semibold text-white">Simulador Bancario</h4>
                    <p className="text-sm">© 2024 Todos los derechos reservados.</p>
                </div>
                <div className="flex justify-center space-x-4">
                    <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400"
                    >
                        <i className="fab fa-facebook fa-lg"></i>
                    </a>
                    <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400"
                    >
                        <i className="fab fa-twitter fa-lg"></i>
                    </a>
                    <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400"
                    >
                        <i className="fab fa-linkedin fa-lg"></i>
                    </a>
                </div>
                <div className="mt-4">
                    <p className="text-xs">
                        Desarrollado por <span className="text-blue-400">DapCold</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};
