const trainers = [
  {
    name: "John Doe",
    image: "/images/trainer1.png",
    category: "Fitness",
    description: "Certified personal trainer with 10 years of experience.",
    reviews: [],
    rating: 0,
    numReviews: 0,
    programs: [
      {
        title: "Full Body Workout",
        description: "A comprehensive workout targeting all muscle groups.",
        category: "Fitness",
        price: 50,
        type: "workout", // Optional property
      },
    ],
  },
  {
    name: "Jane Smith",
    image: "/images/trainer2.png",
    category: "Yoga",
    description: "Experienced yoga instructor specializing in hatha yoga.",
    reviews: [],
    rating: 0,
    numReviews: 0,
    programs: [
      {
        title: "Beginner Yoga",
        description:
          "Introduction to basic yoga poses and breathing techniques.",
        category: "Yoga",
        price: 40,
        type: "workout",
      },
    ],
  },
  {
    name: "David Johnson",
    image: "/images/trainer3.jpg",
    category: "CrossFit",
    description:
      "Passionate about functional fitness and high-intensity training.",
    reviews: [],
    rating: 4.5,
    numReviews: 12,
    programs: [
      {
        title: "HIIT Circuit",
        description:
          "10 High-intensity interval workouts for maximum calorie burn.",
        category: "Workout Plan",
        price: 60,
        type: "workout",
      },
      {
        title: "CrossFit Training",
        description: "12 weeks crossfit workout plan",
        category: "Workout Plan",
        price: 90,
        type: "workout",
      },
    ],
  },
  {
    name: "Emily Brown",
    image: "/images/trainer4.png",
    category: "Pilates",
    description:
      "Dedicated Pilates instructor focused on core strength and flexibility.",
    reviews: [],
    rating: 0,
    numReviews: 0,
    programs: [
      {
        title: "Core Strengthening",
        description:
          "Targeted exercises to strengthen and tone the core muscles.",
        category: "Pilates",
        price: 45,
        // No type specified, illustrating optionality
      },
    ],
  },
  {
    name: "Alex Wilson",
    image: "/images/trainer5.png",
    category: "Bodybuilding",
    description:
      "Bodybuilding coach with a specialization in muscle building and nutrition.",
    reviews: [],
    rating: 0,
    numReviews: 0,
    programs: [
      {
        title: "Muscle Mass Gain",
        description: "Customized workout plan for increasing muscle mass.",
        category: "Bodybuilding",
        price: 70,
        type: "workout",
      },
    ],
  },
  {
    name: "Sarah Garcia",
    image: "/images/trainer6.png",
    category: "Cardio",
    description:
      "Cardiovascular fitness expert helping clients achieve their cardio goals.",
    reviews: [],
    rating: 0,
    numReviews: 0,
    programs: [
      {
        title: "Endurance Training",
        description: "Training regimen to enhance cardiovascular endurance.",
        category: "Cardio",
        price: 55,
        type: "workout",
      },
    ],
  },
];

export default trainers;
