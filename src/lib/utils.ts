import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function loadImageFromFile(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        if (!file) return reject(new Error('No file provided'));
        if (file.type.split('/')[0] !== 'image') return reject(new Error('Provided file is not an image'));

        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = reader.result as string;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export function calculateStageSize(image: HTMLImageElement) {
    const maxWidth = 800;
    const maxHeight = 600;
    const aspectRatio = image.width / image.height;

    let width = maxWidth;
    let height = maxWidth / aspectRatio;

    if (height > maxHeight) {
        height = maxHeight;
        width = maxHeight * aspectRatio;
    }

    return { width, height };
}
