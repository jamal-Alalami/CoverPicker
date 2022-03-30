import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  useColorScheme,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import useThumbnail from './src/lib/hooks/useThumbnails';
import {showImagePicker} from './src/lib/services/ImagePicker';
import GenerateCover from './src/screens/GenerateCover';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App: () => Node = () => {
  const [video, setVideo] = useState(null);
  const [changeCover, setChangeCover] = useState(false);
  const [cover, setCover] = useState(null);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const {thumbnail, generateThumbnail} = useThumbnail();
  useEffect(() => {
    setCover(thumbnail);
  }, [thumbnail]);
  const onUpload = video => {
    setVideo(video);
    generateThumbnail(video);
  };
  const handleUploadVideo = () => {
    showImagePicker(onUpload);
  };
  const handleChangeCover = () => {
    setChangeCover(true);
  };
  const selectCover = cover => {
    setCover(cover);
    setChangeCover(false);
  };
  return (
    <GestureHandlerRootView style={styles.flex1}>
      <SafeAreaView style={[backgroundStyle, styles.flex1]}>
        {changeCover ? (
          <GenerateCover
            video={video}
            cover={cover}
            selectCover={selectCover}
          />
        ) : (
          <View style={styles.container}>
            <TouchableOpacity
              disabled={!cover}
              onPress={handleChangeCover}
              style={styles.imageContainer}>
              <Image
                source={{
                  uri: cover?.path,
                }}
                style={styles.image}
              />
              {!!cover && (
                <View style={styles.imageCover}>
                  <Text style={styles.text}>change cover</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={handleUploadVideo} style={styles.button}>
              <Text>Upload a video</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  flex1: {flex: 1},
  container: {flex: 1, justifyContent: 'center'},
  image: {
    width: '100%',
    height: 400,
    borderRadius: 20,
  },
  imageCover: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 20,
  },
  text: {color: '#fff'},
  button: {
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 250,
    alignSelf: 'center',
  },
});

export default App;
