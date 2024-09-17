import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { accordionStyle } from "./accordionStyle";

interface ParticipantsProps {
  participants: string[];
  selectedParticipants: string[];
  handleSelection: (participant: string, type: string) => void;
  handlePresentModalPress: (type: string) => void;
}

export const Participants: React.FC<ParticipantsProps> = ({
  participants,
  selectedParticipants,
  handleSelection,
  handlePresentModalPress,
}) => {
  return (
    <View style={accordionStyle.boxContainer}>
      <Text>누구와 있었던 일인가요?</Text>
      <View style={accordionStyle.participantContainer}>
        {participants.map((participant, index) => (
          <TouchableOpacity
            key={index}
            style={[
              accordionStyle.circle,
              selectedParticipants.includes(participant) && {
                backgroundColor: "#BAA9FF",
              },
            ]}
            onPress={() => handleSelection(participant, "participants")}
          >
            <Text>{participant}</Text>
          </TouchableOpacity>
        ))}
        {/* + 버튼 */}
        <TouchableOpacity
          style={accordionStyle.circle}
          onPress={() => handlePresentModalPress("participants")}
        >
          <Ionicons name="add" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
