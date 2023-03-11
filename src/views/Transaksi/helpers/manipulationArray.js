import moment from 'moment'

const getUser = (id) => {
  if (id === 0) return 'Uang Pribadi'
  let listPlanggan = localStorage.getItem('listPlanggan')
  listPlanggan = JSON.parse(listPlanggan)
  try {
    const find = listPlanggan.find((item) => item.id === id)
    return find.name
  } catch (error) {
    alert(error)
    return '-'
  }
}

export const pushTranskasi = (data = []) => {
  const res = []

  data.sort(function (a, b) {
    if (new Date(b.tgl) < new Date(a.tgl)) {
      return -1
    }
    if (new Date(b.tgl) > new Date(a.tgl)) {
      return 1
    }
    return 0
  })

  data.forEach((element) => {
    const idx = res.findIndex((item) => item.date === moment(element.tgl).format('MMMM YYYY'))
    if (idx < 0) {
      res.push({
        date: moment(element.tgl).format('MMMM YYYY'),
        uangMasuk: element.uangMasuk ?? 0,
        uangKeluar: element.uangKeluar ?? 0,
        data: [
          {
            name: getUser(element.userId),
            desc: element.desc,
            uangMasuk: element.uangMasuk,
            uangKeluar: element.uangKeluar,
            date: element.tgl,
          },
        ],
      })
    } else {
      res[idx].uangMasuk += element.uangMasuk ?? 0
      res[idx].uangKeluar += element.uangKeluar ?? 0
      res[idx].data = [
        ...res[idx].data,
        {
          name: getUser(element.userId),
          desc: element.desc,
          uangMasuk: element.uangMasuk,
          uangKeluar: element.uangKeluar,
          date: element.tgl,
        },
      ]
    }
  })
  return res
}

export const getUserId = (value) => {
  let listPlanggan = localStorage.getItem('listPlanggan')
  listPlanggan = JSON.parse(listPlanggan)
  listPlanggan = listPlanggan ? listPlanggan : []

  try {
    const filter = listPlanggan.filter((item) =>
      item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
    )

    const def = 'Uang Pribadi'
    if (def.toLocaleLowerCase().includes(value.toLocaleLowerCase())) {
      filter.push({
        id: 0,
        name: def,
      })
    }

    return filter
  } catch (error) {
    alert(error)
  }
}
export const findUser = (data = [], value = []) => {
  const id = value.map((item) => item.id)
  try {
    const filter = data.filter((item) => id.includes(item.userId))

    return filter
  } catch (error) {
    alert(error)
  }
}
