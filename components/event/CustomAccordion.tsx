import React from "react";
import Accordion from "react-native-accordion-collapsible";
import { fontStyle } from "../../assets/font/font";
import { accordionStyle } from "./accordionStyle";

interface AccordionProps {
  headerText: string;
  children: React.ReactNode;
}

export const CustomAccordion: React.FC<AccordionProps> = ({
  headerText,
  children,
}) => {
  return (
    <Accordion
      headerText={headerText}
      styleHeader={accordionStyle.Header}
      styleHeaderText={fontStyle.BD16}
      style={accordionStyle.accordion}
      styleContent={accordionStyle.accordionContent}
    >
      {children}
    </Accordion>
  );
};
