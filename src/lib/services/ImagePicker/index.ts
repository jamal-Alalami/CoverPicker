import ImagePicker from 'react-native-image-crop-picker';

export const showImagePicker = (onSelect: (uri: any) => void) => {
  ImagePicker.openPicker({
    mediaType: 'video',
  })
    .then(video => {
      onSelect(video);
    })
    .catch(e => {});
};
