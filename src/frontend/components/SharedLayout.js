import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

const SharedLayout = ({web3Handler, account}) => {
  return (
    <div>
        <Navbar  web3Handler={web3Handler} account={account} />
        <Outlet />
        <Footer />
    </div>
  )
}
export default SharedLayout