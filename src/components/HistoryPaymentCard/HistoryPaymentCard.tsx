import { ITransactions } from '@/pages/user/history'
import { Utils } from '@/utils'
import React from 'react'
import styles from './HistoryPaymentCard.module.scss'

type HistoryPaymentCardProps = {
    transaction:ITransactions
}

const HistoryPaymentCard = ({transaction}:HistoryPaymentCardProps) => {
  return (
    <div className={styles.HistoryCard}>
        <div className={styles.TypeAndTime}>
            <div className={styles.HistoryType}>
                <p className={styles.HistoryTypeText}>{transaction.type}</p>
            </div>
            <p className={styles.HistoryDateTime}>{Utils.getDateAndTime(transaction.createdAt)}</p>
        </div>
        <div className={styles.HistoryInfo}>
            <p className={styles.HistoryInfoAmount}>{Utils.convertPrice(transaction.amount)}</p>
            <p className={styles.HistoryInfoDescription}>{transaction.description}</p>
        </div>

    </div>
  )
}

export default HistoryPaymentCard
