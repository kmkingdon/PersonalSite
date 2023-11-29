'use client'
import Image from 'next/image'
import { useSelector } from 'react-redux';
import { selectAboutLoading, selectAboutParagraphs} from '../../redux/generatedSlice';
import LoadingOverlay from '../../ui/loadingOverlay';

// const aboutDefault = [
// "Kevin Kingdon is an experienced professional with a diverse background in both education and software development. Born and raised in Denver, Colorado, Kevin grew up in the Denver suburbs before venturing to Minnesota for his undergraduate studies in painting and sculpting. After obtaining his bachelor's degree, Kevin taught for a year in the Bronx, New York for a Catholic volunteer organization, showcasing his commitment to service and education. He went on to earn a master's degree in the art of Teaching and taught middle school science in Shreveport, Louisiana.",
// "Kevin's passion for teaching led him back to his hometown of Denver, where he taught middle school science at Denver Public Schools. During this time, he also served as the Science Department Head, highlighting his leadership skills and ability to foster collaboration between colleagues.",
// "Looking to expand his skill set, Kevin made a bold career change and attended a coding bootcamp, where he gained proficiency in web development. With his background in teaching and coding, he secured a position at an ed-tech startup, where he worked as a Full Stack Web Developer. His responsibilities included architecting and leading the development of a navigation and analytics dashboard, as well as integrating the product with various learning management systems and video hosting platforms.",
// "Kevin's expertise in web development eventually led him to a role at Alteryx, where he worked as a Software Engineer before being promoted to a Team Lead and Software Delivery Manager. During his time at Alteryx, he guided the successful execution and delivery of multiple projects and products. He integrated seamlessly with various libraries and APIs to ensure cohesive system functionality and identified technical risks while developing architectural and high-level technical design plans. Kevin also collaborated with multiple Product Owners to establish a clear product vision and roadmap, demonstrating his ability to translate business requirements into technical solutions.",
// "In addition to his professional experience, Kevin holds a degree in Web Development Immersive from Galvanize and a Bachelor of Arts in Studio Art from Saint John's University. These educational experiences have equipped him with the theoretical knowledge and practical coding skills necessary for success in the software development field.",
// "Kevin possesses a wide range of technical skills, including JavaScript, TypeScript, React, Redux, MySQL, Vue, Next.js, and PACT testing, among others. He also has expertise in agile methodologies, Git team workflow, KPI analysis and tracking, and mentoring.",
// "What sets Kevin apart as an employee is his well-rounded background and diverse skill set. His experience as a teacher has honed his communication, problem-solving, and leadership abilities, making him adaptable and capable of working effectively with cross-functional teams. Kevin's passion for education and his commitment to delivering exceptional results are evident in his track record of successfully executing and delivering projects. With his technical expertise, organizational skills, and community-building experiences, Kevin is a valuable asset to any team or organization.",
// "Overall, Kevin Kingdon's unique blend of education, teaching experience, and software development skills make him an ideal candidate for employment. His ability to effectively communicate, lead teams, and deliver high-quality products sets him apart as a well-rounded professional.",
// ]
export default function Page() {
  const aboutParagraphs = useSelector(selectAboutParagraphs);
  const loading = useSelector(selectAboutLoading);


  return (
    loading ? 
    <LoadingOverlay message="Generating..."/>
    :
    <div className="bg-black w-full h-full overflow-y-scroll">
      <div className="p-12 md:p-24">
        <Image
          src="/headshot.png"
          alt="Kevin Kingdon"
          style={{float:"left", margin:"24px"}}
          width={400}
          height={400}
          priority
        />
        {
          aboutParagraphs.map((text, index) => {
            return  <p key={index} className="text-white px-12 py-4 text-justify text-lg indent-20 break-normal">{text}</p>
          })
        }
      </div>
    </div>
  )
}