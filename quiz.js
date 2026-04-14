const quizSteps = {
    current: 1,
    total: 3
};

function nextStep(step) {
    // Hide current step
    document.getElementById(`step-${quizSteps.current}`).classList.remove('active');
    
    // Show new step
    document.getElementById(`step-${step}`).classList.add('active');
    quizSteps.current = step;
    
    // Update progress
    const progressPerc = (step / quizSteps.total) * 100;
    document.getElementById('progress-fill').style.width = `${progressPerc}%`;
    document.getElementById('step-indicator').innerText = `STEP ${step} OF ${quizSteps.total}`;
}

function startProcessing() {
    // Hide quiz
    document.getElementById(`step-${quizSteps.current}`).classList.remove('active');
    
    // Update header
    document.getElementById('bridge-title').innerText = "Processing Your Access";
    document.getElementById('bridge-subtitle').innerText = "Analyzing availability and bonuses...";
    
    // Show loader
    document.getElementById('processing-screen').classList.add('active');
    
    const statusText = document.getElementById('loading-status');
    const scenarios = [
        "Checking availability...",
        "Loading live matches...",
        "Preparing your exclusive bonus...",
        "Finalizing secure access..."
    ];
    
    let i = 0;
    const interval = setInterval(() => {
        if (i < scenarios.length) {
            statusText.innerText = scenarios[i];
            i++;
        } else {
            clearInterval(interval);
            showResult();
        }
    }, 600);
}

function showResult() {
    document.getElementById('processing-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('active');
    
    // Update header
    document.getElementById('bridge-title').innerText = "Setup Complete";
    document.getElementById('bridge-subtitle').innerText = "Your account access is ready.";
    
    // Attach redirect logic to final button
    document.getElementById('final-cta').addEventListener('click', startRedirect);
}

function startRedirect() {
    const overlay = document.getElementById('redirect-overlay');
    overlay.style.display = 'flex';
    
    const statusText = document.getElementById('redirect-status');
    
    setTimeout(() => {
        statusText.innerText = "Redirecting to live platform...";
        setTimeout(() => {
            performFinalRedirect();
        }, 1200);
    }, 1000);
}

function performFinalRedirect() {
    // Get parameters from session storage (saved in main.js) or URL
    const clickId = sessionStorage.getItem('click_id') || 
                  new URLSearchParams(window.location.search).get('click_id') || 
                  '{click_id}'; // Fallback to placeholder if missing
    
    const txnId = sessionStorage.getItem('txn') || 
                new URLSearchParams(window.location.search).get('txn') || 
                '{txn_id}'; // Fallback to placeholder if missing
    
    const baseUrl = "https://auctera.gotrackier.com/click";
    const params = new URLSearchParams({
        campaign_id: '2498',
        pub_id: '679',
        click_id: clickId,
        txn: txnId
    });
    
    window.location.href = `${baseUrl}?${params.toString()}`;
}

// Ensure parameters are captured if directly landed on quiz
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const clickId = urlParams.get('click_id');
    const txn = urlParams.get('txn');
    
    if (clickId) sessionStorage.setItem('click_id', clickId);
    if (txn) sessionStorage.setItem('txn', txn);
});
