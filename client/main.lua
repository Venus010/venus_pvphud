local playerStats = { health = 100, armor = 0 }
local hudVisible = true
local UPDATE_INTERVAL = (Config and Config.UpdateInterval) or 150

local function sendStatUpdate(h, a) SendNUIMessage({ type = 'updateHealth', health = h, armor = a }) end

Citizen.CreateThread(function()
    SetNuiFocus(false, false)
    
    while not NetworkIsPlayerActive(PlayerId()) do Citizen.Wait(100) end
    
    SendNUIMessage({ type = 'updateStats', data = playerStats })

    if Config and Config.StartupMessage then print('^5[Venus PvP HUD]^7 Client ready | ^3Venus | FiveM & Scripts ^4discord.gg/MpZ4FWdFW7') end
    
    while true do
        Citizen.Wait(UPDATE_INTERVAL)
        if hudVisible then
            local ped = PlayerPedId()
            local norm = math.max(0, GetEntityHealth(ped) - 100)
            local ar = GetPedArmour(ped)
            if playerStats.health ~= norm or playerStats.armor ~= ar then
                playerStats.health = norm
                playerStats.armor = ar
                sendStatUpdate(norm, ar)
            end
        end
    end
end)



RegisterCommand('togglehud', function()
    hudVisible = not hudVisible
    SendNUIMessage({ type = 'toggleHUD', visible = hudVisible })
    local state = hudVisible and '^2ON' or '^1OFF'
    print(('^5[Venus PvP HUD]^7 HUD toggled: %s^7'):format(state))
end, false)



RegisterNUICallback('close', function(_, cb) cb('ok') end)

-- Venus PvP HUD | Credits: Venus | FiveM & Scripts | discord.gg/MpZ4FWdFW7
