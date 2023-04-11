import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const Logo = () => {
    const logoRef = useRef();

    useEffect(() => {
        const sketch = (p) => {
            p.setup = () => {
                p.createCanvas(300, 100);
                p.textSize(24);
                p.noLoop();
            };

            p.draw = () => {
                p.background(255);

                // Customize the logo colors and styles
                p.fill(0, 0, 255);
                p.textFont('Arial');
                p.text('Mark', 25, 50);

                p.fill(255, 0, 0);
                p.textFont('Arial Black');
                p.text('Kirichev', 100, 50);
            };
        };

        new p5(sketch, logoRef.current);
    }, []);

    return <div ref={logoRef}></div>;
};

export default Logo;
