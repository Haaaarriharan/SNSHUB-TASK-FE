import { Footer } from "react-day-picker";
import Header from "../header/header";

const SectionWrapper = (Component: any) =>
  function HOC() {
    return (
      <>
        <Header />
        {/* <Component /> */}
        <Footer />
      </>
    );
  };

export default SectionWrapper;
