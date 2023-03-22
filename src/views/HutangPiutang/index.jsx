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

const HutangPiutang = () => {
  const [data, setData] = React.useState([])
  const [money, setMoney] = React.useState({
    utangSaya: 0,
    utangPelanggan: 0,
  })

  const navigate = useNavigate()
  const { pathname } = useLocation()

  React.useEffect(() => {
    let { list, utangSaya, utangPelanggan } = listData()
    setMoney({
      utangSaya,
      utangPelanggan,
    })
    setData(list)
  }, [])

  const handleBtnForm = () => {
    localStorage.removeItem(localName.choicePelanggan)
    navigate(pathname + path.addHutangPiutang)
  }

  const handleSearch = (value) => {
    let { list } = listData()
    const filter = list.filter((item) =>
      item.user.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
    )
    setData(filter)
  }

  return (
    <div className={style.container}>
      <Jubutron
        report="Lihat Laporan Hutang Piutang"
        data={[
          {
            label: 'Utang Saya',
            value: money.utangSaya,
          },
          {
            label: 'Utang Pelanggan',
            value: money.utangPelanggan,
          },
        ]}
      />
      <ButtonAdd text="UTANG PIUTANG" handleClick={handleBtnForm} />
      <Filter onChange={handleSearch} />
      <List data={data} />
    </div>
  )
}

export default HutangPiutang
