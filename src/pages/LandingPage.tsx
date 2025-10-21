import './LandingPageFont.css'
import Navbar from "./Landing/Navbar"
import Header from './Landing/Header'
import Features from './Landing/Features'
import Product from './Landing/Product'
import Team from './Landing/Team'
import Faq from './Landing/Faq'
import ScrollUpButton from './Landing/ScrollUpButton'
import Footer from './Landing/Footer'

const LandingPage = () => {
  return (
    <div className="nunito">
      <Navbar />
      <Header />
      <Features />
      <Product />
      <Team />
      <Faq />
      <Footer />
      <ScrollUpButton />
    </div>
  )
}

export default LandingPage
