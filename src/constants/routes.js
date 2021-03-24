const publicRoutes = {
  LOGIN: "/login",
  REGISTER: "/register",
  BOOKS: "/books",
  CATEGORIES: "/categories",
  ABOUT: "/about",
  CATEGORY: "/books/categories",
};

const privateRoutes = {
  HOME: "/",
  PROFILE: "/profile"
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};
export default Routes;
