export const getData = (name = 'hutangPiutang') => {
  let data = localStorage.getItem(name)
  data = data ? JSON.parse(data) : []

  return data
}

export const saveData = (name = 'hutangPiutang', data) => {
  localStorage.setItem(name, JSON.stringify(data))
}
export const sortData = (arr = [], name, name2) => {
  arr.sort(function (a, b) {
    if (a[name][name2] < b[name][name2]) {
      return -1
    }
    if (a[name][name2] > b[name][name2]) {
      return 1
    }
    return 0
  })
}

export const filter = (data = [], isHutang) => {
  try {
    return data.filter((item) => item.isHutang === isHutang && !item.isLunas)
  } catch (error) {
    alert('filter ', error)
  }
}

export const getDataLunas = (data = []) => {
  try {
    return data.filter((item) => item.isLunas)
  } catch (error) {
    alert('getDataLunas ', error)
  }
}

const addData = (data, element) => {
  return {
    id: data.length,
    userId: element.userId,
    start: element.tgl,
    value: element.isHutang ? 0 + element.value : 0 - element.value,
    isHutang: element.isHutang,
    user: getData('listPlanggan').find((item) => item.id === element.userId) ?? {
      id: 0,
      name: '-',
    },
    list: [
      {
        id: 0,
        isHutang: element.isHutang,
        value: element.value,
        desc: element.desc,
        tgl: element.tgl,
      },
    ],
  }
}

export const listData = () => {
  const data = []
  let utangSaya = 0
  let utangPelanggan = 0
  getData().forEach((element) => {
    const idx = data.findIndex((item) => item.userId === element.userId)
    if (idx >= 0 && data[idx].value !== 0) {
      const money = element.isHutang
        ? data[idx].value + element.value
        : data[idx].value - element.value

      if (data[idx].isHutang)
        utangPelanggan = element.isHutang
          ? utangPelanggan + element.value
          : utangPelanggan - element.value
      else utangSaya = !element.isHutang ? utangSaya + element.value : utangSaya - element.value

      data[idx].value = money
      data[idx].list.unshift({
        id: data[idx].list.length,
        isHutang: element.isHutang,
        value: element.value,
        desc: element.desc,
        tgl: element.tgl,
      })
    } else {
      if (element.isHutang) utangPelanggan += element.value
      else utangSaya += element.value

      data.unshift(addData(data, element))
    }
  })

  return { list: data, utangSaya, utangPelanggan }
}
