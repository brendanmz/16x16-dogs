import { useEffect, useState } from 'react';
interface Props {
  windowHeight: number;
  windowWidth: number;
}

function AllImages({ windowHeight, windowWidth }: Props) {
  const [images, setImages] = useState<Array<string>>([]);
  const [allLoaded, setAllLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState<Array<number>>([]);

  const recursiveFetch = async () => {
    try {
      // loads 16 random dog images
      const data = await fetch('https://dog.ceo/api/breeds/image/random/16');
      const response = await data.json();
      setImages(response.message);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  useEffect(() => {
    recursiveFetch();
  }, []);

  /** Set's allLoaded to true when all images have been received */
  const handleImagesLoaded = (index: number) => () => {
    setLoadedCount([...loadedCount, index]);
    if (loadedCount.length === 15) {
      setAllLoaded(true);
    }
  };

  return (
    <div>
      {images.map((url, index) => (
        <img
          style={{
            objectFit: 'cover',
            opacity: allLoaded ? 1 : 0,
            transition: `opacity 0.25s ease-in`,
            transitionDelay: `${index / 8}s`,
          }}
          width={Math.round(windowWidth / 4) - 4} // TODO: find better solution to avoid page wrapping
          height={Math.round(windowHeight / 4)}
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
