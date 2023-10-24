import React, { Dispatch } from 'react'
import styles from './HistoryTabBar.module.scss'
import TabBarItem from '../TabBarItem/TabBarItem'

interface HistoryTabBarProps {
    activeTab:string
    setActiveTab:Dispatch<React.SetStateAction<string>>
}

const HistoryTabItems = [
    'My Tickets',
    'My Transactions',
]

const HistoryTabBar = ({
    activeTab,
    setActiveTab
}:HistoryTabBarProps) => {
  return (
    <div className={styles.HistoryTabBarWrapper}>
      {HistoryTabItems.map((item) =>
        <TabBarItem key={`key:${item}`} 
            label={item}
            active={activeTab === item}
            setActiveTab={setActiveTab}
        />
      )}
    </div>
  )
}

export default HistoryTabBar
