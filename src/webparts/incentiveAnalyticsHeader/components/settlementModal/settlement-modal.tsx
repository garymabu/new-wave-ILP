import * as React from "react";
import styles from "./settlement-modal.module.scss";

export interface SettlementModalProps {
  onClose: () => void;
  onSubmit: () => void;
  settlementValue: string;
  participantAmount: number;
  companyName: string;
}

export default ({
  onClose,
  onSubmit,
  participantAmount,
  settlementValue,
  companyName,
} : SettlementModalProps) : React.ReactElement => {
  return (
    <div>
      <div className={styles.settlementModalBackdrop}>
        <div className={styles.settlementModalContent}>
          <p className={styles.headerRow}>Aprovar Liquidação</p>
          <p className={styles.textContent}>Deseja realmente aprovar a Liquidação de {settlementValue} para todos os {participantAmount} participantes do Negócio {companyName}?</p>
          <input type="file" className={styles.fileInput} />
          <div className={styles.buttonRow}>
            <button onClick={onClose} className={styles.cancelButton}>Cancelar</button>
            <button onClick={onSubmit} className={styles.approveButton}>Aprovar</button>
          </div>
        </div>
      </div>
    </div>
  );
}