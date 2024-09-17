import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import { apiClient } from "../../data/apiClient";
import { eventData } from "../../data/event";
import { baseURLData, memberData } from "../../data/user/userData";

import { DefaultButton } from "../../uitll/defaultButton";
import { Activities } from "./Activities";

import { CustomAccordion } from "./CustomAccordion";
import { Emotions } from "./Emptions";
import { Participants } from "./Participants";
import { renderEvents } from "./renderEvents";

export default function Event({ selectedDate }: { selectedDate: string }) {
  const [event, setEvent] = useRecoilState(eventData);
  const [member, setMember] = useRecoilState(memberData);
  const baseURL = useRecoilValue(baseURLData);

  const [newEvent, setNewEvent] = useState({
    participants: [],
    whichActivity: "",
    emotion: "",
    emotionRate: 50,
  });

  const [newData, setNewData] = useState(""); // 추가할 새로운 데이터
  const [dataType, setDataType] = useState(""); // 추가할 데이터 타입
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["30%"], []);
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

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

  const addEvent = async () => {
    if (
      newEvent.participants.length === 0 ||
      !newEvent.whichActivity ||
      !newEvent.emotion
    ) {
      Alert.alert("Error", "모든 데이터를 입력해주세요.");
      return;
    }

    await apiClient(baseURL, "/event", "PUT", {
      date: selectedDate,
      ...newEvent,
    });
    setEvent((prev) => [...prev, newEvent]);
    setNewEvent({
      participants: [],
      whichActivity: "",
      emotion: "",
      emotionRate: 0,
    });
    bottomSheetModalRef.current?.close();
  };

  const addNewData = () => {
    if (newData == "") {
      bottomSheetModalRef.current?.dismiss();
      return;
    }

    if (dataType === "participants") {
      setMember((prev) => ({
        ...prev,
        event_participants: [...prev.event_participants, newData],
      }));
      handleSelection(newData, "participants");
    } else if (dataType === "activities") {
      setMember((prev) => ({
        ...prev,
        event_activities: [...prev.event_activities, newData],
      }));
      handleSelection(newData, "activities");
    } else if (dataType === "emotions") {
      setMember((prev) => ({
        ...prev,
        event_emotions: [...prev.event_emotions, newData],
      }));
      handleSelection(newData, "emotions");
    }
    setNewData("");
    bottomSheetModalRef.current?.dismiss();
  };

  const handleSelection = (item: string, type: string) => {
    if (type === "participants") {
      setNewEvent((prevEvent) => ({
        ...prevEvent,
        participants: prevEvent.participants.includes(item)
          ? prevEvent.participants.filter((p) => p !== item)
          : [...prevEvent.participants, item],
      }));
    } else if (type === "activities") {
      setNewEvent((prevEvent) => ({
        ...prevEvent,
        whichActivity: item,
      }));
    } else if (type === "emotions") {
      setNewEvent((prevEvent) => ({
        ...prevEvent,
        emotion: item,
      }));
    }
  };
  const handlePresentModalPress = (type) => {
    setDataType(type); // 추가할 데이터 타입 설정 (participants, activities, emotions)
    bottomSheetModalRef.current?.present();
  };

  return (
    <BottomSheetModalProvider>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 24,
          gap: 20,
        }}
      >
        {renderEvents(event)}
        <CustomAccordion headerText="새로운 이벤트를 추가해 보세요!">
          <Participants
            participants={member.event_participants}
            selectedParticipants={newEvent.participants}
            handleSelection={handleSelection}
            handlePresentModalPress={handlePresentModalPress}
          />
          <Activities
            activities={member.event_activities}
            selectedActivity={newEvent.whichActivity}
            handleSelection={handleSelection}
            handlePresentModalPress={handlePresentModalPress}
          />
          <Emotions
            emotions={member.event_emotions}
            selectedEmotion={newEvent.emotion}
            emotionRate={newEvent.emotionRate}
            handleSelection={handleSelection}
            setEmotionRate={(value) =>
              setNewEvent({ ...newEvent, emotionRate: value })
            }
            handlePresentModalPress={handlePresentModalPress}
          />
          <DefaultButton pressHandler={addEvent} text="Event 추가하기" />
        </CustomAccordion>
      </ScrollView>

      {/* BottomSheetModal */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
      >
        <View style={BottomSheetModalStyle.wrapper}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
            새 항목 추가
          </Text>
          <TextInput
            placeholder="새 항목 입력"
            value={newData}
            onChangeText={setNewData}
            style={BottomSheetModalStyle.text}
          />
          <DefaultButton pressHandler={() => addNewData()} text="항목 추가" />
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
export const BottomSheetModalStyle = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 10,
  },
  text: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    width: "100%",
  },
});
