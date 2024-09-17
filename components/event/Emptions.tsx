import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import Ionicons from "@expo/vector-icons/Ionicons";
import { accordionStyle } from "./accordionStyle";

interface EmotionsProps {
  emotions: string[];
  selectedEmotion: string;
  emotionRate: number;
  handleSelection: (emotion: string, type: string) => void;
  handlePresentModalPress: (type: string) => void;
  setEmotionRate: (value: number) => void;
}

export const Emotions: React.FC<EmotionsProps> = ({
  emotions,
  selectedEmotion,
  emotionRate,
  handleSelection,
  handlePresentModalPress,
  setEmotionRate,
}) => {
  return (
    <View style={accordionStyle.boxContainer}>
      <Text>어떤 감정을 느꼈나요?</Text>
      <View style={accordionStyle.participantContainer}>
        {emotions.map((emotion, index) => (
          <TouchableOpacity
            key={index}
            style={[
              accordionStyle.circle,
              selectedEmotion === emotion && { backgroundColor: "#BAA9FF" },
            ]}
            onPress={() => handleSelection(emotion, "emotions")}
          >
            <Text>{emotion}</Text>
          </TouchableOpacity>
        ))}
        {/* + 버튼 */}
        <TouchableOpacity
          style={accordionStyle.circle}
          onPress={() => handlePresentModalPress("emotions")}
        >
          <Ionicons name="add" size={20} color="black" />
        </TouchableOpacity>
      </View>
      {/* 슬라이더 추가 */}
      <Slider
        style={accordionStyle.slider}
        minimumValue={0}
        maximumValue={100}
        step={1}
        value={emotionRate}
        onValueChange={setEmotionRate}
        minimumTrackTintColor="#0000FF"
        maximumTrackTintColor="#000000"
      />
    </View>
  );
};
