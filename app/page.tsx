import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="w-full h-screen relative flex justify-center items-center flex-col gap-3 p-10">
        <video
          src="/hero.mp4"
          className="w-full h-full object-cover opacity-50 absolute top-0 left-0 -z-10"
          autoPlay
          muted
          loop
        ></video>
        <h1 className="text-7xl text-center">Aranda Music and Arts Program</h1>
        <h2 className="text-2xl text-center">
          An after school music, drama and art program
        </h2>
        <Button asChild>
          <Link href="/join">Join Now</Link>
        </Button>
      </div>
      <div className="prose prose-invert mx-auto py-4">
        <h2>The Program</h2>
        <p>
          The Aranda Music & Arts program provides affordable school-based
          music, drama, and art tuition for students attending Aranda Primary
          School (K to Y6).
        </p>
        <p>
          Classes operate between the hours of 3:30-6pm, Monday-Friday, during
          the school term.
        </p>
        <p>
          While the content of the program changes from year to year, its
          purpose remains the same – to enrich children’s lives through the
          arts.
        </p>
        <h2>Activities</h2>
        <ul>
          <li>Introduction to Music (K-Y1) ($20/lesson)</li>
          <li>Continuing Music (Y1-Y2) ($20/lesson)</li>
          <li>Drawing (Y3-Y6, younger children considered) ($27/lesson)</li>
        </ul>
        <h3>Group Lessons:</h3>
        <h3>Individual Lessons ($37/30 minute lesson):</h3>
        <ul>
          <li>Guitar</li>
          <li>Violin</li>
          <li>Piano</li>
        </ul>
        <p>
          For our current vacancies, see the{" "}
          <Link href="https://www.arandaps.act.edu.au/our_school/Newsletters">
            latest school newsletter.
          </Link>
        </p>
        <p>
          We have a fantastic team of highly skilled tutors who can cater for
          your child’s artistic needs.
        </p>
        <p>
          We also hold a recital evening in Term 3 at which the children take
          great pride in showing off what they have achieved.
        </p>
        <p>
          In 2023, families will not be charged an enrolment fee (usually $40
          annual registration for one child, or $75 for two or more).
        </p>
        <p>
          The Program is run by a group of volunteers who form a sub-committee
          of the P & C Association. We are always grateful for any help we can
          get. If you can donate some of your time to contribute to this valued
          Program, please <Link href="/become-a-volunteer">click here.</Link>
        </p>
        <p>
          Classes are only available to students attending Aranda Primary School
          (not preschool).
        </p>

        <p>
          Drop off and pick up policy: Parents should drop their children to the
          classroom and collect their children promptly after lessons. Students
          who attend Aranda After School Care will be collected/returned by the
          tutor.
        </p>

        <p>
          If you require After School Care please contact{" "}
          <Link href="https://www.arandaafters.com/">Aranda Afters</Link> for a
          separate enrolment form.
        </p>
      </div>
    </>
  );
}
