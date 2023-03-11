import { listData, getData } from '@views/Hutang/helpers/manipualteArray'

export const handleCekUser = (userId) => {
  try {
    const { list } = listData()
    const find = list.find((item) => item.userId === userId && item.value !== 0)
    return find
  } catch (error) {
    alert('handleCekUser ' + error)
  }
}

export const generateId = () => {
  try {
    const data = getData()
    return data[data.length - 1].id + 1
  } catch (error) {
    alert('generateId ' + error)
  }
}

export const saveLocalStorage = (payload) => {
  try {
    if (payload.value <= 0) throw 'Nominal Tidak boleh kosong'
    const data = getData()
    data.push(payload)
    localStorage.setItem('hutangPiutang', JSON.stringify(data))
  } catch (error) {
    alert('saveLocalStorage ' + error)
    return error
  }
}
