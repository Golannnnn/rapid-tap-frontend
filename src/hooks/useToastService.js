import { useBreakpointValue, useToast } from "@chakra-ui/react";

/**
 * How to use this hook in a component:
 * import useToastService from "../hooks/useToastService";
 * const { displayToast } = useToastService();
 * displayToast("error", "message here");
 */

const useToastService = () => {
  const toast = useToast();

  const position = useBreakpointValue({
    sm: "bottom",
    md: "bottom",
    lg: "bottom-right",
    base: "bottom",
  });

  const displayToast = (status, description) => {
    toast({
      position: position,
      description,
      status,
      duration: 2500,
      isClosable: true,
    });
  };

  return { displayToast };
};

export default useToastService;
