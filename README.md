# elite_deathscreen [QBCore - Ambulancejob snippet]
A Fivem Deathscreen for QBCore Framework. No full resource, just code-snippets for qb-ambulancejob. Enjoy!

I will probably make this code more configurable and maybe make this as an contribution to the qb-ambulancejob resource when I get time for it. If anyone from the QB-Core team wants to use this and implement it fully to qb-ambulancejob, be my guest! :)

Also, every text message except for when you are bleeding out is hardcoded for the moment. I will change this as soon as I can, or something..

Why I made this resource for you guys is because I see so many retarded paid-resources which should be free as they take no time to make and there is no effort for such things. To take money from people for so simple resources blows my mind. I've myself never liked paid-resources except for when you have given your blood, sweat and tears to make them and for the time spent, take some small amounts because time is money ofc. But to (in my eyes) scam people like this is what I hate the most with what this community has grown to be.

**I hope you enjoy this free resource. As I said, I might make this a little better in the future but it works for $0. If you encounter any problems, make an issue here. If you want to contribute to this project, be my guest!**

# How to install
First of all, add the folder `"html"` to `qb-ambulancejob`

Go to `qb-ambulancejob/fxmanifest.lua` and add:
```lua
ui_page 'html/index.html'

files {
	'html/index.html',
	'html/css/*.css',
	'html/js/*.js'
}
```

Go to `qb-ambulancejob/client/main.lua` and search for `hospital:client:SendToBed` then add:
```lua
SendNUIMessage({
	status = 'open',
        type = 'bed',
        msg = "Du får hjälp, var god vänta!"
})
```
Below `SetBedCam()`

Also search for `hospital:client:Revive` and add:
```lua
SendNUIMessage({
        status = "close"
})
```
Below `ResetPedMovementClipset(player, 0.0)`

Go to `qb-ambulancejob/client/dead.lua` and search for `if not isInHospitalBed then` (Row 149), then change:
```lua
if not isInHospitalBed then
  if deathTime > 0 then
    DrawTxt(0.93, 1.44, 1.0,1.0,0.6, Lang:t('info.respawn_txt', {deathtime = math.ceil(deathTime)}), 255, 255, 255, 255)
  else
    DrawTxt(0.865, 1.44, 1.0, 1.0, 0.6, Lang:t('info.respawn_revive', {holdtime = hold, cost = Config.BillCost}), 255, 255, 255, 255)
  end
end
```
To:
```lua
if not isInHospitalBed then
  if deathTime > 0 then
    SendNUIMessage({
      status = 'open',
      type = 'death',
      timer = deathTime,
      msg1 = 'RESPAWNA OM: <font color="red">',
      msg2 = ' <font color="white">SEKUNDER',
    })
  else
    SendNUIMessage({
      status = 'open',
      type = 'deathrevive',
      cost = Config.BillCost,
      holdtime = hold,
      msg1 = 'HÅLL [<font color="red">E<font color="white">] I ',
      msg2 = ' SEKUNDER FÖR ATT RESPAWNA FÖR <font color="green">',
    })
  end
end
```

Then go down to row 178 and change:
```lua
if LaststandTime > Laststand.MinimumRevive then
	DrawTxt(0.94, 1.44, 1.0, 1.0, 0.6, Lang:t('info.bleed_out', {time = math.ceil(LaststandTime)}), 255, 255, 255, 255)
else
	DrawTxt(0.845, 1.44, 1.0, 1.0, 0.6, Lang:t('info.bleed_out_help', {time = math.ceil(LaststandTime)}), 255, 255, 255, 255)
	if not emsNotified then
        	DrawTxt(0.91, 1.40, 1.0, 1.0, 0.6, Lang:t('info.request_help'), 255, 255, 255, 255)
        else
                DrawTxt(0.90, 1.40, 1.0, 1.0, 0.6, Lang:t('info.help_requested'), 255, 255, 255, 255)
        end

        if IsControlJustPressed(0, 47) and not emsNotified then
        	TriggerServerEvent('hospital:server:ambulanceAlert', Lang:t('info.civ_down'))
                emsNotified = true
        end
end
```
To:
```lua
if LaststandTime > Laststand.MinimumRevive then
	SendNUIMessage({
        	status = 'open',
                type = 'knockdown',
                time = math.ceil(LaststandTime),
                msg = Lang:t('info.bleed_out', {time = math.ceil(LaststandTime)})
	})
else
	SendNUIMessage({
        	status = 'open',
                type = 'knockdown',
                time = math.ceil(LaststandTime),
                msg = Lang:t('info.bleed_out_help', {time = math.ceil(LaststandTime)})
	})
end
```

# Credits
Bits of code taken from some old resource I had laying around. An ID-Card resource tbh which just gave me the boilerplate for the javascript part!
