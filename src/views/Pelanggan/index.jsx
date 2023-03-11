import React from 'react'
import style from './styles/main.module.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import stateAction from '@store/dispatchState/state.action'
import { getData, pushListPelanggan, sortAsc } from './helpers/manipulationArray'
import { alertPhone, errSetId } from './helpers/handleError'
import { initialName } from '@helpers/manipulateString'
import cx from 'classnames'

const Pelanggan = ({ main }) => {
  const [show, setShow] = React.useState(false)
  const [customers, setCustomer] = React.useState([])
  const [payload, setPayload] = React.useState({
    name: '',
    phone: '',
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { pelanggan } = useSelector((state) => state.dispatchState)

  React.useEffect(() => {
    let listPlanggan = localStorage.getItem('listPlanggan')
    listPlanggan = JSON.parse(listPlanggan)

    let res = pushListPelanggan(listPlanggan ? listPlanggan : [])

    res = sortAsc(res, 'title')
    res.map((item) => sortAsc(item.list, 'name'))

    setCustomer(res)
  }, [])

  React.useEffect(() => {
    if (pelanggan.name) {
      navigate(-1)
    }
  }, [pelanggan])

  React.useEffect(() => {
    if (show) {
      const boxShadow = document.getElementById('boxShadow')
      boxShadow.classList.add(style.boxShadow)

      const formPelanggan = document.getElementById('formPelanggan')
      formPelanggan.style.display = 'block'

      return () => {
        boxShadow.classList.remove(style.boxShadow)
        formPelanggan.style.display = 'none'
      }
    }
  }, [show])

  const handleCloseBack = React.useCallback((e) => {
    if (e.target.id === 'boxShadow') {
      setShow(false)
    }
  }, [])

  const handleChange = React.useCallback((e) => {
    const { name, value } = e.target

    if (name === 'name') {
      return setPayload((prev) => ({ ...prev, [name]: value.toUpperCase() }))
    }
    setPayload((prev) => ({ ...prev, [name]: value.replace(/[^0-9]/g, '').trim() }))
  }, [])

  const saveLocalStorage = React.useCallback((listPlanggan = [], val) => {
    if (listPlanggan) {
      listPlanggan.push(val)
      localStorage.setItem('listPlanggan', JSON.stringify(listPlanggan))
      setShow(false)
    } else {
      localStorage.setItem('listPlanggan', JSON.stringify([val]))
      setShow(false)
    }
  }, [])

  const handleSubmit = React.useCallback(() => {
    const val = {
      ...payload,
      name: payload.name.trim(),
    }
    if (!val.name || !val.phone) {
      alert('Form wajib diisi')
      return
    }

    let listPlanggan = getData()

    const resphone = alertPhone(listPlanggan, { name: 'phone', value: val.phone })
    if (resphone) {
      return
    }

    const errId = errSetId(listPlanggan)
    if (errId) {
      return
    }

    saveLocalStorage(listPlanggan, val)
    let res = pushListPelanggan(listPlanggan)
    res = sortAsc(res, 'title')
    res.map((item) => sortAsc(item.list, 'name'))

    setCustomer(res)
  }, [payload, customers])

  const handleSearch = (e) => {
    const { value } = e.target
    const filter = getData().filter((item) =>
      item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
    )

    let res = pushListPelanggan(filter)

    res = sortAsc(res, 'title')
    res.map((item) => sortAsc(item.list, 'name'))

    setCustomer(res)
  }
  return (
    <div className={style.container}>
      <header>
        {main ? (
          <button />
        ) : (
          <button onClick={() => navigate(-1)}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        )}
        <input type="search" placeholder="Cari nama pelanggan" onChange={handleSearch} />
      </header>
      <section className={style.addNew} onClick={() => setShow(true)}>
        <div className={style.box}>
          <i className="fa-solid fa-user-pen"></i>
        </div>
        <span>Tambah Pelanggan Baru</span>
        <i className="fa-solid fa-chevron-right"></i>
      </section>
      <section className={cx(style.list, main && style.main)}>
        {customers.map((item, i) => (
          <ul key={i}>
            <li>
              <h1>{item.title}</h1>
              {item.list.map((l, li) => (
                <ul key={li}>
                  <li
                    className={style.wrapper}
                    onClick={() => !main && dispatch(stateAction.setPelanggan(l))}
                  >
                    <div className={style.box}>{initialName(l.name)}</div>
                    <div className={style.desc}>
                      <h3>{l.name}</h3>
                      <p>{l.phone}</p>
                    </div>
                  </li>
                </ul>
              ))}
            </li>
          </ul>
        ))}
      </section>
      <div id="boxShadow" onClick={handleCloseBack} />
      <div id="formPelanggan" className={style.form}>
        <div className={style.header}>
          <h1>Tambah Pelanggan Baru</h1>
          <button className={style.close} onClick={() => setShow(false)}>
            X
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <div className={style.formGrub}>
            <label>Nama Pelanggan</label>
            <input
              type="text"
              name="name"
              value={payload.name}
              onChange={handleChange}
              placeholder="Masukkan nama kontak pelanggan"
            />
          </div>
          <div className={style.formGrub}>
            <label>Nomor Telepon (opsional)</label>
            <input
              type="text"
              name="phone"
              value={payload.phone}
              onChange={handleChange}
              placeholder="Masukkan no. telp"
            />
          </div>
          <button type="submit">SIMPAN</button>
        </form>
      </div>
    </div>
  )
}

export default Pelanggan
