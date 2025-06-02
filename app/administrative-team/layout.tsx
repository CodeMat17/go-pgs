export default function AdministrativeTeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: "Godfrey Okoye University School of Postgraduate Studies",
            url: "https://pg.gouni.edu.ng/",
            description:
              "Meet the dedicated administrative team shaping education at GO University School of Postgraduate Studies.",
          }),
        }}
      />
      {children}
    </>
  );
}
