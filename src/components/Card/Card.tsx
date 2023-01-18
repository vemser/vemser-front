import React from 'react'
import { FaUserPlus } from 'react-icons/fa'
import { FaRegThumbsUp } from 'react-icons/fa'
import { FaCog } from 'react-icons/fa'
import styles from './Card.module.css'

interface ICard {
    title: string,
    url: string,
}

export const Card = ({title, url}: ICard) => {
  return (
    <a href={url} target='_blank' className={styles.card}>
      <div className={styles.container}>   
        <h2>{title}</h2>
        {title && title == 'Gerencial' ? <FaCog size={72}/> : 
        title && title == 'Avaliação' ? <FaRegThumbsUp size={72}/> :
        title && title == 'Captação' ? <FaUserPlus size={72}/> : ''}
      </div>
    </a>
  )
}
