import { Card } from '../Card/Card';
import styles from './CardList.module.css';

export const CardList = () => {
  return (
    <div className={styles.container}>
      <Card title={'Avaliação'} url={`${process.env.REACT_APP_BACKEND_URL}/vemser/avaliacao-front/alunos`} />
      <Card title={'Captação'} url={`${process.env.REACT_APP_BACKEND_URL}/vemser/captacao-front/candidatos`} />
      <Card title={'Gerencial'} url={`${process.env.REACT_APP_BACKEND_URL}/vemser/chronos-front/`} />
    </div>
  )
}
