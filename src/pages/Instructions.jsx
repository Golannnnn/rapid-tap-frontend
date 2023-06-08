import { useState } from "react";
import { Flex, Image, Button } from "@chakra-ui/react";
import mobile_1 from "../assets/mobile_1.png";
import mobile_2 from "../assets/mobile_2.png";
import mobile_3 from "../assets/mobile_3.png";
import desktop_1 from "../assets/desktop_1.png";
import desktop_2 from "../assets/desktop_2.png";
import desktop_3 from "../assets/desktop_3.png";
import {
  TbArrowBigLeftLinesFilled,
  TbArrowBigRightLinesFilled,
} from "react-icons/tb";

const Instructions = () => {
  const [isMobile, setIsMobile] = useState(true);
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    index !== 0 && setIndex(index - 1);
  };

  const handleNext = () => {
    index !== 2 && setIndex(index + 1);
  };

  const image = isMobile
    ? [mobile_1, mobile_2, mobile_3]
    : [desktop_1, desktop_2, desktop_3];

  console.log("isMobile", isMobile);
  console.log("index", index);

  return (
    <Flex justify="center" align="center" direction="column" mt={5}>
      <Flex justify="center" align="center" gap={10}>
        <Button
          onClick={() => {
            setIsMobile(true);
          }}
          colorScheme={isMobile ? "blue" : "gray"}
        >
          Mobile
        </Button>
        <Button
          onClick={() => {
            setIsMobile(false);
          }}
          colorScheme={!isMobile ? "blue" : "gray"}
        >
          Desktop
        </Button>
      </Flex>
      <Flex align="center" justify="center" direction="column" mx={10}>
        <Image h="500px" src={image.splice(index, 1)} />
        <Flex gap={20}>
          <TbArrowBigLeftLinesFilled
            size="100px"
            cursor="pointer"
            style={{
              visibility: index === 0 ? "hidden" : "visible",
            }}
            onClick={handlePrev}
          />
          <TbArrowBigRightLinesFilled
            size="100px"
            cursor="pointer"
            style={{
              visibility: index === 2 ? "hidden" : "visible",
            }}
            onClick={handleNext}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Instructions;
