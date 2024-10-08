import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import styles from './incentive-simulator.module.scss';

export interface IncentiveSimulatorTableRow {
  name: string;
  email: string;
  jobTitle: string;
  companyName: string;
  dedication: string;
  vestedPoints: number;
  unvestedPoints: number;
  referenceDate: string;
  pointsPerYear: number;
}

export interface IncentiveSimulatorTableProps {
  selectedParticipantData: IncentiveSimulatorTableRow[];
}

const IncentiveSimulatorTable = ({ selectedParticipantData }: IncentiveSimulatorTableProps) => {
  console.log('selectedParticipantData', selectedParticipantData);
  return (
    <div className={styles.incentiveSimulatorTable}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Cargo</TableCell>
              <TableCell>Empresa</TableCell>
              <TableCell>Dedicação</TableCell>
              <TableCell>Pontuação Vested</TableCell>
              <TableCell>Pontuação Unvested</TableCell>
              <TableCell>Pontos por Ano</TableCell>
              <TableCell>Data de Referência</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              selectedParticipantData.map((participant) => (
                <TableRow key={`${participant.email} ${participant.referenceDate}`}>
                  <TableCell>{participant.name}</TableCell>
                  <TableCell>{participant.email}</TableCell>
                  <TableCell>{participant.jobTitle}</TableCell>
                  <TableCell>{participant.companyName}</TableCell>
                  <TableCell>{participant.dedication}</TableCell>
                  <TableCell>{participant.vestedPoints}</TableCell>
                  <TableCell>{participant.unvestedPoints}</TableCell>
                  <TableCell>{participant.pointsPerYear}</TableCell>
                  <TableCell>{participant.referenceDate}</TableCell>
                </TableRow>
              ))
            }
            {/* <TableRow className={styles.participantRow}>
              <TableCell className={styles.participantHeader}>Nome:</TableCell>
              <TableCell>{selectedParticipant.Participante.FirstName} {selectedParticipant.Participante.LastName}</TableCell>
            </TableRow>
            <TableRow className={styles.participantRow}>
              <TableCell className={styles.participantHeader}>Email:</TableCell>
              <TableCell>{selectedParticipant.Participante.EMail}</TableCell>
            </TableRow>
            <TableRow className={styles.participantRow}>
              <TableCell className={styles.participantHeader}>Cargo:</TableCell>
              <TableCell>{selectedParticipant.Cargo.Title}</TableCell>
            </TableRow>
            <TableRow className={styles.participantRow}>
              <TableCell className={styles.participantHeader}>Empresa:</TableCell>
              <TableCell>{selectedParticipant.Empresa.Title}</TableCell>
            </TableRow>
            <TableRow className={styles.participantRow}>
              <TableCell className={styles.participantHeader}>Pontuação Vested:</TableCell>
              <TableCell>{selectedParticipant.PNW}</TableCell>
            </TableRow>
            <TableRow className={styles.participantRow}>
              <TableCell className={styles.participantHeader}>Pontuação Unvested:</TableCell>
              <TableCell>{selectedParticipant.Unvested_x0020_Points}</TableCell>
            </TableRow> */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default IncentiveSimulatorTable;