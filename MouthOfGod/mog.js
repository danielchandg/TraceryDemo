
let game_state = {}
  game_state.soldiers = 23000;
  game_state.dead = 0;
  game_state.reports = ["No battles have occured"];
  game_state.allignment = 256;

function render_game_state(gs){
  document.getElementById("soldiercount").innerHTML = gs.soldiers
  document.getElementById("deadcount").innerHTML = gs.dead
  gs.allignment = Math.round((gs.soldiers - gs.dead) / (gs.soldiers + gs.dead) * 256);
  if (gs.allignment < 0) gs.allignment = 0;
  let av = gs.allignment.toString(16);
  if (av.length == 1)
    av = "0" + av;
  
  //console.log(av)
  //document.getElementById("mouth_display").style.backgroundColor = "#ff" + gs.allignment.toString(16) + gs.allignment.toString(16);
  document.getElementsByTagName("body")[0].style.backgroundColor = "#ff" + av + av;
  
  //console.log( "#ff" + gs.allignment.toString(16) + gs.allignment.toString(16) ) 
  document.getElementById("battle_report").innerHTML = gs.reports[gs.reports.length-1]
}

function trigger_eclipse(){
  document.getElementById("eclipse").style.visibility = "visible";
}

function next_round(gs){
  gs.soldiers += 2300;
  render_game_state(game_state)
}

function run_battle_sim (gs){
  if (gs.dead > gs.soldiers){
      trigger_eclipse()
  }
  else {
    battle_object = {
      a_skill: Number(document.getElementById("a_skill").value),
      d_skill: Number(document.getElementById("d_skill").value),
      a_agg: Number(document.getElementById("a_agg").value),
      d_agg: Number(document.getElementById("d_agg").value),
      a_sold: Number(document.getElementById("a_sold").value),
      d_sold: Number(document.getElementById("d_sold").value),
      river: document.getElementById("river").checked,
      forts: Number(document.getElementById("forts").value)
    }
    //console.log(battle_object);
    let river = 0
    if (battle_object.river === true)
      river = 2;
    
    let skill_check = Math.ceil(Math.random()*7) - 4 + battle_object.a_skill - battle_object.d_skill - battle_object.forts - river;
    //console.log(Math.ceil(Math.random()*7) - 4 , battle_object.a_skill , battle_object.d_skill , battle_object.forts , river);
    let death_toll_multiplier = 1 + (battle_object.a_agg/100) + (battle_object.d_agg/100);
    
    let fallen_a = 0;
    let fallen_d = 0;
    let smaller_force = Math.min(battle_object.a_sold, battle_object.d_sold);
    //console.log(battle_object.a_sold, battle_object.d_sold, smaller_force)
    if (skill_check == 0)
    {
    fallen_a = Math.floor((smaller_force*0.33) * death_toll_multiplier)  
    fallen_d = Math.floor((smaller_force*0.33) * death_toll_multiplier);
    }
    if (skill_check > 0)
    {
    fallen_a = Math.floor((smaller_force*0.15) * death_toll_multiplier)  
    fallen_d = Math.floor((smaller_force*0.40) * death_toll_multiplier);
    }
    if (skill_check > 3)
    {
      fallen_a = Math.floor((smaller_force*0.15) * death_toll_multiplier)  
      fallen_d = Math.floor((smaller_force*0.40) * death_toll_multiplier);
    }
    if (skill_check > 5)
    {
      fallen_a = Math.floor((smaller_force*0.05) * death_toll_multiplier)  
      fallen_d = Math.floor((smaller_force*0.60) * death_toll_multiplier);
    }
    if (skill_check < 0)
    {
    fallen_a = Math.floor((smaller_force*0.40) * death_toll_multiplier)  
    fallen_d = Math.floor((smaller_force*0.15) * death_toll_multiplier);
    }
    if (skill_check < -3)
    {
      fallen_a = Math.floor((smaller_force*0.40) * death_toll_multiplier)  
      fallen_d = Math.floor((smaller_force*0.15) * death_toll_multiplier);
    }
    if (skill_check < -5)
    {
      fallen_a = Math.floor((smaller_force*0.60) * death_toll_multiplier)  
      fallen_d = Math.floor((smaller_force*0.05) * death_toll_multiplier);
    }
    if (fallen_a > battle_object.a_sold)  fallen_a = battle_object.a_sold;
    if (fallen_d > battle_object.d_sold)  fallen_d = battle_object.d_sold;
    
    //console.log(fallen_a, fallen_d, skill_check, death_toll_multiplier, smaller_force)
    
    gs.soldiers -= (fallen_a + fallen_d);
    gs.dead += (fallen_a + fallen_d);
    
    let report = generate_battle_report(skill_check, (fallen_a / battle_object.a_sold), (fallen_d / battle_object.d_sold), forts, river, gs.allignment)
   
    report += "<br> Attackers lost " + fallen_a + " soldiers." + "<br> Defenders lost " + fallen_d + " soldiers." 
    
    gs.reports.push(report)
   
    render_game_state(game_state)
  }
}

