import Sobrenos from "../../components/landingPage/Sobrenos";
import Footer from "../../components/landingPage/Footer";
import GetStarted from "../../components/landingPage/GetStarted";
import Guia from "../../components/landingPage/Guia";
import Home from "../../components/landingPage/Home";

function LandingPage() {
  return (
    <>
      <Home />
      <Guia />
      <Sobrenos />
      <GetStarted />
      <Footer />
    </>
  );
}

export default LandingPage;
