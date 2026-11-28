import { projects } from './projects';

type GallerySelection = { project: number; images?: number[] };

const selections: Record<string, GallerySelection[]> = {
  'roboty-budowlane': [
    { project: 5 }, { project: 9 }, { project: 11 }, { project: 12, images: [0, 1, 2, 3] },
    { project: 13, images: [0, 1, 2, 3] }, { project: 14, images: [0, 1, 2] }, { project: 17 }
  ],
  'projektowanie-wnetrz': [
    { project: 0, images: [0, 1] }, { project: 1, images: [0] }, { project: 2, images: [0] },
    { project: 6, images: [0] }, { project: 7, images: [0] }, { project: 15, images: [0, 1] },
    { project: 18, images: [0] }, { project: 19, images: [0] }, { project: 22, images: [0] },
    { project: 24, images: [0] }, { project: 27, images: [0] }, { project: 31, images: [0] },
    { project: 32, images: [0] }, { project: 36, images: [0] }
  ],
  'remonty-pod-klucz': [
    { project: 0, images: [0] }, { project: 1, images: [0] }, { project: 2, images: [0] },
    { project: 3, images: [0] }, { project: 6, images: [0] }, { project: 7, images: [0] },
    { project: 15, images: [0] }, { project: 18, images: [0] }, { project: 19, images: [0] },
    { project: 20, images: [0] }, { project: 21, images: [0, 1] }, { project: 25, images: [0] },
    { project: 29, images: [0] }, { project: 36, images: [0] }
  ],
  'prace-glazurnicze': [
    { project: 2 }, { project: 8 }, { project: 20, images: [0, 1, 2] }, { project: 25 },
    { project: 26, images: [0, 1] }, { project: 30, images: [0, 1, 2] }, { project: 33, images: [0, 1, 2] }
  ],
  'posadzki-i-podlogi': [
    { project: 4 }, { project: 10 }, { project: 38, images: [0, 1, 2, 3, 4, 5] },
    { project: 39 }, { project: 40, images: [0, 1, 2] }, { project: 41, images: [0, 1] },
    { project: 42, images: [0, 1, 2, 3] }
  ],
  'prace-wykonczeniowe': [
    { project: 3 }, { project: 6 }, { project: 15, images: [0, 1] }, { project: 18, images: [0, 1] },
    { project: 21, images: [0, 1, 2] }, { project: 22, images: [0] },
    { project: 27, images: [0, 1] }, { project: 29, images: [0, 1] }
  ],
  'ocieplanie-i-elewacje': [{ project: 11 }, { project: 12 }, { project: 17 }],
  instalacje: [{ project: 23 }, { project: 9 }],
  'tarasy-i-schody': [{ project: 37 }, { project: 39 }]
};

export function getServiceGallery(slug: string) {
  return (selections[slug] ?? []).flatMap(({ project: projectIndex, images }) => {
    const project = projects[projectIndex];
    if (!project) return [];
    const selectedImages = images ? images.map(index => project.images[index]).filter(Boolean) : project.images;
    return selectedImages.map(image => ({ ...image, projectTitle: project.title }));
  });
}
