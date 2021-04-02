import { useEffect, useState } from 'react';
interface Props {
  windowHeight: number;
  windowWidth: number;
}

function AllImages({ windowHeight, windowWidth }: Props) {
  const [images, setImages] = useState([]);

  const recursiveFetch = async () => {
    try {
      let data = await fetch('https://dog.ceo/api/breeds/image/random/16');
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

  return (
    <div>
      {images.map((url, index) => (
        <img
          style={{ objectFit: 'cover' }}
          width={windowWidth / 4}
          height={windowHeight / 4}
          key={url}
          src={url}
          alt={`${index}`}
        />
      ))}
    </div>
  );
}

export default AllImages;
