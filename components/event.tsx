import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import {
  Accordion,
  AccordionItem,
} from "@mustapha-ghlissi/react-native-accordion";
import Slider from "@react-native-community/slider";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import { eventData } from "../data/Event";
import { apiClient } from "../data/apiClient";
import { baseURLData, memberData } from "../data/user/userData";
import { DefaultButton } from "../uitll/defaultButton";

export default function Event({ selectedDate }: { selectedDate: string }) {
  const [event, setEvent] = useRecoilState(eventData);
  const [member] = useRecoilState(memberData);
  const baseURL = useRecoilValue(baseURLData);

  const [newEvent, setNewEvent] = useState({
    participants: [],
    whichActivity: "",
    emotion: "",
    emotionRate: 0,
  });

  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  // SelectedDate가 바뀌면 해당 날짜의 Event 데이터를 가져오는 함수
  useEffect(() => {
    async function fetchEventData() {
      const response = await apiClient(baseURL, "/event-list", "GET", null, {
        date: selectedDate,
      });
      if (response) {
        setEvent(response.data);
      }
    }
    fetchEventData();
  }, [selectedDate]);

  // Event 추가 함수
  const addEvent = async () => {
    await apiClient(baseURL, "/event", "PUT", {
      date: selectedDate,
      ...newEvent,
    });
    setNewEvent({
      participants: [],
      whichActivity: "",
      emotion: "",
      emotionRate: 0,
    });
    bottomSheetModalRef.current?.close();
  };

  // 기존 이벤트들을 아코디언 형식으로 표시
  const renderEvents = () => {
    return (
      <Accordion compact animationDuration={250}>
        {event?.map((eventItem, index) => (
          <AccordionItem
            key={index}
            title={`Event ${index + 1}`}
            subTitle={`Date: ${selectedDate}`}
            rightIcon="chevron-right"
          >
            <View style={styles.boxContainer}>
              <Text>누구와 있었던 일인가요?</Text>
              <Text>{eventItem.participants.join(", ")}</Text>
            </View>
            <View style={styles.boxContainer}>
              <Text>어떤 일을 했나요?</Text>
              <Text>{eventItem.whichActivity}</Text>
            </View>
            <View style={styles.boxContainer}>
              <Text>어떤 감정을 느꼈나요?</Text>
              <Text>
                {eventItem.emotion} (감정 지수: {eventItem.emotionRate})
              </Text>
            </View>
          </AccordionItem>
        ))}
      </Accordion>
    );
  };

  // 새로운 이벤트 추가 아코디언
  const renderAddEventAccordion = () => {
    return (
      <Accordion compact animationDuration={250}>
        <AccordionItem title="새로운 이벤트를 추가해요!" rightIcon="plus">
          <View style={styles.boxContainer}>
            <Text>누구와 있었던 일인가요?</Text>
            {member.event_participants.map((participant, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  setNewEvent((prev) => ({
                    ...prev,
                    participants: [...prev.participants, participant],
                  }))
                }
              >
                <Text>{participant}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.boxContainer}>
            <Text>어떤 일을 했나요?</Text>
            <TextInput
              placeholder="활동 입력"
              value={newEvent.whichActivity}
              onChangeText={(text) =>
                setNewEvent({ ...newEvent, whichActivity: text })
              }
            />
          </View>

          <View style={styles.boxContainer}>
            <Text>어떤 감정을 느꼈나요?</Text>
            <TextInput
              placeholder="감정 입력"
              value={newEvent.emotion}
              onChangeText={(text) =>
                setNewEvent({ ...newEvent, emotion: text })
              }
            />
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              step={1}
              value={newEvent.emotionRate}
              onValueChange={(value) =>
                setNewEvent({ ...newEvent, emotionRate: value })
              }
              minimumTrackTintColor="#0000FF"
              maximumTrackTintColor="#000000"
            />
          </View>
          <DefaultButton pressHandler={addEvent} text="Event 추가하기" />
        </AccordionItem>
      </Accordion>
    );
  };

  return (
    <BottomSheetModalProvider>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {renderEvents()}
        {renderAddEventAccordion()}
      </ScrollView>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  boxContainer: {
    width: 327,
    height: 100, // box 높이를 조정했습니다
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#FFF",
    shadowColor: "rgba(0, 18, 38, 0.03)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  slider: {
    width: 300,
    height: 40,
  },
});
