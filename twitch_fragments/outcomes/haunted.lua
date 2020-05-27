-- Haunted!
-- Good'ol temporal curse
-- bad
-- 20
-- todo
function twitch_haunted()
    local from_avove = false
    if Random(0, 1) > 0 then from_avove = true end
    spawn_something("data/entities/animals/ghost.xml", 140, 140, from_avove,
                    true, function(entity_ghost)
        local player = get_player()
        if player ~= nil then
            edit_all_components(entity_ghost, "GhostComponent", function(comp,
                                                                         vars)
                vars.mEntityHome = player
                vars.speed = 30
                EntityAddComponent( entity_ghost, "LifetimeComponent", {
                    lifetime = "3600"
                } )
            end)
        end
    end)
end