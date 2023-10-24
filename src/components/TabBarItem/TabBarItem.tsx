import React, { ButtonHTMLAttributes, Dispatch, SetStateAction } from 'react'
import styles from './TabBarItem.module.scss'
import classNames from "classnames";


interface TabBarItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?:string
  active?:boolean
  setActiveTab: Dispatch<SetStateAction<string>>
}
const TabBarItem = ({label, active, setActiveTab} : TabBarItemProps) => {
  const TabBarClasses = classNames(styles.tabBarItem, {
    [styles.active] : active
  })
  return (
    <button className={TabBarClasses} onClick={()=> setActiveTab(label!)}>
    {label}
    </button>
  )
}

export default TabBarItem
