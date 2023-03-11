export const alertPhone = (list = [], { name, value }) => {
  const find = list.find((item) => item[name] === value)
  if (find) {
    alert('No Hp sudah terdaftar')
    return true
  }
  return false
}

export const errSetId = (listPlanggan, val) => {
  try {
    let id = listPlanggan[listPlanggan.length - 1].id
    id += 1
    val.id = id
  } catch (error) {
    alert(error)
    return error
  }
}
