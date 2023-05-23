import Details from "../../components/landingPage/Details";
import Footer from "../../components/landingPage/Footer";
import GetStarted from "../../components/landingPage/GetStarted";
import Guide from "../../components/landingPage/Guide";
import Hero from "../../components/landingPage/Hero";

function LandingPage() {
  return (
    <>
      <Hero />
      <Guide />
      <Details />
      <GetStarted />
      <Footer />
    </>
  );
}

export default LandingPage;
