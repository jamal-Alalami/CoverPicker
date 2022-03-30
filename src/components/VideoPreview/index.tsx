import React, {useRef, useEffect} from 'react';
import Video from 'react-native-video';
import {StyleSheet, View} from 'react-native';

function VideoPreview(props) {
  const videoRef = useRef();
  useEffect(() => {
    videoRef?.current?.seek?.(+props.seconds / 1000);
  }, [props.seconds]);
  return (
    <View style={props.style}>
      <Video
        ref={videoRef}
        source={{uri: props.video}} // Can be a URL or a local file.
        style={styles.backgroundVideo}
        muted={true}
        paused={true}
        resizeMode="cover"
      />
    </View>
  );
}

var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 8,
  },
});
export default VideoPreview;
