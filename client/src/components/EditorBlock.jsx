import React, { useCallback } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';
import debounce from 'lodash.debounce';

const EditorBlock = ({ presentation, selectedSlide, slideContent, setSlideContent }) => {
    const debouncedSetSlideContent = useCallback(
        debounce((newContent) => {
            if (JSON.stringify(slideContent) !== JSON.stringify(newContent)) {
                setSlideContent(newContent);
            }
        }, 300),
        [slideContent, setSlideContent]
    );

    const handleChange = (elements) => {
        debouncedSetSlideContent(elements);
    };

    return (
        <div className="h-[500px] border-2">
            {presentation?.slides.length && selectedSlide !== undefined ? (
                <Excalidraw onChange={handleChange} initialData={{ elements: presentation?.slides[selectedSlide] }} />
            ) : (
                <p>Loading slide...</p>
            )}
        </div>
    );
};

export default EditorBlock;
