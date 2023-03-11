import React from 'react'
import style from '../styles/main.module.scss'
import { getCurrencyString } from '@helpers/curency'
import { initialName } from '@helpers/manipulateString'
import cx from 'classnames'
import DetailTransaksi from './DetailTransaksi'

const List = ({ data }) => {
  const [list, setList] = React.useState([])
  const [active, setActive] = React.useState(0)
  const [show, setShow] = React.useState()

  React.useEffect(() => {
    let filter = data.filter((item) => !item.isHutang && item.value !== 0)
    if (active === 1) filter = data.filter((item) => item.isHutang && item.value !== 0)
    else if (active === 2) filter = data.filter((item) => item.value == 0)
    setList(filter)
  }, [data])

  React.useEffect(() => {
    if (show) {
      const boxShadow = document.getElementById('boxShadow')
      boxShadow.classList.add(style.boxShadow)
      const detail = document.getElementById('detailHutangPiutang')
      detail.style.display = 'block'
      return () => {
        boxShadow.classList.remove(style.boxShadow)
        detail.style.display = 'none'
      }
    }
  }, [show])

  const handleFilter = (idx) => {
    setActive(idx)
    let filter = data.filter((item) => !item.isHutang && item.value !== 0)
    if (idx === 1) filter = data.filter((item) => item.isHutang && item.value !== 0)
    else if (idx === 2) filter = data.filter((item) => item.value == 0)

    setList(filter)
  }
  const handleCloseBack = () => {
    setShow(null)
  }
  return (
    <div className={style.list}>
      <header>
        <ul>
          <li className={active === 0 ? style.active : ''} onClick={() => handleFilter(0)}>
            Utang Saya
          </li>
          <li className={active === 1 ? style.active : ''} onClick={() => handleFilter(1)}>
            Utang Pelanggan
          </li>
          <li className={active === 2 ? style.active : ''} onClick={() => handleFilter(2)}>
            Lunas
          </li>
        </ul>
      </header>
      <section>
        <div className={style.listData}>
          {!list[0] && (
            <div className={style.empty}>
              <h1>Tidak ada data ...</h1>
            </div>
          )}
          {list.map((item) => (
            <div className={style.mainList} key={item.id} onClick={() => setShow(item)}>
              <div className={style.label}>
                <div className={style.box}>{initialName(item.user.name)}</div>

                {item.user.name}
              </div>
              <div className={cx(style.value, item.isHutang ? style.hutang : style.piutang)}>
                {getCurrencyString(Math.abs(item.value))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <div id="boxShadow" onClick={handleCloseBack} />
      <div id="detailHutangPiutang" className={style.detailWrapper}>
        {show && <DetailTransaksi data={show} setShow={handleCloseBack} />}
      </div>
    </div>
  )
}

export default React.memo(List)
