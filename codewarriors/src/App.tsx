import Home from "./components/layout/Home";
import Header from "./components/layout/Header";
import About from "./components/layout/About";
import Projects from "./components/layout/Projects";
import CommunityEvents from "./components/layout/Events";
import Organizers from "./components/layout/Organizers";
import CommunityFooter from "./components/layout/Footer";
import Join from "./components/layout/Join";
import Wiki from "./components/layout/Wiki";

export default function App() {
  return (
    <>
      <Header></Header>
      <main className="flex flex-col gap-48 px-40 py-32 max-lg:px-11 max-md:px-4">
        <Home />
        <About />
        <Projects />
        <CommunityEvents />
        <Join />
        <Wiki />
        <Organizers />
      </main>
      <CommunityFooter />
    </>
  );
}
