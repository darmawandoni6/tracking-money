import React from 'react'
import style from './styles/main.module.scss'
import Jubutron from '@components/Jubutron'
import Filter from './components/Filter'
import List from './components/List'
import ButtonAdd from '@components/ButtonAdd'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import stateAction from '@store/dispatchState/state.action'
import { findUser, getUserId, pushTranskasi } from './helpers/manipulationArray'

const Transaksi = () => {
  const [dataFilter, setDataFilter] = React.useState([])
  const [dataTransaksi, setDataTransaksi] = React.useState({
    uangKeluar: 0,
    uangMasuk: 0,
  })
  const [list, setList] = React.useState([])

  const { pathname } = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  React.useEffect(() => {
    let transaksi = localStorage.getItem('transaksi')
    transaksi = JSON.parse(transaksi)
    transaksi = transaksi ? transaksi : []

    transaksi.forEach((element) => {
      if (element.uangKeluar) {
        dataTransaksi.uangKeluar += element.uangKeluar
      } else if (element.uangMasuk) {
        dataTransaksi.uangMasuk += element.uangMasuk
      }
    })

    setDataTransaksi({ ...dataTransaksi })
    setList(pushTranskasi(transaksi))
  }, [])

  const handleBtnTrasaksi = React.useCallback(() => {
    dispatch(stateAction.reset())
    navigate(pathname + '/add-transaksi')
  }, [])

  const handleChangeFilter = React.useCallback((e) => {
    const { value } = e.target
    let transaksi = localStorage.getItem('transaksi')
    transaksi = JSON.parse(transaksi)
    transaksi = transaksi ? transaksi : []

    let data = getUserId(value)
    if (!data) return

    data = findUser(transaksi, data)
    if (!data) return

    setList(pushTranskasi(data))
  }, [])

  return (
    <div className={style.container}>
      <Jubutron
        report="Lihat Laporan Transaksi"
        data={[
          {
            label: 'Uang Masuk',
            value: dataTransaksi.uangMasuk,
          },
          {
            label: 'Uang Keluar',
            value: dataTransaksi.uangKeluar,
          },
        ]}
        route="/report-transaksi"
      />
      <ButtonAdd text="TRANSAKSI" handleClick={handleBtnTrasaksi} />
      <Filter filter={(val) => setDataFilter(val)} handleChange={handleChangeFilter} />
      <List data={list} filter={dataFilter} />
    </div>
  )
}

export default Transaksi
