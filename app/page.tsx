import { I18nProvider } from "@/lib/i18n";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Statement } from "@/components/Statement";
import { TechStack } from "@/components/TechStack";
import { Projects } from "@/components/Projects";
import { Contributions } from "@/components/Contributions";
import { HireMe } from "@/components/HireMe";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <I18nProvider>
      <Nav />
      <span id="top" />
      <main>
        <Hero />
        <Statement />
        <TechStack />
        <Projects />
        <Contributions />
        <HireMe />
      </main>
      <Footer />
    </I18nProvider>
  );
}
