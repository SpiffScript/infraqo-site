import React from "react";
import AboutIntro from "./about/AboutIntro";
import AboutOurApproach from "./about/AboutOurApproach";
import AboutHowWeWork from "./about/AboutHowWeWork";


const About: React.FC = () => {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      {/* ABOUT JUSTIN & INFRAQO */}
      <AboutIntro />

      {/* GRADIENT DIVIDER LINE */}
      <div className="mt-6 mb-7 w-full h-[8px] bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900" />

      {/* WHY WE EXIST */}
      <AboutOurApproach />

      {/* HOW WE WORK / WHO WE'RE A FIT FOR */}
      <AboutHowWeWork />
    </main>
  );
};

export default About;