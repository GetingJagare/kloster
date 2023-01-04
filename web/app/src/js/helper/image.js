export const srcSet = (data) => {
    const srcExt = data.main.match(/\.(.+)/)[1],
        src = data.main.replace(/\-[^-]+$/, '');

    return Object.keys(data.dimensions).map((w) => `${src}-${data.dimensions[w]}.${srcExt} ${data.dimensions[w]}w`).join(', ');
};

export const sizes = (data) => Object.keys(data.dimensions).map((w) => `(max-width: ${w}px) ${data.dimensions[w]}px`).join(', ');
