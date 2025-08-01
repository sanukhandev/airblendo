// Mock data for the learning platform
export const flights=[
    {
      id: 1,
    airline: "Emirates",
      number:"EK312",
      price: 450,
      duration: "6h 30m",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg",
    departFrom: "Rome (FCO)",
      arriveIn:"Dubai (DXB)",
      departAt: "8:20",
      arriveAt:"14:50"
    },
    {
      id: 2,
      airline: "Etihad",
       number:"Q312",
      price: 420,
      duration: "7h 00m",
      image: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Etihad-airways-logo.svg",
       departFrom: "Rome (FCO)",
      arriveIn:"Dubai (DXB)",
       departAt: "8:20",
      arriveAt:"14:50"
    },{
      id: 3,
      airline: "Qatar Airways",
       number:"Q532",
      price: 420,
      duration: "7h 00m",
      image: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Qatar_Airways_Logo.png",
       departFrom: "Rome (FCO)",
      arriveIn:"Dubai (DXB)",
       departAt: "8:20",
      arriveAt:"14:50"
    },{
      id: 4,
      airline: "ITA Airways",
       number:"IT12",
      price: 420,
      duration: "7h 00m",
      image: "http://upload.wikimedia.org/wikipedia/commons/e/ee/ITA_Airways_Logo.png",
         departFrom: "Rome (FCO)",
      arriveIn:"Dubai (DXB)",
       departAt: "8:20",
      arriveAt:"14:50"
  },
    {
      id: 5,
      airline: "Lufthansa",
      number:"LF99",
      price: 420,
      duration: "7h 00m",
      image: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Lufthansa_Logo_2018.svg",
         departFrom: "Rome (FCO)",
      arriveIn:"Dubai (DXB)",
      departAt: "8:20",
      arriveAt:"14:50"
    },
  ];
  export const places = [
    {
      id: 1,
      city_name:"New York",
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
      city_name:"Rome",
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
      city_name:"Zurich",
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
      city_name:"Dubai",
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
      city_name:"Tokyo",
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