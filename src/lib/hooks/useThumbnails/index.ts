import {createThumbnail} from 'react-native-create-thumbnail';
import {useEffect, useState} from 'react';

interface Props {
  url?: string;
  time?: number;
}
function useThumbnail() {
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);

  const generateThumbnail = async (video, time) => {
    const thumbnail = await createThumbnail({
      url: video.path,
      timeStamp: time ?? 0,
    });
    setThumbnail(thumbnail);
    return thumbnail;
  };

  const generateMultiThumbnails = async (video, numberOfThumbnails) => {
    const step = video.duration / numberOfThumbnails;
    const thumnails = [];
    for (let i = 0; i < numberOfThumbnails; i++) {
      thumnails.push(
        createThumbnail({
          url: video.path,
          timeStamp: step * i,
        }),
      );
    }
    const thumbs = await Promise.all(thumnails);
    setThumbnails(thumbs);
  };
  return {
    thumbnail,
    thumbnails,
    generateThumbnail,
    generateMultiThumbnails,
  };
}

export default useThumbnail;
