// Countdown Timer
function startTimer(duration, display) {
    let timer = duration, hours, minutes, seconds;
    setInterval(function () {
        hours = parseInt(timer / 3600, 10);
        minutes = parseInt((timer % 3600) / 60, 10);
        seconds = parseInt(timer % 60, 10);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = hours + ":" + minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

// Floating Notifications
const notifications = [
    { name: "Rahul from Delhi", amount: "₹850" },
    { name: "Amit from Mumbai", amount: "₹1,200" },
    { name: "Suresh from Jaipur", amount: "₹3,000" },
    { name: "Priya from Bangalore", amount: "₹500" },
    { name: "Deepak from Lucknow", amount: "₹2,100" }
];

function showNotification() {
    const container = document.getElementById('notification-container');
    const note = notifications[Math.floor(Math.random() * notifications.length)];
    
    const div = document.createElement('div');
    div.className = 'notification';
    div.innerHTML = `
        <div class="notification-dot"></div>
        <span><strong>${note.name}</strong> just earned ${note.amount}</span>
    `;
    
    container.appendChild(div);
    
    setTimeout(() => {
        div.remove();
    }, 3000);
}

// Global click tracker (simulated)
function trackClick() {
    // In a real scenario, this would redirect or track via RedTrack/Voluum
    console.log("CTA Clicked");
    alert("Redirecting to Official Offer...");
}

window.onload = function () {
    // Initialize 24-hour timer
    const twentyFourHours = 24 * 60 * 60;
    const display = document.querySelector('#countdown');
    startTimer(twentyFourHours, display);

    // Initial notification after 2 seconds
    setTimeout(showNotification, 2000);

    // Repeat notifications every 5-8 seconds
    setInterval(() => {
        showNotification();
    }, Math.floor(Math.random() * 3000) + 5000);
};
