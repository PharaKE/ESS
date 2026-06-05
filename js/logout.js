const LogoutModal = {
  // Configuration - change these as needed
  config: {
    redirectUrl: 'index.html',
    overlayId: 'logoutOverlay',
    sidebarId: 'sidebar',
    sidebarOverlayId: 'sidebarOverlay',
    mobileMenuBtnId: 'mobileMenuBtn'
  },

  /**
   * Show the logout confirmation modal
   */
  show: function() {
    const overlay = document.getElementById(this.config.overlayId);
    if (!overlay) {
      console.warn('Logout overlay not found. Redirecting directly.');
      this.performLogout();
      return;
    }
    
    // Close mobile sidebar if open
    this._closeSidebarIfOpen();
    
    // Show the modal
    overlay.classList.add('active');
    
    // Focus the cancel button for accessibility
    setTimeout(() => {
      const cancelBtn = overlay.querySelector('.logout-btn-cancel');
      if (cancelBtn) cancelBtn.focus();
    }, 100);
  },

  /**
   * Close the logout modal
   */
  close: function() {
    const overlay = document.getElementById(this.config.overlayId);
    if (overlay) {
      overlay.classList.remove('active');
    }
  },

  /**
   * Confirm logout and redirect
   */
  confirm: function() {
    // Optional: Add any cleanup logic here
    // - Clear session storage
    // - Clear local storage
    // - Call logout API
    this._cleanup();
    
    // Redirect to login/index page
    window.location.href = this.config.redirectUrl;
  },

  /**
   * Perform logout directly (when modal HTML is missing)
   */
  performLogout: function() {
    this._cleanup();
    window.location.href = this.config.redirectUrl;
  },

  /**
   * Clean up session data before logout
   * Customize this method based on your app's needs
   */
  _cleanup: function() {
    // Clear session storage
    try {
      sessionStorage.clear();
    } catch (e) {
      // Ignore errors
    }
    
    // Optionally clear specific items from localStorage
    try {
      // localStorage.removeItem('userToken');
      // localStorage.removeItem('userData');
    } catch (e) {
      // Ignore errors
    }
    
    // Optional: Call logout API endpoint
    // fetch('/api/logout', { method: 'POST' });
  },

  /**
   * Close sidebar if it's open (mobile)
   */
  _closeSidebarIfOpen: function() {
    const sidebar = document.getElementById(this.config.sidebarId);
    const sidebarOverlay = document.getElementById(this.config.sidebarOverlayId);
    const mobileMenuBtn = document.getElementById(this.config.mobileMenuBtnId);
    
    if (sidebar && sidebar.classList.contains('mobile-open')) {
      sidebar.classList.remove('mobile-open');
      if (sidebarOverlay) sidebarOverlay.classList.remove('active');
      if (mobileMenuBtn) mobileMenuBtn.classList.remove('open');
    }
  },

  /**
   * Initialize event listeners
   */
  init: function() {
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    });

    // Prevent body scroll when modal is open
    const overlay = document.getElementById(this.config.overlayId);
    if (overlay) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.target.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
          } else {
            document.body.style.overflow = '';
          }
        });
      });
      
      observer.observe(overlay, { 
        attributes: true, 
        attributeFilter: ['class'] 
      });
    }
  }
};

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  LogoutModal.init();
});