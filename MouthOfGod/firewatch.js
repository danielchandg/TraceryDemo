class Scene{
  // List of paragraphs
  // text color
  // Background color
  constructor(paragraphs, text_color = "#FFFFFF", background_color = "#FF0000"){
    this.start = paragraphs.slice(0, paragraphs.length - 1);
    this.end = paragraphs[paragraphs.length - 1];
    this.text_color = text_color;
    this.background_color = background_color;
  }
  // Load this scene
  async load(){
    let res = [];
    let res2 = "<p>" + this.end + "</p>";

    this.start.forEach((p) => { res += "<p>" + p + "</p>"; });
    document.getElementById("story").innerHTML = "";
    document.getElementById("next").innerHTML = "";
    await new Promise(r => setTimeout(r, 1600));
    document.getElementById("story").innerHTML = res;
    await new Promise(r => setTimeout(r, 1000));
    document.getElementById("next").innerHTML = res2;
  }
}

class Firewatch{
  // List of scenes
  constructor(){
    this.scenes = [];
  }
  add(paragraphs, text_color = "#FFFFFF", background_color = "#FF0000"){
    this.scenes.push(new Scene(paragraphs, text_color, background_color));
  }
  // Load the scene with index i
  load(i){
    this.scenes[i].load();
    let next = (i + 1) % this.scenes.length;
    document.getElementById('next').setAttribute('onclick', 'firewatch.load(' + next + ')');
  }
}

let firewatch = new Firewatch;

function init(){

  function gen(scene){
    return grammars.GenerationSimple(Object.assign({}, base_data, scene)).split('|');
  }

  let food = ["bread", "cheese", "fries", "grapes", "pie", "cake", "cookies", "grilled cheese", "pretzels"];
  let favorite_food = food[Math.floor(Math.random()*food.length)];
  let hobbies = [("draw", "drawing", "sketchbook"), ("paint", "painting", "paintbrushes"), ("dance", "dancing", "dancing shoes"), ("cook", "cooking", "recipe book"), ("write", "writing", "novel"), ("rock climb", "rock climbing", "climbing gear"), ("run", "running", "running shoes"), ("cycle", "cycling", "mountain bike")];
  let hobby = hobbies[Math.floor(Math.random()*hobbies.length)];
  let base_data = {
    "friends": ["old friends", "professors", "grad students", "pals", "buddies", "companions", "mates"],
    "talking": ["laughing", "sharing a drink", "talking"],
    "positiveAdjective": ["well-dressed", "friendly", "approachable", "charming", "welcoming", "well-mannered", "articulate", "well-spoken"],
    "negativeAdjective": ["drunk", "poor", "broken", "lost", "absent-minded", "mentally drained", "cold", "distant", "arrogant", "condescending"],
    "richPlace": ["CU Boulder", "grad school", "law school", "a gym", "a beach", "a volleyball court", "a romantic restaurant"],
    "poorPlace": ["a prison cell", "the hospital", "the train station", "Burger King", "a bathroom", "the zoo", "a thrift shop", "a grocery outlet"],
    "inLove": ["in love", "crazy over her", "captivated by her", "drawn to her energy", "addicted to her love"],
    "food": ["bread", "cheese", "fries", "grapes", "pie", "cake", "cookies", "grilled cheese", "pretzels"],
    "good": ["good", "great", "amazing", "fantastic", "otherworldly", "beautiful"],
    "time": ["over a year", "one week", "two weeks", "a few days", "a couple of months", "one year", "over a week"],
    "shortTime": ["four hours", "considerably", "over three hours", "two and a half hours"],
    "pickupLines": ["\"So... you like #food#?\"", "\"So... what's your, you know, major?\"", "\"So what's your favorite, you know, #food#?\"", "\"You... you're pretty.\"", "\"Shouldn't you be at #richPlace#?\""],
    "pickupReplies": ["\"You're pretty,\"", "\"Can I buy you a drink?\""],
    "positivePropositional": ["from the nearby #richPlace#", "radiant with #positiveAdjective# energy", "holding a wine glass", "wearing a blue suit", "giving off a #positiveAdjective# air", "back from #richPlace#", "holding an expensive purse", "looking very #positiveAdjective#", "the opposite of #negativeAdjective#"],
    "aboutJulia": ["drives you absolutely nuts", "is very #positiveAdjective#", "would fit in at #richPlace#", "looks fresh from #richPlace#", "is out of your league", "steals your heart", "captivates you", "prioritizes you over all her #friends#", "is the opposite of #negativeAdjective#"],
    "aboutHenry": ["are #negativeAdjective#", "are just plain old Henry", "are a future hangover", "are the opposite of #positiveAdjective#", "have no redeeming qualities", "came from #poorPlace#", "have no #friends#", "are objectively unattractive", "are not #good#", "don't know how to talk to girls"],
    "favoriteFood": [favorite_food],
    "hobby": [hobby[0]],
    "hobbying": [hobby[1]],
    "hobbyItem": [hobby[2]]
  };
  let scene1 = {
    "origin": ["#scene1a#|#scene1b#|#scene1c#"],
    "descJulia": ["#positivePropositional#", "#talking# with #friends# #positivePropositional#", "sitting with some #friends# enjoying #food#", "looking like she #aboutJulia#"],
    "scene1a": ["She's #descJulia#.", "She's #descJulia#. #descJulia.capitalize#."],
    "scene1b": ["You, Henry, #aboutHenry#."],
    "scene1c": ["You turn around. It's her.", "You take a seat next to her.", "You approach her.", "You tap her shoulder."]
  };
  let scene2 = {
    "origin": ["#scene2a#|#scene2b#"],
    "scene2a": ["You #aboutHenry#."],
    "scene2b": ["#pickupLines#"]
  };
  let scene3 = {
    "origin": ["#scene3a#|#scene3b#|#scene3c#|#scene3d#"],
    "coolly": ["calmly", "coolly", "smoothly"],
    "scene3a": ["#pickupReplies# she says #coolly#."],
    "scene3b": ["You are confused.", "You #aboutHenry#.", "You are already #inLove#.", "\"What,\" you reply, confused."],
    "scene3c": ["\"Someone should buy you some #favoriteFood#,\" she says. She flags down a waiter.", "\"I heard there's a place nearby with the best #favoriteFood# in town,\" she says.", "\"I heard the #favoriteFood# here is pretty good,\" she says. She flags down a bartender."],
    "scene3d": ["#time.capitalize# later you are Julia's boyfriend."]
  };

  firewatch.add(["Boulder, Colorado", "1975", "You see Julia."]);
  firewatch.add(gen(scene1));
  firewatch.add(gen(scene2));
  firewatch.add(gen(scene3));
  firewatch.load(0);
}





