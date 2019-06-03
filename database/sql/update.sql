UPDATE uco1ghsbd36ms17y.Anims
SET
url = replace(url, 'Gerik', 'Caellach'),
name = replace(name, 'Gerik', 'Caellach'),
dlName = replace(dlName, 'Gerik', 'Caellach')
WHERE
id = 144;

UPDATE uco1ghsbd36ms17y.Weapons
SET
gif = replace(gif, 'Gerik', 'Caellach'),
still = replace(still, 'Gerik', 'Caellach')
WHERE
id in (362, 363);

UPDATE uco1ghsbd36ms17y.AnimWepIms
SET
weapon = replace(weapon, '8', 'Unarmed')
WHERE
AnimId=956 and WeaponId=2581;
