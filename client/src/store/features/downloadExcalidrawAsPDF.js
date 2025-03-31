import { exportToSvg } from '@excalidraw/excalidraw';
import { jsPDF } from 'jspdf';

const downloadExcalidrawAsPDF = async (slides) => {
    const doc = new jsPDF();

    for (let i = 0; i < slides.length; i++) {
        const slideElements = slides[i];

        const svg = await exportToSvg({
            elements: slideElements,
            appState: {
                viewBackgroundColor: '#ffffff',
            },
        });

        const svgData = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const svgURL = URL.createObjectURL(svgBlob);

        const img = new Image();
        img.src = svgURL;

        await new Promise((resolve) => {
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const scaleFactor = 1;
                canvas.width = img.width * scaleFactor;
                canvas.height = img.height * scaleFactor;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                const jpgDataUrl = canvas.toDataURL('image/jpeg', 0.7);

                doc.addImage(jpgDataUrl, 'JPEG', 10, 10, 180, 160);

                resolve();
            };
        });

        if (i < slides.length - 1) {
            doc.addPage();
        }

        URL.revokeObjectURL(svgURL);
    }

    doc.save('presentation.pdf');
};

export default downloadExcalidrawAsPDF;
