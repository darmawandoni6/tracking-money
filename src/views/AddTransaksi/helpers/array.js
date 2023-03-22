import localName from '@constants/localName'
import { getData } from '@helpers/localStorage'

export const saveData = (data = []) => {
  try {
    const transaksi = getData(localName.transaksi) ?? []

    const id = transaksi.length
    transaksi.unshift({ id, ...data })

    localStorage.setItem(localName.transaksi, JSON.stringify(transaksi))
  } catch (error) {
    alert('saveData => ' + error)
    return error
  }
}
