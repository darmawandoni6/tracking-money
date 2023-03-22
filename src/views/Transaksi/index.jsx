import React from 'react'
import style from './styles/main.module.scss'
import Jubutron from '@components/Jubutron'
import ButtonAdd from '@components/ButtonAdd'
import { useLocation, useNavigate } from 'react-router-dom'
import path from '@constants/path'
import Filter from './components/Filter'
import List from './components/List'
import localName from '@constants/localName'
import { listData } from './helpers/array'

const Transaksi = () => {
  const [list, setList] = React.useState([])
  const [nominal, setNominal] = React.useState({
    uangMasuk: 0,
    uangKeluar: 0,
  })
  const { pathname } = useLocation()
  const navigate = useNavigate()

  React.useEffect(() => {
    const { list, uangMasuk, uangKeluar } = listData()
    setNominal({
      uangMasuk,
      uangKeluar,
    })
    setList(Object.entries(list))
  }, [])

  const handleBtnTrasaksi = () => {
    localStorage.removeItem(localName.choicePelanggan)
    navigate(pathname + path.addTransaksi)
  }

  const handleChange = (e) => {
    const { value } = e.target
    const { list } = listData()

    const entri = Object.entries(list)
    const filter = entri.filter((item) => item[0].toLowerCase().includes(value.toLowerCase()))
    if (!filter[0]) {
      entri.forEach((item) => {
        let find = item[1].filter((item) =>
          item.user.name.toLowerCase().includes(value.toLowerCase()),
        )
        if (find[0]) filter.push([item[0], find])
      })
    }
    setList(filter)
  }
  return (
    <div className={style.container}>
      <Jubutron
        report="Lihat Laporan Transaksi"
        data={[
          {
            label: 'Uang Masuk',
            value: nominal.uangMasuk,
          },
          {
            label: 'Uang Keluar',
            value: nominal.uangKeluar,
          },
        ]}
        route="/report-transaksi"
      />
      <ButtonAdd text="TRANSAKSI" handleClick={handleBtnTrasaksi} />
      <Filter handleChange={handleChange} />
      <List data={list} />
    </div>
  )
}

export default Transaksi
