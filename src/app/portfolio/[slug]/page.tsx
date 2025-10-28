import { portfolioItems } from '@/lib/projectsInfo';
import LenisWrapper from '@/components/LenisWrapper';
import ProjectFeatures from '@/components/projectSections/ProjectFeatures';
import ProjectOverview from '@/components/projectSections/ProjectOverview';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import PageWithLoader from '@/components/PageWithLoader';
import ProjectHero from '@/components/projectSections/ProjectHero';
import ProjectTechnologies from '@/components/projectSections/ProjectTechnologies';
import ProjectMore from '@/components/projectSections/ProjectMore';

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const project = portfolioItems.find((item) => item.slug === slug);
  if (!project) return notFound();

  return (
    <LenisWrapper>
      <main className='min-h-dvh overflow-hidden w-screen relative '>
        <PageWithLoader>
          <ProjectHero
            text={project.text}
            link={project.link}
            image={project.image}
          />
          <ProjectOverview
            description={project.description}
            pics={project.aboutPics}
          />
          <ProjectFeatures text={project.text} features={project.features} />
          <ProjectTechnologies technologies={project.technologies} />
          <ProjectMore more={project.more} images={project.moreImgs} />
          <div className='block sm:hidden h-[20vh] bg-neutral-100'>
            <Footer />
          </div>
        </PageWithLoader>
      </main>
    </LenisWrapper>
  );
}
