export const errNominal = (nom = 0) => {
  if (nom <= 0) {
    alert('Input Nominal tidak bole kosong')
    return true
  }
}

export const errSetId = (data, val) => {
  try {
    let id = data[data.length - 1].id
    id += 1
    val.id = id
  } catch (error) {
    alert(error)
    return error
  }
}
