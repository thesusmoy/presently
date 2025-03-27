import { exportToSvg } from '@excalidraw/excalidraw';
import { jsPDF } from 'jspdf';

// Function to download Excalidraw slides as PDF
const downloadExcalidrawAsPDF = async (slides) => {
    const doc = new jsPDF();

    for (let i = 0; i < slides.length; i++) {
        const slideElements = slides[i];

        // Generate the SVG for the current slide
        const svg = await exportToSvg({
            elements: slideElements,
            appState: {
                viewBackgroundColor: '#ffffff',
            },
        });

        // Convert SVG to a data URL by rendering it on a canvas
        const svgData = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const svgURL = URL.createObjectURL(svgBlob);

        const img = new Image();
        img.src = svgURL;

        // Wait for the image to load before rendering to canvas
        await new Promise((resolve) => {
            img.onload = () => {
                // Create a canvas to render the SVG image
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                // Convert canvas to PNG data URL
                const pngDataUrl = canvas.toDataURL('image/png');

                // Add the image to the PDF
                doc.addImage(pngDataUrl, 'PNG', 10, 10, 180, 160);

                resolve();
            };
        });

        // Add new page if it's not the last slide
        if (i < slides.length - 1) {
            doc.addPage();
        }

        // Clean up the URL object
        URL.revokeObjectURL(svgURL);
    }

    // Download the PDF
    doc.save('presentation.pdf');
};

export default downloadExcalidrawAsPDF;
