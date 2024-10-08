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
  const [partialSettlement, setPartialSettlement] = React.useState<boolean>(false);
  const [partialSettlementValue, setPartialSettlementValue] = React.useState<number>(0);
  const handleIncorrectValues = (ev:{target:{value:string}}) => {
    const value = Number(ev.target.value);
    if(value < 20) {
      ev.target.value = '20';
    } else if(value > 50) {
      ev.target.value = '50';
    }
    setPartialSettlementValue(Number(ev.target.value));
  };
  return (
    <div>
      <div className={styles.settlementModalBackdrop}>
        <div className={styles.settlementModalContent}>
          <p className={styles.headerRow}>Aprovar Liquidação</p>
          <p className={styles.textContent}>Deseja realmente aprovar a Liquidação de {settlementValue} para todos os {participantAmount} participantes do Negócio {companyName}?</p>
          <input type="file" className={styles.fileInput} />
          <div>
            <div className={styles.partialSettlementSelector}>
              <p>Liquidação parcial?</p>
              <input
                type="checkbox"
                checked={partialSettlement}
                onChange={(ev) => setPartialSettlement(ev.target.checked)}
              />
            </div>
            {
              partialSettlement && (
                <div className={styles.partialSettlementContainer}>
                  <p className={styles.partialSettlementText}>Valor da Liquidação Parcial</p>
                  <input
                    type="number"
                    min={20}
                    onBlur={handleIncorrectValues}
                    onChange={(ev) => setPartialSettlementValue(Number(ev.target.value))}
                    value={partialSettlementValue}
                    max={50}
                    className={styles.partialSettlementInput}
                  />
                  %
                </div>
              )
            }
          </div>
          <div className={styles.buttonRow}>
            <button onClick={onClose} className={styles.cancelButton}>Cancelar</button>
            <button onClick={onSubmit} className={styles.approveButton}>Aprovar</button>
          </div>
        </div>
      </div>
    </div>
  );
}