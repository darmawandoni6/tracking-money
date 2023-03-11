import React from 'react'
import icons from '@icons/index'
import style from './styles/main.module.scss'
import { getCurrencyString } from '@helpers/curency'
import { useLocation, useNavigate } from 'react-router-dom'

const Jubutron = ({ report, data, route }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  return (
    <div className={style.top}>
      <div className={style.wrapperCard}>
        <div className={style.title}>
          <h1>
            <i className="fa-solid fa-circle-dollar-to-slot"></i>
            Uang Saya
          </h1>
        </div>

        <div className={style.card}>
          <div className={style.body}>
            <section>
              <div className={style.left}>
                <h2>{getCurrencyString(data[0].value)}</h2>
                <p>{data[0].label}</p>
              </div>
              <div className={style.right}>
                <h2>{getCurrencyString(data[1].value)}</h2>
                <p>{data[1].label}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Jubutron)