// this can live on this page or on a dedicate js for this page
function generate_love_story(){
  result = "<ol>"
  territory_data = {
    "name"      : ["#cap##syl#",  "#cap##syl##syl#",  "#cap##syl# #cap##syl#"],
    // sourve https://en.wikipedia.org/wiki/Provinces_of_Spain
    "cap"       : ["A", "Ala", "Alba", "Ali", "Alm", "Ast", "Ba", "Bal", "Bar", "Burg", "Can", "Cag", "Cac", "Cast", "Cord", "Ceuen", "Gran", "Gur", "Jan", "Lle", "Lu", "Ma", "Mur", "Na", "Pal", "Pont", "Pal", "San", "Tar", "Tole", "Val", "Zam", "Zar"],
    "syl"       : ["la", "va", "ba", "ve", "me", "ce", "ria", "rias", "cay", "lona", "gos", "seres", "lon", "dad", "do", "esca", "ga", "varre", "ra", "go", "na", "dis", "res", "coa", "ru", "turias"],
    "story"     : [": #simple#", "", "", "", "", "", "", ],
    "simple"    : ["They say all #entities# can be traced to this land.", "All #people group# agree this is a #descriptor# place.", "Known for its #descriptor# people.", "The local cuisine features #ingredient# heavily.", "The people here never eat #ingredient#.", "Many cults remain in this territory. They are #hated# for their heretical worship of a #symbol#."],
    "people group" : ["of its inhabitants", "visitors", "princesses", "merchants", "beekeepers", "soldiers"],
    "entities"  : ["heroes", "goblins", "horses", "raccoons", "devils", "wizards"],
    "descriptor": ["boring", "terrifying", "cursed", "robust", "genuine", "doomed", "glorious"],
    "ingredient": ["parsly", "venisin", "root vegetables", "cheese", "eggs", "sweet apples", "bread"],  
    "hated"     : ["despised", "hated", "hunted", "rejected"],
    "symbol"    : ["#color# #animal# eating #ingredient#", "#descriptor# #animal#"],
    "color"     : ["golden", "white", "brown", "red", "green", "blue", "black"],
    "animal"    : ["bear", "hound", "elephant", "whale", "dragon"],
    "origin"    : "#name##story#"
  }
  console.log(territory_data);
  for (let i = 0; i < 23; i++){
    result += "<li>" + grammars.GenerationSimple(territory_data) + "</li>";
  }
  result += "</ol>";
  console.log(result);
  document.getElementById("story").innerHTML = result;
}




