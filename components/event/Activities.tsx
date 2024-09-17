import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { accordionStyle } from "./accordionStyle";

interface ActivitiesProps {
  activities: string[];
  selectedActivity: string;
  handleSelection: (activity: string, type: string) => void;
  handlePresentModalPress: (type: string) => void;
}

export const Activities: React.FC<ActivitiesProps> = ({
  activities,
  selectedActivity,
  handleSelection,
  handlePresentModalPress,
}) => {
  return (
    <View style={accordionStyle.boxContainer}>
      <Text>어떤 일을 했나요?</Text>
      <View style={accordionStyle.participantContainer}>
        {activities.map((activity, index) => (
          <TouchableOpacity
            key={index}
            style={[
              accordionStyle.circle,
              selectedActivity === activity && { backgroundColor: "#BAA9FF" },
            ]}
            onPress={() => handleSelection(activity, "activities")}
          >
            <Text>{activity}</Text>
          </TouchableOpacity>
        ))}
        {/* + 버튼 */}
        <TouchableOpacity
          style={accordionStyle.circle}
          onPress={() => handlePresentModalPress("activities")}
        >
          <Ionicons name="add" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
