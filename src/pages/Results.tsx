
import {
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Window,
  WindowContent,
  WindowHeader,
} from "react95";
import { useQuizAnswersContext } from "../contexts/QuizAnswersContext";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
function Results() {
  const navigate = useNavigate();
  const { answers } = useQuizAnswersContext();

  if (!answers || answers.length <= 0) navigate("/");

  return (
    <Window>
      <WindowHeader>Cevaplar</WindowHeader>
      <WindowContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Soru Id</TableHeadCell>
              <TableHeadCell>Soru</TableHeadCell>
              <TableHeadCell>Cevap</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {answers.map((answer) => (
              <TableRow key={answer?.id}>
                <TableDataCell style={{ textAlign: "center" }}>
                  <span role="img" aria-label="LEAF">
                    {answer?.id}
                  </span>
                </TableDataCell>
                <TableDataCell>{answer?.title}</TableDataCell>
                <TableDataCell>{`${
                  answer?.option.key.length ? answer?.option.key + ")" : ""
                }  ${answer?.option.value}`}</TableDataCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </WindowContent>
      <Navigation />
    </Window>
  );
}

export default Results;
