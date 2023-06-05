import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import scoreServices from "../services/scores.js";
import "../Index.css"; // Import your CSS file

const ScoreTableItems = () => {
  const [scores, setScores] = useState([]);
  const [prevScore, setPrevScore] = useState([])

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
    <Table variant="simple" size="md" m={2}>
      <Thead>
        <Tr>
          <Th> </Th>
          <Th>Username</Th>
          <Th>Level Reached</Th>
          <Th>Total Taps</Th>
        </Tr>
      </Thead>
      <Tbody>
        {scores.slice(0, 10).map((score, index) => (
          <Tr key={score.id} className={index % 2 === 0 ? "even-row" : "odd-row"}>
            <Td textAlign="center">{index + 1}</Td>
            <Td textAlign="center">{score.user.nickname}</Td>
            <Td textAlign="center">{score.score}</Td>
            <Td textAlign='center'>Update</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default ScoreTableItems;