import React from 'react'
import style from './styles/main.module.scss'
import { useNavigate } from 'react-router-dom'
import cx from 'classnames'
import { getCurrencyString, getValue } from '@helpers/curency'
import { useDispatch, useSelector } from 'react-redux'
import stateAction from '@store/dispatchState/state.action'
import moment from 'moment'
import { errNominal, errSetId } from '../Transaksi/helpers/handleError'

const AddTransaksi = () => {
  const [isPengeluaran, setPengeluaran] = React.useState(true)
  const [payload, setPayload] = React.useState({
    nominal: 0,
    desc: '',
    tgl: moment().format('YYYY-MM-DDTHH:mm'),
    date: moment().format('YYYY-MM-DD HH:mm'),
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { pelanggan } = useSelector((state) => state.dispatchState)

  const handleChoice = React.useCallback(() => {
    dispatch(stateAction.reset())
    navigate('/pelanggan')
  }, [])

  const handleChange = React.useCallback((e) => {
    const { name, value } = e.target
    let obj = { [name]: value }
    if (name === 'tgl') {
      obj = {
        [name]: moment(value).format('YYYY-MM-DDTHH:mm'),
        date: moment(value).format('YYYY-MM-DD HH:mm'),
      }
    }
    setPayload((prev) => ({ ...prev, ...obj }))
  }, [])

  const saveLocalStorage = React.useCallback((data = []) => {
    let transaksi = localStorage.getItem('transaksi')
    transaksi = JSON.parse(transaksi)
    if (transaksi) {
      let errId = errSetId(transaksi, data)
      if (errId) return

      localStorage.setItem('transaksi', JSON.stringify([...transaksi, data]))
    } else {
      localStorage.setItem('transaksi', JSON.stringify([{ id: 1, ...data }]))
    }

    navigate(-1)
  }, [])

  const handleSubmit = React.useCallback(() => {
    const errNom = errNominal(payload.nominal)
    if (errNom) return

    let req = {
      tgl: payload.date,
      userId: pelanggan.id ?? 0,
      desc: payload.desc,
    }
    if (isPengeluaran) {
      req.uangKeluar = payload.nominal
    } else {
      req.uangMasuk = payload.nominal
    }
    saveLocalStorage(req)
  }, [pelanggan, isPengeluaran, payload])

  return (
    <div className={style.container}>
      <header>
        <button onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h1>Tambah Utang Piutang</h1>
      </header>
      <section>
        <div className={style.select}>
          <label htmlFor="type1">
            <input
              id="type1"
              name="type"
              type="radio"
              checked={isPengeluaran}
              onChange={() => setPengeluaran((prev) => !prev)}
            />
            <div className={style.custom}>Pengeluaran</div>
          </label>
          <label htmlFor="type2">
            <input
              id="type2"
              name="type"
              type="radio"
              checked={!isPengeluaran}
              onChange={() => setPengeluaran((prev) => !prev)}
            />
            <div className={style.custom}>Pemasukan</div>
          </label>
        </div>
        <div className={cx(style.formGrub, isPengeluaran ? style.piutang : style.take)}>
          <label>Masukkan Nominal</label>
          <input
            type="text"
            value={getCurrencyString(payload.nominal)}
            onChange={(e) => setPayload((prev) => ({ ...prev, nominal: getValue(e.target.value) }))}
          />
        </div>
        <button className={style.choice} onClick={handleChoice}>
          {pelanggan.name ? (
            pelanggan.name
          ) : (
            <>
              <i className="fa-solid fa-user-plus"></i>Pilih Kontak Pelanggan
            </>
          )}
        </button>
        <div className={style.form}>
          <div className={style.formGrub}>
            <label>Catatan (jika ada)</label>
            <input
              name="desc"
              type="text"
              placeholder="Masukkan catatan "
              value={payload.desc}
              onChange={handleChange}
            />
          </div>
          <div className={style.formGrub}>
            <input
              name="tgl"
              type="datetime-local"
              placeholder="Masukkan catatan "
              onChange={handleChange}
              value={payload.tgl}
            />
          </div>
        </div>
        <button className={style.save} onClick={handleSubmit}>
          SIMPAN
        </button>
      </section>
    </div>
  )
}

export default AddTransaksi
