import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import scoreServices from "../services/scores.js";

const ScoreTableItems = () => {
  const [scores, setScores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchScores = async () => {
      setIsLoading(true);
      try {
        const scoresData = await scoreServices.getAllScores();
        scoresData.sort((a, b) => b.score - a.score);
        setScores(scoresData);
      } catch (error) {
        console.error("Error fetching scores:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScores();
  }, []);

  return (
    <>
      {isLoading ? (
        <Center my={10}>
          <Spinner />
        </Center>
      ) : (
        <Table variant="simple" size="md" m={2}>
          <Thead>
            <Tr>
              <Th> </Th>
              <Th>Username</Th>
              <Th>Round Reached</Th>
              <Th textAlign="center">Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {scores.slice(0, 10).map((score, index) => (
              <Tr
                key={score.id}
                className={index % 2 === 0 ? "even-row" : "odd-row"}
              >
                <Td textAlign="center">{index + 1}</Td>
                <Td textAlign="center">{score.user.nickname}</Td>
                <Td textAlign="center">{score.score}</Td>
                <Td textAlign="center">
                  {new Date(score.createdAt).toLocaleDateString("en-UK")}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </>
  );
};

export default ScoreTableItems;
