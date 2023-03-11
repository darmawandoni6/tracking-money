import Footer from '@components/Footer'
import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

const Hutang = React.lazy(() => import('./views/Hutang'))
const HutangPiutang = React.lazy(() => import('./views/HutangPiutang'))
const Pelanggan = React.lazy(() => import('./views/Pelanggan'))
const Transaksi = React.lazy(() => import('./views/Transaksi'))
const AddTransaksi = React.lazy(() => import('./views/AddTransaksi'))

const App = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<div />}>
        <Routes>
          <Route path="/" element={<Navigate to="/hutang" />} />
          <Route
            path="/hutang/*"
            element={
              <Routes>
                <Route path="/" element={<Hutang />} />
                <Route path="/add-hutang-piutang" element={<HutangPiutang />} />
              </Routes>
            }
          />
          <Route
            path="/transaksi/*"
            element={
              <Routes>
                <Route path="/" element={<Transaksi />} />
                <Route path="/add-transaksi" element={<AddTransaksi />} />
              </Routes>
            }
          />
          <Route path="/pelanggan" element={<Pelanggan />} />
          <Route path="/list-pelanggan" element={<Pelanggan main={true} />} />
        </Routes>
      </React.Suspense>
      <Footer />
    </BrowserRouter>
  )
}

export default App