function generate_battle_report(skill_check, a_loss_percent, d_loss_percent, forts, river, allignment){
  console.log(allignment)
  result = ""
  
  // commander skill contribution   river and fort conditionals
  skill_check_data = {
    "attacker_learn": ["","#caught# by the defenders #acumen#, the attacking commander learns to to act with more wisdom #increase# Skill. +1 Shame"],
    "defender_learn":["", "#caught# by the Attackers #acumen#, the defending commander learns to to act with more wisdom #increase# Skill. +1 Shame"],
    "increase": ["+1", "+2"],
    "caught" : ["Caught off guard", "Shocked", "Baffled", "Horrified"],
    "acumen": ["brilliance", "acumen", "cunning", "expertise", "logistical skill", "tactics"],
    "attackers"                   : ["aggresors", "invaders", "liberators", "attacking force", "instiging force"],
    "defenders"                   : ["protectors", "guardians", "defenders", "shielding force", "holders"],
    "battle"                      : ["battle", "fight", "brawl", "melee", "contest"],
    "origin"    : ""
  }
  //console.log(allignment)
  if (skill_check > 5) skill_check_data.origin += "The attacking commander demonstrates extreme skill. They gain 1 Glory."
  if (skill_check < -5) skill_check_data.origin += "The defending commander demonstrates extreme skill. They gain 1 Glory."
  if (skill_check > 0) skill_check_data.origin += "The #battle# goes to the #attackers#. The #defenders# must retreat to an adjacent province with their commander."
  if (skill_check < 0) skill_check_data.origin += "The #battle# goes to the #defenders#. The #attackers# must retreat to the province they attacked from with their commander."
  
  if (skill_check > 3) skill_check_data.origin += " #defender_learn#";
  if (skill_check <-3) skill_check_data.origin += " #defender_learn#";

  
  
  result += "<br>" + grammars.GenerationSimple(skill_check_data)
  
// how bloody the fighting is it is
  bloody_data = {
    "destroyed"                   : ["are absolutely eradicated", ". . . none of them. None of them survive.", ". . .not even one escapes"],
    "commander_tragedy"           : ["dies on the field of battle", "gains 2 shame but is kept alive", "is executed for their failure on return to their king", "escapes with a wounded #body_part#", "escapes with a destroyed #body_part#", "gains 2 shame and a vendetta against the attacking commander. This means they will attack a territory with alla avaialble troops if they have the chance"],
    "body_part"                   : ["leg", "eye", "arm", "hand", "lung", "shoulder"],
    
    "attacking_suffer_few"        : ["", "For the #attackers#, this is a cake walk.", "Easy conquest."],
    "attacking_suffer_moderate"   : ["", "It cost a #body_part# and a #body_part#, but was worth it."],
    "attacking_suffer_many"       : ["", "No soldier came out today without losing a dear friend.", "So much death, what was it for."],
    "attacking_destroyed"         : ["", "The #attackers# #destroyed#. The attacking commander #commander_tragedy#. The defending commander gains 1 glory."],
    "attackers"                   : ["aggresors", "invaders", "liberators", "attacking force", "instiging force"],
    
    
    "river_clean"                 : ["", "Despite the disadvantage of attacking over river, few bodies end up in the drink.", "The fish are going hungry tonight.", "The invaders enjoy clean baths after the battle. "],
    "river_red"                   : ["", "The river runs red with blood.", "Fish nibble on corpses in the night.", "Peasants would write notices of complaint for the bodies found in their farm water down river."],

    "defending_suffer_few"        : ["", "The #attackers# are easily repulsed." ],
    "defending_suffer_moderate"   : ["", "Battered and beaten the #defenders# look to the future."],
    "defending_suffer_many"       : ["", "The majority of #defenders# are wounded and struggle to recover."],
    "defending_destroyed"         : ["", "The #defenders# #destroyed#. The defending commander #commander_tragedy#. The attacking commander gains one glory. #bonus#"],
    "bonus"                       : ["","", "The attacking commander may make another action after casualties are resolved."],
    "defenders"                   : ["protectors", "guardians", "defenders", "shielding force", "holders"],
    
    
    "fort_strong"                 : ["", "The forts hold strong.", "The forts effectively protect the defenders.", ""],
    "fort_fail"                   : ["", "The rampart walls will take a while to clean off.", "Walls don't bleed, but bodies do."],
    "origin"                      : ""
  }
  
  
  //console.log(allignment)
  if (0.3 > a_loss_percent)
    bloody_data.origin+=(["#attacking_suffer_few#"])
  else if (0.6 > a_loss_percent)
    bloody_data.origin+=(["#attacking_suffer_moderate#"])
  else if (1 > a_loss_percent)
    bloody_data.origin+=(["#attacking_suffer_many#"])
  else
    bloody_data.origin+=(["#attacking_destroyed#"])
  
  if (0.6 > a_loss_percent && river)
    bloody_data.origin+=([" #river_clean#"])
  else if (0.6 > a_loss_percent && river)
    bloody_data.origin+=([" #river_red#"])
  
  if (0.3 > d_loss_percent)
    bloody_data.origin+=([" #defending_suffer_few#"])
  else if (0.6 > d_loss_percent)
    bloody_data.origin+=([" #defending_suffer_moderate#"])
  else if (1 > d_loss_percent)
    bloody_data.origin+=([" #defending_suffer_many#"])
  else
    bloody_data.origin+=([" #defending_destroyed#"])
  
  if (0.6 > a_loss_percent && forts)
    bloody_data.origin+=([" #fort_strong#"])
  else if (0.6 > a_loss_percent && forts)
    bloody_data.origin+=([" #fort_fail#"])
  
  
  
  result += "<br>" + grammars.GenerationSimple(bloody_data)
  
// doom sneaks
  doom_data = {
    "bad_omen"      : ["Soldiers on the winning side find many of their #gear# missing", "An unusal number of #pests# unsettles the cleanup crew.",  "Something is wrong with the heavens: #astrological error#"],
    "worse_omen"    : ["Corpses are found withered and dry after the battle.", "Soldiers find #pests# in #food# as they try to make for themselves a victory feast.", "The bloodstains on #gear# don't seem to be going away, even after a good cleaning."],
    "terrible_omen" : ["Soldiers are seeing the corpses being carried away be #pests# in the middle of the night.", "Blood red #flowers# take over the battlefied overnight, apparently consuming the bodies of the dead.", "The earth opens up as if to eat the remaining armies."],
    "flowers": ["tulips", "violets", "dandelions", "ferns", "poppies"],
    "gear"          : ["weapons", "rations", "shovels", "bandages", "knives", "hair", "codpieces"],
    "astrological error" : ["folk are having trouble find the moon.", "astronomers are finding their math askew.", "birds are flying in the wrong direction this season."],
    "food"          : ["camp rations", "fresh rations", "surrounding crops", "nearby fruit trees", "local wheat fields", "local food stores"],
    "pests"         : ["flies", "geckos", "worms", "maggots", "scorpions", "snakes", "spiders", "tapeworms"],
    "origin"    : [""]
  }
  //console.log(allignment)
  if (allignment < 200)
    doom_data.origin=(["#bad_omen#"])
  if (allignment < 150)
    doom_data.origin=["#worse_omen#","#worse_omen#","#bad_omen#",]
  if (allignment < 100)
    doom_data.origin = ["#terrible_omen#", "#terrible_omen#", "#worse_omen#"] 
  result += "<br>" + grammars.GenerationSimple(doom_data)
  //console.log(doom_data, grammars.GenerationSimple(doom_data))
  //console.log(result)
  
  return result

}
   