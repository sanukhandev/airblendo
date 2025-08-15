// Mock data for the learning platform

export const Menu = [{
  id: 1,
  name: "Flights",
  link: "/",
}, {
  id: 2,
  name: "Hotels",
  link: "/hotels",
}]

export const flights = [
  {
    id: 1,
    airline: "Emirates",
    number: "EK312",
    duration: "6h 30m",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg",
    departFrom: "Rome (FCO)",
    departFromCode: "FCO",
    arriveIn: "Dubai (DXB)",
    arriveInCode: "DXB",
    departAt: "8:20",
    arriveAt: "14:50",
    aircraft: "Boeing 777-300ER",
    stops: 0,
    stopInfo: "Non-stop",
    cabinClasses: {
      economy: {
        price: 450,
        available: true,
        seats: 12,
        baggage: "23kg checked + 7kg carry-on",
        refundable: false,
        changeable: true,
        changeeFee: 150
      },
      premiumEconomy: {
        price: 680,
        available: true,
        seats: 8,
        baggage: "32kg checked + 7kg carry-on",
        refundable: false,
        changeable: true,
        changeeFee: 100
      },
      business: {
        price: 1250,
        available: true,
        seats: 4,
        baggage: "40kg checked + 7kg carry-on",
        refundable: true,
        changeable: true,
        changeeFee: 0
      },
      first: {
        price: 2800,
        available: true,
        seats: 2,
        baggage: "40kg checked + 7kg carry-on",
        refundable: true,
        changeable: true,
        changeeFee: 0
      }
    }
  },
  {
    id: 2,
    airline: "Etihad",
    number: "Q312",
    duration: "7h 00m",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Etihad-airways-logo.svg",
    departFrom: "Rome (FCO)",
    departFromCode: "FCO",
    arriveIn: "Dubai (DXB)",
    arriveInCode: "DXB",
    departAt: "10:45",
    arriveAt: "17:45",
    aircraft: "Airbus A380",
    stops: 0,
    stopInfo: "Non-stop",
    cabinClasses: {
      economy: {
        price: 420,
        available: true,
        seats: 15,
        baggage: "23kg checked + 7kg carry-on",
        refundable: false,
        changeable: true,
        changeeFee: 150
      },
      premiumEconomy: {
        price: 650,
        available: true,
        seats: 6,
        baggage: "32kg checked + 7kg carry-on",
        refundable: false,
        changeable: true,
        changeeFee: 100
      },
      business: {
        price: 1180,
        available: true,
        seats: 3,
        baggage: "40kg checked + 7kg carry-on",
        refundable: true,
        changeable: true,
        changeeFee: 0
      }
    }
  },
  {
    id: 3,
    airline: "Qatar Airways",
    number: "Q532",
    duration: "6h 45m",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Qatar_Airways_Logo.png",
    departFrom: "Rome (FCO)",
    departFromCode: "FCO",
    arriveIn: "Dubai (DXB)",
    arriveInCode: "DXB",
    departAt: "14:30",
    arriveAt: "21:15",
    aircraft: "Boeing 787-9",
    stops: 0,
    stopInfo: "Non-stop",
    cabinClasses: {
      economy: {
        price: 465,
        available: true,
        seats: 18,
        baggage: "23kg checked + 7kg carry-on",
        refundable: false,
        changeable: true,
        changeeFee: 150
      },
      premiumEconomy: {
        price: 720,
        available: true,
        seats: 10,
        baggage: "32kg checked + 7kg carry-on",
        refundable: false,
        changeable: true,
        changeeFee: 100
      },
      business: {
        price: 1320,
        available: true,
        seats: 6,
        baggage: "40kg checked + 7kg carry-on",
        refundable: true,
        changeable: true,
        changeeFee: 0
      }
    }
  },
  {
    id: 4,
    airline: "ITA Airways",
    number: "IT12",
    duration: "7h 15m",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ee/ITA_Airways_Logo.png",
    departFrom: "Rome (FCO)",
    departFromCode: "FCO",
    arriveIn: "Dubai (DXB)",
    arriveInCode: "DXB",
    departAt: "16:20",
    arriveAt: "23:35",
    aircraft: "Airbus A330-200",
    stops: 0,
    stopInfo: "Non-stop",
    cabinClasses: {
      economy: {
        price: 390,
        available: true,
        seats: 22,
        baggage: "23kg checked + 7kg carry-on",
        refundable: false,
        changeable: true,
        changeeFee: 150
      },
      premiumEconomy: {
        price: 580,
        available: true,
        seats: 12,
        baggage: "32kg checked + 7kg carry-on",
        refundable: false,
        changeable: true,
        changeeFee: 100
      },
      business: {
        price: 1050,
        available: true,
        seats: 8,
        baggage: "40kg checked + 7kg carry-on",
        refundable: true,
        changeable: true,
        changeeFee: 0
      }
    }
  },
  {
    id: 5,
    airline: "Lufthansa",
    number: "LF99",
    duration: "8h 20m",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Lufthansa_Logo_2018.svg",
    departFrom: "Rome (FCO)",
    departFromCode: "FCO",
    arriveIn: "Dubai (DXB)",
    arriveInCode: "DXB",
    departAt: "22:40",
    arriveAt: "07:00+1",
    aircraft: "Airbus A350-900",
    stops: 1,
    stopInfo: "1 stop in Frankfurt (2h layover)",
    cabinClasses: {
      economy: {
        price: 350,
        available: true,
        seats: 25,
        baggage: "23kg checked + 8kg carry-on",
        refundable: false,
        changeable: true,
        changeeFee: 150
      },
      premiumEconomy: {
        price: 540,
        available: true,
        seats: 14,
        baggage: "32kg checked + 8kg carry-on",
        refundable: false,
        changeable: true,
        changeeFee: 100
      },
      business: {
        price: 980,
        available: true,
        seats: 10,
        baggage: "40kg checked + 8kg carry-on",
        refundable: true,
        changeable: true,
        changeeFee: 0
      }
    }
  }
];
export const places = [
  {
    id: 1,
    city_name: "New York",
    image: 'https://images.unsplash.com/photo-1577999913008-8460500e6264?q=80&w=1049&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    categoryId: 1,
    category: 'Web Development',
    level: 'Beginner',
    duration: '42 hours',
    lastUpdated: '2024-01-15',
    bestseller: true,
    description: 'Master React development from scratch with this comprehensive course covering hooks, context, routing, and modern React patterns.',

  },
  {
    id: 2,
    city_name: "Rome",
    image: 'https://images.unsplash.com/photo-1603199766980-fdd4ac568a11?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    categoryId: 1,
    category: 'Web Development',
    level: 'Beginner',
    duration: '42 hours',
    lastUpdated: '2024-01-15',
    bestseller: true,
    description: 'Master React development from scratch with this comprehensive course covering hooks, context, routing, and modern React patterns.',

  },
  {
    id: 3,
    city_name: "Zurich",
    image: 'https://images.unsplash.com/photo-1583132831598-badf5e654ef0?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    categoryId: 1,
    category: 'Web Development',
    level: 'Beginner',
    duration: '42 hours',
    lastUpdated: '2024-01-15',
    bestseller: true,
    description: 'Master React development from scratch with this comprehensive course covering hooks, context, routing, and modern React patterns.',

  },
  {
    id: 4,
    city_name: "Dubai",
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    categoryId: 1,
    category: 'Web Development',
    level: 'Beginner',
    duration: '42 hours',
    lastUpdated: '2024-01-15',
    bestseller: true,
    description: 'Master React development from scratch with this comprehensive course covering hooks, context, routing, and modern React patterns.',

  },
  {
    id: 5,
    city_name: "Tokyo",
    image: 'https://images.unsplash.com/photo-1703902172184-7270d0ad451e?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    categoryId: 1,
    category: 'Web Development',
    level: 'Beginner',
    duration: '42 hours',
    lastUpdated: '2024-01-15',
    bestseller: true,
    description: 'Master React development from scratch with this comprehensive course covering hooks, context, routing, and modern React patterns.',

  }
];


