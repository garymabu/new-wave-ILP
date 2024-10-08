import * as React from 'react';
import styles from './home-links.module.scss';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';

export default function HomeLinks(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const redirect = (url: string) => () => {
    window.location.href = url;
  };

  return (
    <section>
      <div className={styles.homeContainer}>
        <p className={styles.header}>Atalhos</p>
        <div className={styles.linkContainer}>
          <div className={styles.linkButton} onClick={redirect("/sites/NewWave-ILP/SitePages/Elegíveis.aspx")}>
            <PermIdentityOutlinedIcon fontSize='large' className={styles.pageIco}/>
            <p className={styles.icoFont}>Gestão de Elegíveis</p>
          </div>
          <div className={styles.linkButton} onClick={redirect("/sites/NewWave-ILP/SitePages/Diagrama-de-Incentivo-a-Longo-Prazo.aspx")}>
            <ContactPageOutlinedIcon fontSize='large' className={styles.pageIco}/>
            <p className={styles.icoFont}>Consultar meus pontos</p>
          </div>
          <div className={styles.linkButton} onClick={redirect("/sites/NewWave-ILP/Lists/Empresas/AllItems.aspx")}>
            <BusinessOutlinedIcon fontSize='large' className={styles.pageIco}/>
            <p className={styles.icoFont}>Gestão de Empresas</p>
          </div>
          <div className={styles.linkButton} onClick={redirect("/sites/NewWave-ILP/Lists/Cargos/AllItems.aspx")}>
            <BusinessOutlinedIcon fontSize='large' className={styles.pageIco}/>
            <p className={styles.icoFont}>Gestão de Cargos</p>
          </div>
          <div className={styles.linkButton} onClick={redirect("/sites/NewWave-ILP/SitePages/Elegíveis-por-Empresa.aspx")}>
            <BusinessOutlinedIcon fontSize='large' className={styles.pageIco}/>
            <p className={styles.icoFont}>Elegíveis por Empresa</p>
          </div>
          <div className={styles.linkButton} onClick={redirect("/sites/NewWave-ILP/Lists/Histrico%20de%20Operaes/AllItems.aspx")}>
            <BusinessOutlinedIcon fontSize='large' className={styles.pageIco}/>
            <p className={styles.icoFont}>Histórico de Operações</p>
          </div>
          <div className={styles.linkButton} onClick={redirect("/sites/NewWave-ILP/Lists/Arquivos/AllItems.aspx")}>
            <BusinessOutlinedIcon fontSize='large' className={styles.pageIco}/>
            <p className={styles.icoFont}>Arquivos</p>
          </div>
          <div className={styles.linkButton} onClick={redirect("/sites/NewWave-ILP/Lists/Pontuaes%20concedidas/AllItems.aspx")}>
            <BusinessOutlinedIcon fontSize='large' className={styles.pageIco}/>
            <p className={styles.icoFont}>Pontuações Concedidas</p>
          </div>
          <div className={styles.linkButton} onClick={redirect("/sites/NewWave-ILP/Documentos%20Compartilhados/Forms/AllItems.aspx")}>
            <BusinessOutlinedIcon fontSize='large' className={styles.pageIco}/>
            <p className={styles.icoFont}>Relatórios</p>
          </div>
          <div className={styles.linkButton} onClick={redirect("/sites/NewWave-ILP/SitePages/Elegíveis-Inativados(1).aspx")}>
            <BusinessOutlinedIcon fontSize='large' className={styles.pageIco}/>
            <p className={styles.icoFont}>Elegíveis Inativados</p>
          </div>
        </div>
      </div>
    </section>
  );
}