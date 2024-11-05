function ShoppingFooter() {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto text-center">
                <p className="mb-4">&copy; 2024 My E-Commerce Site. All rights reserved.</p>
                <ul className="flex justify-center space-x-6">
                    <li>
                        <a href="#terms" className="hover:underline">Terms of Service</a>
                    </li>
                    <li>
                        <a href="#privacy" className="hover:underline">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#contact" className="hover:underline">Contact Us</a>
                    </li>
                    <li>
                        <a href="#faq" className="hover:underline">FAQ</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default ShoppingFooter;
