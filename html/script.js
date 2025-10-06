let playerStats = { health: 100, armor: 0 };
let hudVisible = true;

function updateHealth(health, armor) {
    const healthFill = document.getElementById('health-fill');
    const healthText = document.getElementById('health-text');
    const armorFill = document.getElementById('armor-fill');
    const armorText = document.getElementById('armor-text');
    
    const healthPercent = Math.max(0, Math.min(100, health));
    healthFill.style.width = healthPercent + '%';
    healthText.textContent = Math.round(healthPercent) + '%';
    
    const armorPercent = Math.max(0, Math.min(100, armor));
    armorFill.style.width = armorPercent + '%';
    armorText.textContent = Math.round(armorPercent) + '%';
    
    if (healthPercent <= 25) {
        healthFill.style.background = 'linear-gradient(90deg, #F44336, #FF5722)';
        healthFill.style.boxShadow = '0 0 10px rgba(244, 67, 54, 0.5)';
    } else if (healthPercent <= 50) {
        healthFill.style.background = 'linear-gradient(90deg, #FF9800, #FFC107)';
        healthFill.style.boxShadow = '0 0 10px rgba(255, 152, 0, 0.5)';
    } else {
        healthFill.style.background = 'linear-gradient(90deg, #4CAF50, #8BC34A)';
        healthFill.style.boxShadow = '0 0 10px rgba(76, 175, 80, 0.5)';
    }
}

function updateStats(stats) {
    if (stats.health !== undefined) playerStats.health = stats.health;
    if (stats.armor !== undefined) playerStats.armor = stats.armor;
    
    updateHealth(playerStats.health, playerStats.armor);
}


function toggleHUD(visible) {
    const hudContainer = document.getElementById('hud-container');
    hudVisible = visible;
    
    if (visible) {
        hudContainer.classList.remove('hud-hidden');
    } else {
        hudContainer.classList.add('hud-hidden');
    }
}

window.addEventListener('message', function(event) {
    const data = event.data;
    
    switch(data.type) {
        case 'updateHealth':
            updateHealth(data.health, data.armor);
            break;
            
        case 'updateStats':
            updateStats(data.data);
            break;
            
        case 'toggleHUD':
            toggleHUD(data.visible);
            break;
    }
});

document.addEventListener('DOMContentLoaded', () => { updateHealth(100, 0); });

document.addEventListener('keyup', function(e) {
    if (e.key === 'Escape') {
        fetch(`https://${GetParentResourceName()}/close`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });
    }
});

function GetParentResourceName() {
    return window.location.hostname;
}

// Venus PvP HUD | Credits: Venus | FiveM & Scripts | discord.gg/MpZ4FWdFW7

