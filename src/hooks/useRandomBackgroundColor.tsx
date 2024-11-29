import React from "react";

type RGB = {
    r: number
    g: number
    b: number
}

type HSL = {
    h: number
    s: number
    l: number
}

const hslToRgb = (input: HSL): RGB => {
    const { h, s, l } = input
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

const hexa = (n: number): string => n.toString(16).padStart(2, '0')
const toCssColor = ({ r, g, b }: RGB) => `#${hexa(r)}${hexa(g)}${hexa(b)}`
const toContrastColor = ({ r, g, b }: RGB) => (r * 0.199 + g * 0.587 + b * 0.114) < 70 ? '#ffffff' : '#000000'

export const useRandomBackgroundColor = () => {
    React.useEffect(() => {
        const hue = Math.random()
        const hue2 = hue > .5 ? hue - .2 : hue + .2
        const hslPrimary = { h: hue2, s: .8, l: 0.2 }
        const hslPrimaryLight = { h: hue, s: 1, l: 0.37 }
        const hslPrimaryBackgroundBorder = { h: hue, s: .3, l: 0.25 }
        document?.documentElement.style.setProperty('--primary-color', toCssColor(hslToRgb(hslPrimary)))
        document?.documentElement.style.setProperty('--primary-color-light', toCssColor(hslToRgb(hslPrimaryLight)))
        document?.documentElement.style.setProperty('--primary-color-background-border', toCssColor(hslToRgb(hslPrimaryBackgroundBorder)) + '44')
        document?.documentElement.style.setProperty('--primary-text-shadow-color', toContrastColor(hslToRgb(hslPrimaryLight)))
    }, [])
}

// ScriptRandomBackgroundColor renders a regualar script tag.
// it's used to set the background color before react hydrates/runs
// it's a copy of the hook above, including functions being called
// usage: render in <head> tag.
export const ScriptRandomBackgroundColor = () => {
    return <script>
        {`
          if(!window.didSetColor){
            var hslToRgb=r=>{let{h:o,s:e,l:t}=r,l,s,h;function a(r,o,e){return(e<0&&(e+=1),e>1&&(e-=1),e<1/6)?r+(o-r)*6*e:e<.5?o:e<2/3?r+(o-r)*(2/3-e)*6:r}if(0===e)l=s=h=t;else{let n=t<.5?t*(1+e):t+e-t*e,$=2*t-n;l=a($,n,o+1/3),s=a($,n,o),h=a($,n,o-1/3)}return{r:Math.round(255*l),g:Math.round(255*s),b:Math.round(255*h)}},hexa=r=>r.toString(16).padStart(2,"0"),toCssColor=({r,g:o,b:e})=>\`#\${hexa(r)}\${hexa(o)}\${hexa(e)}\`,toContrastColor=({r,g:o,b:e})=>.199*r+.587*o+.114*e<70?"#ffffff":"#000000",hue=Math.random(),hue2=hue>.5?hue-.2:hue+.2,hslPrimary={h:hue2,s:.8,l:.2},hslPrimaryLight={h:hue,s:1,l:.37},hslPrimaryBackgroundBorder={h:hue,s:.3,l:.25};document?.documentElement.style.setProperty("--primary-color",toCssColor(hslToRgb(hslPrimary))),document?.documentElement.style.setProperty("--primary-color-light",toCssColor(hslToRgb(hslPrimaryLight))),document?.documentElement.style.setProperty("--primary-color-background-border",toCssColor(hslToRgb(hslPrimaryBackgroundBorder))+"44"),document?.documentElement.style.setProperty("--primary-text-shadow-color",toContrastColor(hslToRgb(hslPrimaryLight)));
          }
          window.didSetColor = true
        `}
    </script>
}