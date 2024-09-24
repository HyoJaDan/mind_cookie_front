import React from "react";
import { Text, View } from "react-native";
import Accordion from "react-native-accordion-collapsible";

import { fontStyle } from "../../assets/font/font";
import { IEventData } from "../../data/event";
import { accordionStyle } from "./accordionStyle";

export const renderEvents = (event: IEventData[]) => {
  if (!event || event.length === 0) {
    return null;
  }

  return (
    <View style={{ gap: 20 }}>
      {event?.map((eventItem: IEventData, index: number) => (
        <Accordion
          key={index}
          headerText={`이벤트 #${index + 1} : ${eventItem.whichActivity}`}
          styleHeader={accordionStyle.Header} // 헤더 스타일
          styleHeaderText={fontStyle.BD16}
          style={accordionStyle.accordion} // 전체 스타일
          open={false}
          //컨텐트 스타일
          styleContent={accordionStyle.accordionContent}
        >
          <View style={accordionStyle.boxContainer}>
            <Text>누구와 있었던 일인가요?</Text>
            <View style={accordionStyle.participantContainer}>
              {eventItem.participants.map(
                (participant: string, idx: number) => (
                  <View key={idx} style={accordionStyle.circle}>
                    <Text style={fontStyle.MD16}>{participant}</Text>
                  </View>
                )
              )}
            </View>
          </View>

          <View style={accordionStyle.boxContainer}>
            <Text>누구와 있었던 일인가요?</Text>
            <View style={accordionStyle.circle}>
              <Text style={fontStyle.MD16}>
                {eventItem.emotion} : {eventItem.emotionRate}
              </Text>
            </View>
          </View>
        </Accordion>
      ))}
    </View>
  );
};
