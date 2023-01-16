import React from 'react'
import { Card } from '../Card/Card'
import styles from './CardList.module.css'

export const CardList = () => {
  return (
    <div className={styles.container}>
        <Card title={'Avaliação'} url={'http://vemser-dbc.dbccompany.com.br:39000/vemser/avaliacao-front/alunos'}/> 
        <Card title={'Captação'} url={'http://vemser-dbc.dbccompany.com.br:39000/vemser/captacao-front/candidatos'}/> 
        <Card title={'Gerencial'} url={'http://vemser-dbc.dbccompany.com.br:39000/vemser/chronos-front/'}/> 
    </div>
  )
}
