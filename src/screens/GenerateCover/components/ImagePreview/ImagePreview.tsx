import React, {useEffect} from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
import VideoPreview from '../../../../components/VideoPreview';

const BUTTON_WIDTH = Dimensions.get('window').width - 32;
const BUTTON_HEIGHT = 80;

const H_SWIPE_RANGE = BUTTON_WIDTH - 60;
const ImagePreview = ({thumbnails, video, seconds, setSeconds, duration}) => {
  // Animated value for X translation
  const X = useSharedValue(0);
  let ss = 0;
  // Gesture Handler Events
  const animatedGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = X.value;
    },
    onActive: (event, ctx) => {
      let newValue = ctx.startX + event.translationX;
      if (newValue >= 0 && newValue <= H_SWIPE_RANGE) {
        X.value = newValue;
        // lastX.value = newValue;
      } else if (newValue < 0) {
        X.value = 0;
      } else if (newValue > H_SWIPE_RANGE) {
        X.value = H_SWIPE_RANGE;
      }
      const ration = newValue / BUTTON_WIDTH;
      runOnJS(setSeconds)(ration * duration);
    },
    onEnd: _ => {},
  });

  const AnimatedStyles = {
    swipeable: useAnimatedStyle(() => {
      return {
        transform: [{translateX: X.value}],
      };
    }),
  };

  return (
    <Animated.View style={[styles.swipeContainer]}>
      <PanGestureHandler hitSlop={320} onGestureEvent={animatedGestureHandler}>
        <Animated.View style={[styles.swipeable, AnimatedStyles.swipeable]}>
          <VideoPreview
            style={{height: BUTTON_HEIGHT, width: 58}}
            video={video}
            seconds={seconds}
          />
        </Animated.View>
      </PanGestureHandler>
      <View style={styles.row}>
        {thumbnails.map(thumbnail => (
          <Image
            source={{uri: thumbnail.path}}
            style={{flex: 1, height: '100%', resizeMode: 'contain'}}
          />
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  swipeContainer: {
    height: BUTTON_HEIGHT,
    width: BUTTON_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    alignSelf: 'center',
  },
  swipeable: {
    position: 'absolute',
    height: BUTTON_HEIGHT + 8,
    width: 60,
    borderRadius: 8,
    zIndex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 4,
    borderWidth: 2,
    borderColor: '#fff',
  },
  row: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    backgroundColor: '#000',
  },
});

export default ImagePreview;
