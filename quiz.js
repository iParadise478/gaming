let currentStep = 1;

function nextStep(step) {
    // Hide current step
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    
    // Show next step
    currentStep = step;
    document.getElementById(`step-${currentStep}`).classList.add('active');
    
    // Update progress bar
    const progress = (currentStep / 3) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('current-step').textContent = currentStep;
}

function processResults() {
    // Hide Step 3
    document.getElementById(`step-3`).classList.remove('active');
    
    // Show Loader
    document.getElementById('loader-step').classList.add('active');
    
    const loaderText = document.getElementById('loader-text');
    const messages = [
        "Checking availability in your region...",
        "Verifying IPL access...",
        "Confirming bonus eligibility..."
    ];
    
    let msgIdx = 0;
    const interval = setInterval(() => {
        msgIdx++;
        if (msgIdx < messages.length) {
            loaderText.textContent = messages[msgIdx];
        } else {
            clearInterval(interval);
            showFinalResult();
        }
    }, 1000);
}

function showFinalResult() {
    // Hide Loader
    document.getElementById('loader-step').classList.remove('active');
    
    // Show Result
    document.getElementById('result-step').classList.add('active');
    
    // Delayed CTA appearance
    setTimeout(() => {
        document.getElementById('final-cta').style.display = 'block';
    }, 1500);
}

function redirectToOffer() {
    // Get all current URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Define the main offer URL (placeholder)
    const offerUrl = "https://official-ipl-earning-app.com/register";
    
    // Append tracking parameters if they exist
    const finalUrl = new URL(offerUrl);
    urlParams.forEach((value, key) => {
        finalUrl.searchParams.set(key, value);
    });
    
    // Redirect
    console.log("Redirecting to:", finalUrl.toString());
    window.location.href = finalUrl.toString();
}

// Floating Notifications
const notifications = [
    { name: "Rohit from Mumbai", action: "just joined" },
    { name: "Ankit", action: "earned ₹950" },
    { name: "Sunil from Delhi", action: "joined now" },
    { name: "Megha from Pune", action: "withdrew ₹1,500" }
];

function showNotification() {
    const container = document.getElementById('notification-container');
    const note = notifications[Math.floor(Math.random() * notifications.length)];
    
    const div = document.createElement('div');
    div.className = 'notification';
    div.innerHTML = `<span><strong>${note.name}</strong> ${note.action}</span>`;
    
    container.appendChild(div);
    
    setTimeout(() => {
        div.remove();
    }, 3000);
}

window.onload = function() {
    // Initial notification
    setTimeout(showNotification, 2000);

    // Repeat notifications
    setInterval(showNotification, 6000);
};
