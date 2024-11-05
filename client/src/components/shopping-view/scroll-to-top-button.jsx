// import React from 'react';
// import { Button } from '../ui/button';
// const ScrollToTopButton = () => {
//     const handleScrollToTop = () => {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     };

//     return (
//         <Button onClick={handleScrollToTop}
//         className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
//         aria-label="Scroll to top">↑</Button>
//     );
// };

// export default ScrollToTopButton;

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { ChevronUp } from 'lucide-react';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleScroll = () => {
        if (window.scrollY > 200) { // Change 200 to adjust when the button appears
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Button
            onClick={handleScrollToTop}
            className={`fixed bottom-4 right-4 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300 ease-in-out transform ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                } active:scale-95`}
            aria-label="Scroll to top"
        >
            <ChevronUp />
        </Button>
    );
};

export default ScrollToTopButton;
