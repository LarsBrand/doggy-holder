import React from "react";

function hslToRgb(h: number, s: number, l: number) {
    let r, g, b;

    function hue2rgb(p: number, q: number, t: number) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}


export const useRandomBackgroundColor = () => {
    React.useEffect(() => {
        const hsl = { h: (Math.random()), s: 0.7, l: 0.41 };
        const rgb = hslToRgb(hsl.h, hsl.s, hsl.l)
        const freshColor = '#' + rgb.r.toString(16) + rgb.g.toString(16) + rgb.b.toString(16);
        document.documentElement.style.setProperty('--primary-color', freshColor)
    }, [])
}