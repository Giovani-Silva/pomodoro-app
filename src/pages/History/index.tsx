import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { SmileyXEyes } from "phosphor-react";
import { useContext } from "react";
import { CyclesContext } from "../../context/CyclesContext";
import { HistoryContainer, HistoryList, Message, Status } from "./styles";

export function History() {
  const { cycles } = useContext(CyclesContext);
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
      {!cycles.length && (
        <Message>
          <SmileyXEyes size={32} />
          <div>Não há nenhum histórico de ciclos ainda.</div>
        </Message>
      )}
      {!!cycles.length && (
        <HistoryList>
          <table>
            <thead>
              <tr>
                <th>Tarefa</th>
                <th>Duração</th>
                <th>Duração</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {cycles.map((cycle) => {
                return (
                  <tr key={cycle.id}>
                    <td>{cycle.task}</td>
                    <td>{cycle.minutesAmount} minutos</td>
                    <td>
                      {formatDistanceToNow(cycle.startDate, {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </td>
                    <td>
                      {cycle.finishedDate && (
                        <Status statusColor="green">Concluído</Status>
                      )}

                      {cycle.interruptedDate && (
                        <Status statusColor="red">Interrompido</Status>
                      )}

                      {!cycle.finishedDate && !cycle.interruptedDate && (
                        <Status statusColor="yellow">Em andamento</Status>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </HistoryList>
      )}
    </HistoryContainer>
  );
}
