// middleware/auth.ts

export default defineNuxtRouteMiddleware((to, from) => {
  // Replace with your actual authentication check
  const isAuthenticated = process.client && localStorage.getItem('user-token');

  if (isAuthenticated) {
    // User is logged in, allow navigation to proceed
    return;
  }

  // If the user is NOT logged in and is trying to access a protected page, redirect.
  // The 'navigateTo' helper is used for redirection in Nuxt middleware.
  if (to.path !== '/login') {
    return navigateTo('/login');
  }
});