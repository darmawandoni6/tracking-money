import localName from '@constants/localName'
import { getData } from '@helpers/localStorage'

export const saveData = (data = []) => {
  try {
    const hutangPiutang = getData(localName.hutangPiutang) ?? []

    const id = hutangPiutang.length
    hutangPiutang.push({ id, ...data })

    localStorage.setItem(localName.hutangPiutang, JSON.stringify(hutangPiutang))
  } catch (error) {
    alert('saveData => ' + error)
    return error
  }
}
