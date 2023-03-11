import React from 'react'
import style from '../styles/main.module.scss'
import { pushTranskasi } from '../helpers/manipulationArray'
import cx from 'classnames'

const List = ({ filter, data }) => {
  const [list, setList] = React.useState([])
  const [show, setShow] = React.useState()

  React.useEffect(() => {
    if (show) {
      const boxShadow = document.getElementById('boxShadow')
      boxShadow.classList.add(style.boxShadow)
      const detailTransaksi = document.getElementById('detailTransaksi')
      detailTransaksi.style.display = 'block'
      return () => {
        boxShadow.classList.remove(style.boxShadow)
        detailTransaksi.style.display = 'none'
      }
    }
  }, [show])

  React.useEffect(() => {
    if (filter[0]) {
      const res = pushTranskasi(filter)
      setList(res)
    }
  }, [filter])

  React.useEffect(() => {
    setList(data)
  }, [data])

  const handleCloseBack = React.useCallback((e) => {
    if (e.target.id === 'boxShadow') {
      setShow(null)
    }
  }, [])

  return (
    <div className={style.list}>
      <header>
        <ul>
          <li>Nama</li>
          <li>Uang Masuk</li>
          <li>Uang Keluar</li>
        </ul>
      </header>
      <section>
        {!list[0] ? (
          <div className={style.empty}>
            <h1>Tidak ada data ...</h1>
          </div>
        ) : (
          <div className={style.data}>
            {list.map((item, i) => (
              <React.Fragment key={i}>
                <ul className={item.date && style.header}>
                  <li>{item.date}</li>
                  <li>{item.uangMasuk.toLocaleString('id')}</li>
                  <li>{item.uangKeluar.toLocaleString('id')}</li>
                </ul>
                {item.data.map((d, id) => (
                  <ul key={id} className={style.user} onClick={() => setShow(d)}>
                    <li>
                      <h4> {d.name}</h4>
                      <p>{d.desc}</p>
                    </li>
                    <li className={style.uangMasuk}>
                      {d.uangMasuk ? d.uangMasuk.toLocaleString('id') : '-'}
                    </li>
                    <li className={style.uangKeluar}>
                      {d.uangKeluar ? d.uangKeluar.toLocaleString('id') : '-'}
                    </li>
                  </ul>
                ))}
              </React.Fragment>
            ))}
          </div>
        )}
      </section>
      <div id="boxShadow" onClick={handleCloseBack} />
      <div id="detailTransaksi" className={style.detailTransaksi}>
        <div className={style.header}>
          <h1>{show?.name}</h1>
          <button className={style.close} onClick={() => setShow(null)}>
            X
          </button>
        </div>
        <div className={style.detail}>
          <div className={style.label}>
            {show?.uangMasuk !== '-' ? 'Uange Masuk' : 'Uang Keluar'}
          </div>
          <div
            className={cx(
              style.value,
              show?.uangMasuk !== '-' ? style.uangMasuk : style.uangKeluar,
            )}
          >
            {'Rp '}
            {show?.uangMasuk !== '-' ? show?.uangMasuk : show?.uangKeluar}
          </div>
        </div>
        <div className={style.detail}>
          <div className={style.label}>Catatan</div>
          <div className={style.value}>{show?.desc ? show.desc : '-'}</div>
        </div>
        <div className={style.detail}>
          <div className={style.label}>Tanggal</div>
          <div className={style.value}>{show?.date}</div>
        </div>
      </div>
    </div>
  )
}

export default List
