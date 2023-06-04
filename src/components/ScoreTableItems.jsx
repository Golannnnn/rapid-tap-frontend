import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import scoreServices from "../services/scores.js";

const ScoreTableItems = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const scoresData = await scoreServices.getAllScores();
        setScores(scoresData);
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    };

    fetchScores();
   }, []);

  return (
    <Table variant="simple" size="md">
      <Thead>
        <Tr>
          <Th>Username</Th>
          <Th>Level Reached</Th>
        </Tr>
      </Thead>
      <Tbody>
        {scores.slice(0, 10).map(score => (
          <Tr key={score.id}>
            <Td textAlign="center">{score.user.nickname}</Td>
            <Td textAlign="center">{score.score}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default ScoreTableItems;
