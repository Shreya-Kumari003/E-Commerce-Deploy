import React from 'react';
import { Typewriter } from 'react-simple-typewriter';

function TitleText() {
    return (
        <div className="flex justify-center items-center">
            <h1 className="font-poppins font-bold text-2xl min-w-[200px]">
                <Typewriter
                    words={['Style Sphere', 'The Art of Styling']}
                    loop={0} // Infinite loop
                    typeSpeed={150}
                    deleteSpeed={50}
                    delaySpeed={800}
                    cursor
                    cursorStyle=""
                />
            </h1>
        </div>
    );
}

export default TitleText;
