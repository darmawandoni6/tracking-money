import React from 'react'
import style from './styles/main.module.scss'
import { getCurrencyString, getValue } from '@helpers/curency'
import cx from 'classnames'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import stateAction from '@store/dispatchState/state.action'
import moment from 'moment'
import { generateId, handleCekUser, saveLocalStorage } from './helpers/manipulateArray'
import { isLunas } from './helpers/handleFunction'

const HutangPiutang = () => {
  const [isHutang, setIsHutang] = React.useState(true)
  const [nominal, setNominal] = React.useState(0)
  const [dPelanggan, setDPelanggan] = React.useState()
  const [note, setNote] = React.useState({
    desc: '',
    tgl: moment().format('YYYY-MM-DDTHH:mm'),
    date: moment().format('YYYY-MM-DD HH:mm'),
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { pelanggan } = useSelector((state) => state.dispatchState)

  React.useEffect(() => {
    if (pelanggan.id) {
      const cekUser = handleCekUser(pelanggan.id)
      if (cekUser) {
        setDPelanggan({ ...cekUser, value: Math.abs(cekUser.value) })
      }
    }
  }, [pelanggan])

  const handleChoice = React.useCallback(() => {
    dispatch(stateAction.reset())
    navigate('/pelanggan')
    return () => {
      dispatch(stateAction.reset())
    }
  }, [])

  const handleType = React.useCallback(() => {
    setIsHutang((prev) => {
      if (dPelanggan) {
        const { value: max } = dPelanggan
        if (nominal > max) {
          setNominal(max)
        }
      }
      return !prev
    })
  }, [dPelanggan, nominal])
  const handleInput = React.useCallback(
    (e) => {
      let { value } = e.target

      if (dPelanggan) {
        const { value: max } = dPelanggan
        if (getValue(value) <= max) {
          setNominal(getValue(value))
        } else {
          if (isHutang !== dPelanggan.isHutang) {
            setNominal(max)
          } else setNominal(getValue(value))
        }
      } else {
        setNominal(getValue(value))
      }
    },
    [dPelanggan, isHutang],
  )

  const handleSubmit = () => {
    let payload = {
      id: generateId(),
      isHutang,
      desc: note.desc,
      tgl: note.date,
      value: nominal,
      isLunas: false,
      userId: pelanggan.id,
    }
    if (dPelanggan) {
      payload = {
        ...payload,
        isLunas: isLunas({
          isHutang,
          nominal,
          dPelanggan,
        }),
      }
    }
    const err = saveLocalStorage(payload)
    if (!err) {
      navigate(-1)
    }
  }

  return (
    <div className={style.container}>
      <header>
        <button onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h1>Tambah Utang Piutang</h1>
      </header>
      <section>
        <button className={style.choice} onClick={handleChoice}>
          {pelanggan.name ? (
            pelanggan.name
          ) : (
            <>
              <i className="fa-solid fa-user-plus"></i>Pilih Kontak Pelanggan
            </>
          )}
        </button>
        {dPelanggan && (
          <div className={style.detailPelanggan}>
            <div className={style.label}>
              {dPelanggan.isHutang ? 'Utang pelanggan' : 'Utang saya'}
            </div>
            <div className={cx(style.value, dPelanggan.isHutang ? style.hutang : style.piutang)}>
              {getCurrencyString(Math.abs(dPelanggan.value))}
            </div>
          </div>
        )}
        <div className={style.select}>
          <label htmlFor="type1">
            <input id="type1" name="type" type="radio" checked={isHutang} onChange={handleType} />
            <div className={style.custom}>Berikan Uang</div>
          </label>
          <label htmlFor="type2">
            <input id="type2" name="type" type="radio" checked={!isHutang} onChange={handleType} />
            <div className={style.custom}>Terima Uang</div>
          </label>
        </div>
        <div className={cx(style.formGrub, isHutang ? style.piutang : style.take)}>
          <label>Masukkan Nominal</label>
          <input type="text" value={getCurrencyString(nominal)} onChange={handleInput} />
        </div>

        <div className={style.form}>
          <div className={style.formGrub}>
            <label>Catatan (jika ada)</label>
            <input
              type="text"
              placeholder="Masukkan catatan "
              onChange={(e) =>
                setNote((prev) => ({
                  ...prev,
                  desc: e.target.value,
                }))
              }
            />
          </div>
          <div className={style.formGrub}>
            <input
              type="datetime-local"
              placeholder="Masukkan catatan "
              value={note.tgl}
              onChange={(e) =>
                setNote((prev) => ({
                  ...prev,
                  tgl: moment(e.target.value).format('YYYY-MM-DDTHH:mm'),
                  date: moment(e.target.value).format('YYYY-MM-DD HH:mm'),
                }))
              }
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

export default HutangPiutang
