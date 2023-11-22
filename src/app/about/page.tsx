'use client'
import Image from 'next/image'

const aboutDefault = [
"Kevin Kingdon is an experienced professional with a diverse background in both education and software development. Born and raised in Denver, Colorado, Kevin grew up in the Denver suburbs before venturing to Minnesota for his undergraduate studies in painting and sculpting. After obtaining his bachelor's degree, Kevin taught for a year in the Bronx, New York for a Catholic volunteer organization, showcasing his commitment to service and education. He went on to earn a master's degree in the art of Teaching and taught middle school science in Shreveport, Louisiana.",
"Kevin's passion for teaching led him back to his hometown of Denver, where he taught middle school science at Denver Public Schools. During this time, he also served as the Science Department Head, highlighting his leadership skills and ability to foster collaboration between colleagues.",
"Looking to expand his skill set, Kevin made a bold career change and attended a coding bootcamp, where he gained proficiency in web development. With his background in teaching and coding, he secured a position at an ed-tech startup, where he worked as a Full Stack Web Developer. His responsibilities included architecting and leading the development of a navigation and analytics dashboard, as well as integrating the product with various learning management systems and video hosting platforms.",
"Kevin's expertise in web development eventually led him to a role at Alteryx, where he worked as a Software Engineer before being promoted to a Team Lead and Software Delivery Manager. During his time at Alteryx, he guided the successful execution and delivery of multiple projects and products. He integrated seamlessly with various libraries and APIs to ensure cohesive system functionality and identified technical risks while developing architectural and high-level technical design plans. Kevin also collaborated with multiple Product Owners to establish a clear product vision and roadmap, demonstrating his ability to translate business requirements into technical solutions.",
"In addition to his professional experience, Kevin holds a degree in Web Development Immersive from Galvanize and a Bachelor of Arts in Studio Art from Saint John's University. These educational experiences have equipped him with the theoretical knowledge and practical coding skills necessary for success in the software development field.",
"Kevin possesses a wide range of technical skills, including JavaScript, TypeScript, React, Redux, MySQL, Vue, Next.js, and PACT testing, among others. He also has expertise in agile methodologies, Git team workflow, KPI analysis and tracking, and mentoring.",
"What sets Kevin apart as an employee is his well-rounded background and diverse skill set. His experience as a teacher has honed his communication, problem-solving, and leadership abilities, making him adaptable and capable of working effectively with cross-functional teams. Kevin's passion for education and his commitment to delivering exceptional results are evident in his track record of successfully executing and delivering projects. With his technical expertise, organizational skills, and community-building experiences, Kevin is a valuable asset to any team or organization.",
"Overall, Kevin Kingdon's unique blend of education, teaching experience, and software development skills make him an ideal candidate for employment. His ability to effectively communicate, lead teams, and deliver high-quality products sets him apart as a well-rounded professional.",
]
export default function Page() {
  return (
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
          {/* <span className="whitespace-pre text-white text-justify text-lg indent-20 break-normal">
          "Kevin Kingdon is a versatile professional with a diverse background and a strong track record in various roles. Born and raised in Denver, Colorado, Kevin has a Bachelor's degree in Studio Art from Saint John's University, where he excelled in creating, producing, and presenting art shows encompassing various mediums. Kevin's creativity and leadership skills were also evident during his time as captain of the rowing team, where he revitalized the organization and demonstrated strong team-building abilities

            After completing an intensive web development immersion program at Galvanize, Kevin gained over 1,000 hours of hands-on experience in building real-world business applications. He mastered industry-standard practices such as pair programming and agile workflows, translating his theoretical knowledge into practical coding skills. Kevin further honed his technical expertise as a Full Stack Web Developer at PlayPosit, where he architected and led the development of a navigation and analytics dashboard for Play Posit 3.0. His technical leadership and innovation were instrumental in the successful transformation of legacy PHP code into an efficient Vue.js microservice.\n' +
    '\n' +
    "Kevin's passion for education led him to a career in teaching, where he served as a Middle School Science Teacher at both Denver Public Schools and Caddo Parish Public Schools. In these roles, he managed school technology programs, developed blended learning online curriculum programs, mentored peers and student teachers, and built connections within the community. Kevin's dedication to fostering collaboration and sharing resources also saw him appointed as the Science Department Head at Denver Public Schools.\n" +
    '\n' +
    'Most recently, Kevin has transitioned into the field of software delivery at Alteryx, where he has held roles as a Software Engineer and a Team Lead/Software Delivery Manager. In these positions, Kevin has guided the successful execution and delivery of multiple projects and products, demonstrated expertise in integrating various libraries and APIs, and identified technical risks and developed requirements for architectural and high-level technical design plans. He has also shown strong leadership skills by collaborating with multiple Product Owners, formulating strategic roadmaps, and maintaining transparent communication throughout the delivery process.\n' +
    '\n' +
    "Kevin's diverse range of skills includes technical proficiencies in JavaScript, TypeScript, React, Redux, MySQL, and more. Additionally, his experience in software delivery has equipped him with skills in agile methodologies, Git team workflow, KPI analysis, and service monitoring. Kevin's people leadership skills, including a growth mindset and mentoring abilities, make him an asset to any team. Furthermore, his involvement in community activities such as athletic coaching, event organization, and improvisational comedy reflects his ability to build strong relationships and promote a positive and inclusive work environment.\n" +
    '\n' +
    "Kevin Kingdon's exceptional ability to combine his artistic background with technical expertise, his leadership and collaboration skills, and his dedication to education and community make him a standout candidate for any hiring manager. His diverse experiences and range of skills position him as an invaluable asset in delivering successful projects and fostering a positive team culture.",
        </span> */}
          {
            aboutDefault.map((text) => {
              return  <p className="text-white px-12 py-4 text-justify text-lg indent-20 break-normal">{text}</p>
            })
          }
        </div>
      </div>
  );
}