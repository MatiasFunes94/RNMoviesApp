import React, { useCallback } from "react";
import { View, Alert } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

interface Props {
    playing: boolean;
    setPlaying: any;
    videoToPlay: string;
}

const YoutubePlayerComponent = ({playing, setPlaying, videoToPlay}: Props) => {

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  return (
    <View style={{marginTop: 20}}>
      <YoutubePlayer
        height={250}
        play={playing}
        videoId={videoToPlay}
        onChangeState={onStateChange}
      />
    </View>
  );
}

export default YoutubePlayerComponent;
