import React from 'react'

import style from './styles/main.module.scss'
import Filter from './components/Filter'
import List from './components/List'
import ButtonAdd from '@components/ButtonAdd'
import { useLocation, useNavigate } from 'react-router-dom'
import Jubutron from '@components/Jubutron'
import { useDispatch } from 'react-redux'
import stateAction from '@store/dispatchState/state.action'
import { listData } from './helpers/manipualteArray'

const Hutang = () => {
  const [data, setData] = React.useState([])
  const [money, setMoney] = React.useState({
    utangSaya: 0,
    utangPelanggan: 0,
  })
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const dispatch = useDispatch()

  React.useEffect(() => {
    const { list, utangSaya, utangPelanggan } = listData()
    setData(list)
    setMoney({
      utangSaya,
      utangPelanggan,
    })
  }, [])
  const handleBtnForm = React.useCallback(() => {
    dispatch(stateAction.reset())
    navigate(pathname + '/add-hutang-piutang')
  }, [])

  const handleSearch = (value) => {
    const { list } = listData()

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
        route="/report-hutang"
      />
      <ButtonAdd text="UTANG PIUTANG" handleClick={handleBtnForm} />
      <Filter onChange={handleSearch} />
      <List data={data} />
    </div>
  )
}

export default Hutang