export const instructors = [
  {
    id: 1,
    name: 'John Smith',
    title: 'Senior React Developer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.8,
    students: 89340,
    courses: 12,
    bio: 'John is a senior React developer with 8+ years of experience building scalable web applications.',
    expertise: ['React', 'JavaScript', 'Node.js', 'TypeScript']
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    title: 'Data Scientist',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b9c2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.9,
    students: 45280,
    courses: 8,
    bio: 'Sarah is a data scientist with expertise in machine learning and statistical analysis.',
    expertise: ['Python', 'Machine Learning', 'Statistics', 'Data Analysis']
  }
];

export const reviews = [
  {
    id: 1,
    courseId: 1,
    user: 'Alex Thompson',
    userImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 5,
    comment: 'Excellent course! John explains everything clearly and the projects are really helpful.',
    date: '2024-01-20',
    helpful: 45
  },
  {
    id: 2,
    courseId: 1,
    user: 'Maria Garcia',
    userImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b9c2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4,
    comment: 'Great content and well structured. Would love to see more advanced topics.',
    date: '2024-01-15',
    helpful: 32
  }
];

export const users = [
  {
    id: 1,
    name: 'Alex Thompson',
    email: 'alex@example.com',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: 'student',
    enrolledCourses: [1, 2],
    wishlist: [3, 4],
    cart: [],
    completedCourses: [],
    progress: {
      1: { completed: 15, total: 42, percentage: 36 },
      2: { completed: 8, total: 28, percentage: 29 }
    }
  }
];

// Mock current user
export const currentUser = users[0];

// Mock cart data
export const cartItems = [];

// Mock wishlist data
export const wishlistItems = [3, 4];

// Mock learning progress
export const learningProgress = {
  1: {
    courseId: 1,
    currentLesson: 'Your First React Component',
    currentSection: 'Getting Started with React',
    completedLessons: 15,
    totalLessons: 42,
    percentage: 36,
    lastWatched: '2024-01-25',
    timeSpent: '12h 30m'
  },
  2: {
    courseId: 2,
    currentLesson: 'Working with Lists and Dictionaries',
    currentSection: 'Python Fundamentals for Data Science',
    completedLessons: 8,
    totalLessons: 28,
    percentage: 29,
    lastWatched: '2024-01-22',
    timeSpent: '8h 15m'
  }
};

// Mock notifications
export const notifications = [
  {
    id: 1,
    type: 'course_update',
    title: 'New lesson added to React Course',
    message: 'John Smith added a new lesson: "Advanced React Patterns"',
    date: '2024-01-25',
    read: false
  },
  {
    id: 2,
    type: 'achievement',
    title: 'Milestone reached!',
    message: 'You completed 25% of the Data Science course',
    date: '2024-01-22',
    read: false
  }
];

// Mock search suggestions
export const searchSuggestions = [
  'React',
  'JavaScript',
  'Python',
  'Data Science',
  'Machine Learning',
  'UI/UX Design',
  'Mobile Development',
  'Web Development'
];

// Mock promotional banners
export const promotionalBanners = [
  {
    id: 1,
    title: 'New Year Sale',
    subtitle: 'Up to 80% off on all courses',
    cta: 'Shop Now',
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    active: true
  }
];