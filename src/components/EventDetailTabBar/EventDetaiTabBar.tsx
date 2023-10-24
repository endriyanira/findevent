import React, { Dispatch, SetStateAction } from 'react'
import TabBarItem from '../TabBarItem/TabBarItem';
import styles from  './EventDetailTabBar.module.scss'

interface EventDetaiTabBarProps {
    tickets?:[]
    merchandises?:[]
    informations?:[]
    activeTab:string
    setActiveTab:Dispatch<React.SetStateAction<string>>
}

const TabBarItems = [
  "Information", "Ticket", "Merchandise"
]

const EventDetaiTabBar = ({activeTab, setActiveTab} : EventDetaiTabBarProps) => {

  return (
    <div className={styles.EventDetailTabBarWrapper}>
        {TabBarItems.map((item) => 
            <TabBarItem key={`${item}`} label={item}  active={activeTab === item} setActiveTab={setActiveTab}  />
        )}
    </div>
  )
}

export default EventDetaiTabBar