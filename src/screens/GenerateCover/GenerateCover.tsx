import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import VideoPreview from '../../components/VideoPreview';
import useThumbnail from '../../lib/hooks/useThumbnails';
import ImagePreview from './components/ImagePreview';
interface Props {
  video: string;
  selectCover: any;
}
function GenerateCover(props: Props) {
  const {thumbnails, generateMultiThumbnails, generateThumbnail} =
    useThumbnail();
  const [seconds, setSeconds] = useState(0);
  useEffect(async () => {
    generateMultiThumbnails(props.video, 5);
  }, []);

  const handleSelect = async () => {
    const thumbnail = await generateThumbnail(props.video, parseInt(seconds));
    props.selectCover(thumbnail);
  };
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <VideoPreview
        style={styles.video}
        video={props?.video.path}
        seconds={seconds}
      />
      <ImagePreview
        thumbnails={thumbnails}
        video={props.video?.path}
        seconds={seconds}
        setSeconds={setSeconds}
        duration={props.video?.duration}
      />
      <TouchableOpacity onPress={handleSelect} style={styles.button}>
        <Text>Done</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  video: {height: 400, width: 250, alignSelf: 'center', marginBottom: 24},
  button: {
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GenerateCover;
