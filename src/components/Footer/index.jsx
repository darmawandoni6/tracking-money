import React from 'react'
import style from './styles/main.module.scss'
import cx from 'classnames'
import { useLocation, useNavigate } from 'react-router-dom'

const footer = ['/hutang', '/transaksi', '/list-pelanggan']

const Footer = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const active = React.useCallback(
    (path) => {
      return pathname.includes(path)
    },
    [pathname],
  )

  const handleRoute = React.useCallback((active, path) => {
    if (!active) {
      navigate(path)
    }
  }, [])

  if (!footer.includes(pathname)) return <div />
  return (
    <div className={style.container}>
      <div className={style.footer}>
        <div
          className={cx(style.menu, active('/hutang') && style.active)}
          onClick={() => handleRoute(active('/hutang'), '/hutang')}
        >
          <div className={style.wrapper}>
            <button>
              <i className="fa-solid fa-money-bills"></i>
            </button>
            <span>Utang</span>
          </div>
        </div>
        <div
          className={cx(style.menu, active('/transaksi') && style.active)}
          onClick={() => handleRoute(active('/transaksi'), '/transaksi')}
        >
          <div className={style.wrapper}>
            <button>
              <i className="fa-solid fa-money-bill-transfer"></i>
            </button>
            <span>Transaksi</span>
          </div>
        </div>
        <div
          className={cx(style.menu, active('/list-pelanggan') && style.active)}
          onClick={() => handleRoute(active('/list-pelanggan'), '/list-pelanggan')}
        >
          <div className={style.wrapper}>
            <button>
              <i className="fa-solid fa-user"></i>
            </button>
            <span>Pelanggan</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Footer)
