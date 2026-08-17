import { loadContent } from "@/lib/content";
import { Header } from "@/components/sections/header";
import { HeroSection } from "@/components/sections/hero";
import { ServicesGrid } from "@/components/sections/services-grid";
import { AboutSection } from "@/components/sections/about";
import { ClinicalEngineeringSection } from "@/components/sections/clinical-engineering";
import { LifeSupportSection } from "@/components/sections/life-support";
import { DiagnosticImagingSection } from "@/components/sections/diagnostic-imaging";
import { InfrastructureSection } from "@/components/sections/infrastructure";
import { ElectricalPanelsSection } from "@/components/sections/electrical-panels";
import { MaintenanceServicesSection } from "@/components/sections/maintenance-services";
import { CasesSection } from "@/components/sections/cases";
import { DifferentialsSection } from "@/components/sections/differentials";
import { CtaBanner } from "@/components/sections/cta-banner";
import { ContactSection } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { WhatsAppButton } from "@/components/sections/whatsapp-button";
import Script from "next/script";

export default async function Home() {
  const content = await loadContent();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: content.company.name,
    description: "Soluções em engenharia clínica, diagnóstico por imagem e infraestrutura hospitalar.",
    url: "https://www.amservico.com.br",
    telephone: content.company.whatsapp,
    email: content.company.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: content.company.address.city,
      addressRegion: content.company.address.state,
      postalCode: content.company.address.cep,
      addressCountry: "BR",
    },
    sameAs: [content.company.social.instagram, content.company.social.linkedin, content.company.social.facebook].filter(
      Boolean
    ),
  };

  return (
    <>
      <Script id="schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header nav={content.nav} whatsapp={content.company.whatsapp} whatsappLink={content.company.whatsappLink} />
      <main>
        <HeroSection {...content.hero} />
        <ServicesGrid {...content.services} />
        <AboutSection {...content.about} />
        <ClinicalEngineeringSection {...content.clinicalEngineering} />
        <LifeSupportSection {...content.lifeSupport} />
        <DiagnosticImagingSection {...content.diagnosticImaging} />
        <InfrastructureSection {...content.infrastructure} />
        <ElectricalPanelsSection {...content.electricalPanels} />
        <MaintenanceServicesSection {...content.maintenanceServices} />
        <CasesSection {...content.cases} />
        <DifferentialsSection {...content.differentials} />
        <CtaBanner {...content.ctaBanner} />
        <ContactSection {...content.contact} />
      </main>
      <Footer
        companyName={content.company.name}
        tagline={content.footer.tagline}
        columns={content.footer.columns}
        bottom={content.footer.bottom}
        whatsappLink={content.company.whatsappLink}
        email={content.company.email}
        address={content.company.address.full}
      />
      <WhatsAppButton link={content.company.whatsappLink} phone={content.company.whatsapp} />
    </>
  );
}

