"use client";

import { motion } from "framer-motion";
import type { Course } from "@/types";
import HeroTile from "./HeroTile";
import CourseCard from "./CourseCard";
import ActivityTile from "./ActivityTile";

interface BentoGridProps {
  courses: Course[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

const tileVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 22,
    },
  },
};

export default function BentoGrid({ courses }: BentoGridProps) {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 md:p-6"
      aria-label="Dashboard tiles"
    >
      {/* Hero tile — spans 2 cols */}
      <motion.div variants={tileVariants} className="col-span-2 lg:col-span-2">
        <HeroTile name="Alex" streak={12} />
      </motion.div>

      {/* Activity tile — spans 2 cols */}
      <motion.div variants={tileVariants} className="col-span-2 lg:col-span-2">
        <ActivityTile />
      </motion.div>

      {/* Course tiles */}
      {courses.map((course, i) => (
        <motion.div key={course.id} variants={tileVariants}>
          <CourseCard course={course} index={i} />
        </motion.div>
      ))}
    </motion.section>
  );
}
