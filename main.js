// Utility to manage parameters including click_id
const AppConfig = {
    getParam: function(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    },
    
    getAllParams: function() {
        return new URLSearchParams(window.location.search);
    },

    // Save params to session storage to persist across page navigations
    persistParams: function() {
        const params = this.getAllParams();
        if (params.has('click_id')) {
            sessionStorage.setItem('click_id', params.get('click_id'));
        }
        if (params.has('txn')) {
            sessionStorage.setItem('txn', params.get('txn'));
        }
    }
};

// Initialize common behavior
document.addEventListener('DOMContentLoaded', () => {
    AppConfig.persistParams();
    
    // Add any global UI observers here
    const ctaBtns = document.querySelectorAll('.pulse');
    ctaBtns.forEach(btn => {
        btn.addEventListener('touchstart', () => {
            btn.style.transform = 'scale(0.96)';
        });
        btn.addEventListener('touchend', () => {
            btn.style.transform = 'scale(1)';
        });
    });
});
