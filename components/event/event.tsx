import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Alert, BackHandler, ScrollView } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import { apiClient } from "../../data/apiClient";
import { eventData } from "../../data/event";
import { baseURLData, memberData } from "../../data/userData";
import { DefaultButton } from "../../util/defaultButton";
import { Activities } from "./Activities";
import { BottomSheetInput } from "./BottomSheetInput";
import { CustomAccordion } from "./CustomAccordion";
import { Emotions } from "./Emptions";
import { Participants } from "./Participants";
import { renderEvents } from "./renderEvents";
import { BottomSheetModalStyle } from "./styles";
export type handlePresentModalPressType = "참가자" | "활동" | "감정";

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
  const [newData, setNewData] = useState("");
  const [dataType, setDataType] = useState("");
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handleSheetChanges = useCallback(() => {}, []);
  const snapPoints = useMemo(() => ["90%"], []);
  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps
    ) => (
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
    const backAction = () => {
      if (bottomSheetModalRef.current) {
        bottomSheetModalRef.current.close(); // 모달 닫기
        return true; // 뒤로가기 기본 동작 방지
      }
      return false; // 기본 동작 허용
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
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

  const handlePresentModalPress = (type: handlePresentModalPressType) => {
    setDataType(type);
    bottomSheetModalRef.current?.present();
  };

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
    resetNewEvent();
    bottomSheetModalRef.current?.close();
  };

  const resetNewEvent = () => {
    setNewEvent({
      participants: [],
      whichActivity: "",
      emotion: "",
      emotionRate: 50,
    });
  };

  const handleAddNewData = (newDataType: string) => {
    if (!newData) {
      bottomSheetModalRef.current?.dismiss();
      return;
    }

    const isDuplicate = checkForDuplicates(newDataType, newData);
    if (isDuplicate) {
      Alert.alert("Error", `이미 존재하는 ${newDataType}입니다.`);
      return;
    }

    updateMemberData(newDataType, newData);
    handleSelection(newData, newDataType);
    setNewData("");
    bottomSheetModalRef.current?.dismiss();
  };

  const checkForDuplicates = (type: string, value: string) => {
    if (type === "참가자") return member.event_participants.includes(value);
    if (type === "활동") return member.event_activities.includes(value);
    if (type === "감정") return member.event_emotions.includes(value);
    return false;
  };

  const updateMemberData = (type: string, value: string) => {
    setMember((prev) => {
      if (type === "참가자") {
        return {
          ...prev,
          event_participants: [...prev.event_participants, value],
        };
      } else if (type === "활동") {
        return { ...prev, event_activities: [...prev.event_activities, value] };
      } else if (type === "감정") {
        return { ...prev, event_emotions: [...prev.event_emotions, value] };
      }
      return prev;
    });
  };

  const handleSelection = (item: string, type: string) => {
    setNewEvent((prevEvent) => {
      if (type === "참가자") {
        return {
          ...prevEvent,
          participants: prevEvent.participants.includes(item)
            ? prevEvent.participants.filter((p) => p !== item)
            : [...prevEvent.participants, item],
        };
      } else if (type === "활동") {
        return { ...prevEvent, whichActivity: item };
      } else if (type === "감정") {
        return { ...prevEvent, emotion: item };
      }
      return prevEvent;
    });
  };

  return (
    <BottomSheetModalProvider>
      <ScrollView contentContainerStyle={BottomSheetModalStyle.scrollContainer}>
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
          <DefaultButton pressHandler={addEvent} text="이벤트 추가하기" />
        </CustomAccordion>
      </ScrollView>

      <BottomSheetInput
        bottomSheetModalRef={bottomSheetModalRef}
        newData={newData}
        setNewData={setNewData}
        handleAddNewData={handleAddNewData}
        dataType={dataType}
        snapPoints={snapPoints}
        handleSheetChanges={handleSheetChanges}
        renderBackdrop={renderBackdrop}
      />
    </BottomSheetModalProvider>
  );
}
