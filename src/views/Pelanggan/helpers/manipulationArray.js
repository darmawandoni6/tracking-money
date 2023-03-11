export const getData = () => {
  try {
    let listPlanggan = localStorage.getItem('listPlanggan')
    listPlanggan = JSON.parse(listPlanggan)
    listPlanggan = listPlanggan ? listPlanggan : []
    return listPlanggan
  } catch (error) {
    alert('getData ' + error)
  }
}

export const pushListPelanggan = (listPlanggan) => {
  const res = []
  listPlanggan.forEach((element) => {
    const idx = res.findIndex((item) => item.title === element.name[0])
    if (idx < 0) {
      res.push({
        title: element.name[0],
        list: [element],
      })
    } else {
      res[idx].list.push(element)
    }
  })

  return res
}

export const sortAsc = (arr = [], name) => {
  return arr.sort(function (a, b) {
    if (a[name] < b[name]) {
      return -1
    }
    if (a[name] > b[name]) {
      return 1
    }
    return 0
  })
}
