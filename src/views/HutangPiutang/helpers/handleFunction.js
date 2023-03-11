export const isLunas = ({ isHutang, nominal, dPelanggan }) => {
  if (isHutang && dPelanggan.isHutang) {
    return false
  }
  if (!isHutang && !dPelanggan.isHutang) {
    return false
  }

  if (nominal >= dPelanggan.value) {
    return true
  }
  return false
}
