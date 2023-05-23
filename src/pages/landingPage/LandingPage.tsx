
import Companies from "../../components/landingPage/Companies";
import Details from "../../components/landingPage/Details";
import Footer from "../../components/landingPage/Footer";
import GetStarted from "../../components/landingPage/GetStarted";
import Guide from "../../components/landingPage/Guide";
import Hero from "../../components/landingPage/Hero";
import Properties from "../../components/landingPage/Properties";


function LandingPage() {
  return (
    <>
      <Hero />
      <Companies />
      <Guide />
      <Properties />
      <Details />
      <GetStarted />
      <Footer /> 
    </>
  );
}

export default LandingPage;