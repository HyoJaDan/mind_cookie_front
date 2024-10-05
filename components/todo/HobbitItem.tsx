import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../assets/color/color";
import { HobbitStatus, PrimaryHobbit } from "../../data/todo";

interface HobbitItemProps {
  primaryHobbit: PrimaryHobbit;
  hobbit: HobbitStatus;
  onClick: (
    primaryHobbitId: number,
    primaryHobbit: string,
    hobbitId: number,
    isDone: boolean
  ) => void;
}

const HobbitItem: React.FC<HobbitItemProps> = ({
  primaryHobbit,
  hobbit,
  onClick,
}) => {
  const backgroundColor = hobbit.done
    ? Colors.grayscale.gray400
    : primaryHobbit.color || "#f2f2f2";
  return (
    <TouchableOpacity
      style={[styles.hobbitStatusContainer, { backgroundColor }]}
      onPress={() =>
        onClick(
          primaryHobbit.primaryHobbitId,
          primaryHobbit.primaryHobbit,
          hobbit.hobbitId,
          hobbit.done
        )
      }
    >
      {hobbit.done ? (
        <View>
          <Text style={[styles.hobbitText, styles.hobbitTextDone]}>
            {hobbit.hobbit}
          </Text>
          <Text style={[styles.primaryHobbitInfo, styles.hobbitTextDone]}>
            #{primaryHobbit.primaryHobbit}
          </Text>
        </View>
      ) : (
        <View>
          <Text style={styles.hobbitText}>{hobbit.hobbit}</Text>
          <Text style={styles.primaryHobbitInfo}>
            #{primaryHobbit.primaryHobbit}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  hobbitStatusContainer: { padding: 10, marginVertical: 5, borderRadius: 5 },
  hobbitText: { fontSize: 16 },
  hobbitTextDone: {
    textDecorationLine: "line-through",
    color: Colors.grayscale.gray900,
  },
  primaryHobbitInfo: { fontSize: 12, color: Colors.grayscale.gray700 },
});

export default HobbitItem;
