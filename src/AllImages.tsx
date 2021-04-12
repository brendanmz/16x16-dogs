import { useEffect, useState } from 'react';
interface Props {
  windowHeight: number;
  windowWidth: number;
}

function AllImages({ windowHeight, windowWidth }: Props) {
  const [images, setImages] = useState<Array<string>>([]);
  const [allLoaded, setAllLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState<Array<number>>([]);

  /** Loads 36 random dog images */
  const fetchImages: () => void = async () => {
    try {
      const data = await fetch('https://dog.ceo/api/breeds/image/random/36');
      const response = await data.json();
      setImages(response.message);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  /** Set's allLoaded to true when all images have been received */
  const handleImagesLoaded = (index: number) => () => {
    setLoadedCount([...loadedCount, index]);
    if (loadedCount.length === 35) {
      setAllLoaded(true);
    }
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gridTemplateRows: 'repeat(6, 1fr)',
      }}
    >
      {images.map((url, index) => (
        <img
          style={{
            objectFit: 'cover',
            opacity: allLoaded ? 1 : 0,
            transition: `opacity 0.25s ease-in`,
            transitionDelay: `${index / 16}s`,
          }}
          width={Math.round(windowWidth / 6)}
          height={Math.round(windowHeight / 6)}
          key={url}
          src={url}
          alt={`${index}`}
          onLoad={handleImagesLoaded(index)}
        />
      ))}
    </div>
  );
}

export default AllImages;
