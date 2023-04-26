import React, { useCallback, useEffect, useState } from 'react';

export default function useCheckImage(url, placeholderUrl) {

    const [imageSrc, setImageSrc] = useState(placeholderUrl);

    const checkImage = useCallback((url) => {
        return new Promise((resolve) => {
            const image = new Image();
            image.onload = () => resolve(url);
            image.onerror = () => resolve(placeholderUrl);
            image.src = url;
        });
    }, [placeholderUrl]);

    useEffect(() => {
        checkImage(url).then((src) => setImageSrc(src));
    }, [url, checkImage]);

    return imageSrc;
}