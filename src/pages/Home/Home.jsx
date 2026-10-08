import React from "react";

import Navbar from "../../components/Navbar/Navbar";
import Metadata from "../../components/Layout/Metadata";
import ClickSpark from "../../components/Animations/ClickSpark";
import Hero from "../../components/Hero/Hero";
import AboutMe from "../../components/AboutMe/AboutMe";
import Projects from "../../components/Projects/Projects";


const Home = () => {
    return (
        <>
            <Metadata title="Home" />
            <Navbar />
            {/* <ClickSpark
        sparkColor="#84cc16"
        sparkSize={12}
        sparkRadius={20}
        sparkCount={10}
        duration={500}
      >
       
      </ClickSpark> */}
        <Hero />
        <AboutMe />
        <Projects />

        </>
    );
};

export default Home;



// import Hero from "../../components/Hero/Hero";
// import AboutMe from "../../components/AboutMe/AboutMe";

// const Home = () => {
//   return (
//     <>
//       <Hero />
//       <AboutMe />  {/* 👈 THIS MUST EXIST */}
//     </>
//   );
// };

// export default Home;