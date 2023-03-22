import localName from '@constants/localName'
import { getData } from '@helpers/localStorage'
import moment from 'moment'

export const listData = () => {
  try {
    const data = {}
    const transaksi = getData(localName.transaksi) ?? []
    let uangMasuk = 0
    let uangKeluar = 0

    transaksi.forEach((item) => {
      const title = moment(item.tgl).format('DD MMM YYYY')
      if (item.isPengeluaran) {
        uangKeluar += item.nominal
      } else {
        uangMasuk += item.nominal
      }
      if (data[title]) {
        data[title].push(item)
      } else {
        data[title] = [item]
      }
    })
    return { list: data, uangMasuk, uangKeluar }
  } catch (error) {
    alert('listData => ' + error)
    return error
  }
}
