document.addEventListener('DOMContentLoaded', () => {
  // Navigation active
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
});
 // Update date and time dynamically
    function updateDateTime() {
      const now = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      document.getElementById('date-jour').textContent = `Date et heure actuelles : ${now.toLocaleString('fr-FR', options)} CET`;
    }
    updateDateTime();
    setInterval(updateDateTime, 60000); // Update every minute