import React, { useEffect, useState } from 'react';
import { exportToBlob } from '@excalidraw/excalidraw';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const SlidePreview = ({ slideData }) => {
    const [previewImage, setPreviewImage] = useState(null);

    const generatePreview = async () => {
        if (!slideData) return;

        const blob = await exportToBlob({
            elements: slideData,
            mimeType: 'image/png',
        });

        setPreviewImage(URL.createObjectURL(blob));
    };

    useEffect(() => {
        generatePreview();
    }, [slideData]);

    if (!previewImage) return <h1 className="text-center text-2xl font-bold">No data added</h1>;

    return (
        <div className="h-full max-h-[500px] flex flex-col items-center">
            {slideData.length ? (
                <div className="border-2 rounded overflow-hidden flex items-center justify-center">
                    <TransformWrapper
                        initialScale={1}
                        minScale={0.5}
                        maxScale={3}
                        wheel={{ disabled: false }}
                        disabled={false}
                    >
                        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                            <div>
                                <TransformComponent>
                                    <img
                                        src={previewImage}
                                        alt="Slide Preview"
                                        className="block h-[360px] object-contain transition-transform duration-200 ease-in-out cursor-grab"
                                    />
                                </TransformComponent>
                            </div>
                        )}
                    </TransformWrapper>
                </div>
            ) : (
                <h1 className="text-center text-2xl font-bold">No data added</h1>
            )}
            <div className="m-3 text-xs text-center text-gray-600">
                <p>To zoom in or out, use a pinch gesture with two fingers.</p>
            </div>
        </div>
    );
};

export default SlidePreview;
