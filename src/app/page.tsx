import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Programs } from "@/components/home/Programs";
import { Presence } from "@/components/home/Presence";
import { Impact } from "@/components/home/Impact";
import { Stories } from "@/components/home/Stories";
import { Values } from "@/components/home/Values";
import { Involved } from "@/components/home/Involved";
import { Contact } from "@/components/home/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Programs />
      <Presence />
      <Impact />
      <Stories />
      <Values />
      <Involved />
      <Contact />
    </>
  );
}
