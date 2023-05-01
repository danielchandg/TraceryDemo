class Scene{
  // List of paragraphs
  // text color
  // Background color
  constructor(paragraphs, background_color = "#000000"){
    this.start = paragraphs.slice(0, paragraphs.length - 1);
    this.end = paragraphs[paragraphs.length - 1];
    this.background_color = background_color;
  }
  // Load this scene
  async load(){
    if(this.start[0] === "img"){
      var res = `<img src=./${this.end} width="600">`;
      var res2 = this.start.length > 1 ? this.start[1] : "next";
      var res3 = "";
      var ops = [1];
    }
    else{
      var res = [];
      var ops = this.end.split('\\');
      var res2 = ops[0];
      var res3 = ops.length > 1 ? ops[1] : "";

      this.start.forEach((p) => { res += "<p>" + p + "</p>"; });
    }

    for(let i=100; i>=0; i--){
      document.getElementById("story").style.opacity = i / 100;
      document.getElementById("next").style.opacity = i / 100;
      document.getElementById("next2").style.opacity = i / 100;
      await new Promise(r => setTimeout(r, 0.5));
    }

    document.getElementById("story").innerHTML = "";
    document.getElementById("next").innerHTML = "";
    document.getElementById("next2").innerHTML = "";
    if(ops.length == 1){
      document.getElementById("next").style.width="600px";
    }
    else{
      document.getElementById("next").style.width="290px";
    }

    await new Promise(r => setTimeout(r, 800));

    document.getElementById("story").innerHTML = res;
    console.log(document.getElementById("story").innerHTML);
    
    for(let i=0; i<=100; i++){
      document.getElementById("story").style.opacity = i / 100;
      await new Promise(r => setTimeout(r, 2));
    }

    await new Promise(r => setTimeout(r, 300));

    document.getElementById("next").innerHTML = res2;
    document.getElementById("next2").innerHTML = res3;
    
    for(let i=0; i<=100; i++){
      document.getElementById("next").style.opacity = i / 100;
      document.getElementById("next2").style.opacity = i / 100;
      await new Promise(r => setTimeout(r, 4));
    }
  }
}

class Firewatch{
  // List of scenes
  constructor(){
    this.scenes = [];
  }
  add(paragraphs, background_color = "#FF0000"){
    this.scenes.push(new Scene(paragraphs, background_color));
  }
  // Load the scene with index i
  async load(i){
    document.getElementById('next').setAttribute('onclick', '');
    document.getElementById('next2').setAttribute('onclick', '');
    await this.scenes[i].load();
    let next = (i + 1) % this.scenes.length;
    document.getElementById('next').setAttribute('onclick', 'firewatch.load(' + next + ')');
    document.getElementById('next2').setAttribute('onclick', 'firewatch.load(' + next + ')');
  }
}

let firewatch = new Firewatch;

async function init(){

  function gen(scene){
    return grammars.GenerationSimple(Object.assign({}, base_data, scene)).split('|');
  }

  let food = ["bread", "cheese", "fries", "grapes", "pie", "cake", "cookies", "grilled cheese", "pretzels"];
  let favorite_food = food[Math.floor(Math.random()*food.length)];
  let hobbies = [["draw", "drawing", "sketchbook"], ["paint", "painting", "paintbrushes"], ["dance", "dancing", "dancing shoes"], ["cook", "cooking", "recipe book"], ["write", "writing", "novel"], ["rock climb", "rock climbing", "climbing gear"], ["run", "running", "running shoes"], ["cycle", "cycling", "mountain bike"]];
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
    "pickupLines1": ["\"So... you like #food#?\"", "\"So what's your favorite, you know, #food#?\""],
    "pickupLines2": ["\"So... what's your, you know, major?\"", "\"You... you're pretty.\"", "\"Shouldn't you be at #richPlace#?\""],
    "pickupReplies": ["\"You're pretty,\"", "\"Can I buy you a drink?\""],
    "positivePropositional": ["from the nearby #richPlace#", "radiant with #positiveAdjective# energy", "holding a wine glass", "wearing a blue suit", "giving off a #positiveAdjective# air", "back from #richPlace#", "holding an expensive purse", "looking very #positiveAdjective#", "the opposite of #negativeAdjective#"],
    "aboutJulia": ["drives you absolutely nuts", "is very #positiveAdjective#", "would fit in at #richPlace#", "looks fresh from #richPlace#", "is out of your league", "steals your heart", "captivates you", "prioritizes you over all her #friends#", "is the opposite of #negativeAdjective#"],
    "aboutHenry": ["are #negativeAdjective#", "are just plain old Henry", "are a future hangover", "are the opposite of #positiveAdjective#", "have no redeeming qualities", "came from #poorPlace#", "have no #friends#", "are objectively unattractive", "are not #good#", "don't know how to talk to girls"],
    "favoriteFood": [favorite_food],
    "hobby": [hobby[0]],
    "hobbying": [hobby[1]],
    "hobbyItem": [hobby[2]],
    "season": ["summer", "winter", "fall", "spring"]
  };
  let scene1 = {
    "origin": ["#scene1a#|#scene1b#|#scene1c#"],
    "descJulia": ["#positivePropositional#", "#talking# with #friends# #positivePropositional#", "sitting with some #friends# enjoying #food#", "looking like she #aboutJulia#"],
    "scene1a": ["She's #descJulia#.", "She's #descJulia#. #descJulia.capitalize#."],
    "scene1b": ["You, Henry, #aboutHenry#."],
    "scene1c": ["You turn around. It's her.", "You take a seat next to her.", "You approach her.", "You tap her shoulder."]
  };
  let scene2 = {
    "origin": ["#scene2a#|#pickupLines1#\\#pickupLines2#"],
    "scene2a": ["You #aboutHenry#."],
  };
  let scene3 = {
    "origin": ["#scene3a#|#scene3b#|#scene3c#|#scene3d#"],
    "coolly": ["calmly", "coolly", "smoothly"],
    "scene3a": ["#pickupReplies# she says #coolly#."],
    "scene3b": ["You are confused.", "You #aboutHenry#.", "You are already #inLove#.", "\"What,\" you reply, confused."],
    "scene3c": ["\"Someone should buy you some #favoriteFood#,\" she says. She flags down a waiter.", "\"I heard there's a place nearby with the best #favoriteFood# in town,\" she says.", "\"I heard the #favoriteFood# here is pretty good,\" she says. She flags down a bartender."],
    "scene3d": ["#time.capitalize# later you are Julia's boyfriend."]
  };
  let scene4 = {
    "origin": ["#scene4a#|#scene4b#"],
    "scene4a": ["You date for #time#."],
    "scene4b": ["She #aboutJulia#. It's #good#.", "She #aboutJulia#. #aboutJulia.capitalize#."]
  }
  let scene5 = {
    "origin": ["#scene5a#|#scene5b#|#scene5c#"],
    "aHome": ["a home", "an apartment", "a studio"],
    "near": ["near", "next to"],
    "scene5a": ["You move in. You share #aHome# #near# the #richPlace# with a view of the mountains. You two eat #favoriteFood# out on the deck."],
    "scene5b": ["You eat #favoriteFood# just about anywhere."],
    "scene5c": ["Life is #good#."]
  }
  let scene6 = {
    "origin": ["#scene6a#|#scene6b#|#scene6c#|#scene6d#"],
    "scene6a": ["<strong>1980</strong>"],
    "scene6b": ["It's date night.", "It's a Thursday night.", "It's your anniversary dinner.", "It's your birthday dinner."],
    "scene6c": ["Julia doesn't come. She doesn't call. You're feeling more #negativeAdjective# by the minute.", "Julia is #shortTime# late. You're feeling more #negativeAdjective# by the minute.", "Julia is #shortTime# late. She doesn't come. She doesn't call.", "Julia is #shortTime# late. She doesn't come. She doesn't call. You're feeling more #negativeAdjective# by the minute."],
    "scene6d": ["You fall asleep before she gets home.", "You're too upset to wait for her.",  "She gets home after you've gone to bed."]
  }
  let scene7 = {
    "origin": ["#scene7a#|#fight1#\\#fight2#"],
    "havingFun": ["having a #good# time", "#talking# with her close #friends#"],
    "fight1": ["You get mad."],
    "fight2": ["You ignore her."],
    "youFight": ["You fight when she gets between the sheets.", "You call her #negativeAdjective#.", "You demand to know where she's been."],
    "scene7a": ["She's not quite #negativeAdjective# but she's clearly been #havingFun#. #youFight#"],
  }
  let scene8 = {
    "origin": ["#scene8a#|#scene8b#|#scene8c#|#scene8d#"],
    "youFight2": ["You don't touch each other all night.", "You avoid her all night.", "You turn away from her all night."],
    "scene8a": ["#youFight2#"],
    "scene8b": ["The next day you feel guilty for being so angry. You ask about her evening. She says it was #good#.", "The next day you feel guilty for being so mad. You offer to spend some time with her #hobbying#."],
    "scene8c": ["", "You hold onto a tiny pill of resentment.", "You are not sure whether you believe her.", "You think she is lying.", "You hold onto a tiny pill of resentment. You are not sure whether you believe her.", "You hold onto a tiny pill of resentment. You think she is lying."],
    "scene8d": ["You fix some #food# and go to work."]
  }
  let scene9 = {
    "origin": ["#scene9a#|#scene9b#|#scene9c#|#op1#\\#op2#"],
    "scene9a": ["<strong>1981</strong>"],
    "scene9b": ["Julia still likes to #hobby#."],
    "juliaHobby": ["She #hobby#s with you.", "She tries to get you to #hobby# with her.", "She likes #hobbying# things from her research.", "She #hobby#s whenever she can.", "She says she was born to #hobby#."],
    "scene9c": ["#juliaHobby# #juliaHobby#"],
    "op1": ["Julia was right: You are very #positiveAdjective#."],
    "op2": ["She #aboutJulia#.", "You are #inLove#."]
  }
  let scene10 = {
    "origin": ["#scene10a#|#scene10b#"],
    "scene10a": ["<strong>1982</strong>"],
    "scene10b": ["During the #season#s, you and Julia enjoy walking at night."]
  }
  let scene11 = {
    "origin": ["#scene11a#|#scene11b#"],
    "festival": ["festival", "rock climbing tournament", "art exhibit", "cultural celebration", "farmer's market"],
    "scene11a": ["There's a #festival# in town. It brings in people from faraway places.", "The annual #festival# is in town. It brings in people from faraway places.", "You and Julia visit the #festival# in town. It brings in people from faraway places."],
    "scene11b": ["One of them tries to pickpocket Julia.", "One of them tries to mug you with a knife.", "One of them points a gun at you.", "One of them threatens Julia."]
  }
  let scene12 = {
    "origin": ["#scene12a#|#scene12b#|#attack1#\\#attack2#"],
    "syllable": ["he-", "h..", "hoo-", "ha-", "hen-"],
    "yelp": ["#syllable.capitalize##yelp#", "#syllable##yelp#", "Henry!"],
    "scene12a": ["\"#yelp#\" Julia yells. She gets flustered and has trouble speaking when she is #negativeAdjective#."],
    "scene12b": ["You confront the attacker."],
    "attack1": ["You scare him away.", "You reach into your pocket like you've got a gun.", "You unleash a bloodthirsty warcry."],
    "attack2": ["You beat his goddamn face in.", "You threaten to kill him.", "You send a vicious uppercut to his jaw."]
  }
  let scene13 = {
    "origin": ["#scene13a#|#scene13b#|#scene13c#|#scene13d#"],
    "youAttack": ["You scare him away.", "You beat his goddamn face in.", "You reach into your pocket like you've got a gun.", "You threaten to kill him.", "You unleash a bloodthirsty warcry.", "You send a vicious uppercut to his jaw."],
    "scene13a": ["#youAttack# You manage to scare Julia. He runs away."],
    "scene13b": ["Julia asks to take a different path from that day forward."],
    "youApologize": ["You say okay.", "You don't want to go that way either.", "You agree to change your ways.", "You apologize for being #negativeAdjective#.", "You promise to be #positiveAdjective#."],
    "scene13c": ["", "#youApologize#", "#youApologize# #youApologize#"],
    "scene13d": ["From then on you walk by the river."]
  }
  let scene14 = {
    "origin": ["#scene14a#|#scene14b#|#scene14c#"],
    "scene14a": ["<strong>1989</strong>"],
    "ugly": ["Things get ugly.", "Things escalate out of control.", "Things got violent.", "Next thing you know, there's blood everywhere."],
    "scene14b": ["One day you get into an argument with a coworker. #ugly#", "One day you are stopped at a DUI checkpoint. You blow a .10.", "One day you get cut off in traffic. You step out to give the guy a piece of your mind. #ugly#", "One day you have \"an episode\" at work. #ugly#"],
    "scene14c": ["You are taken to jail for the night."]
  }
  let scene15 = {
    "origin": ["#scene15a#|#scene15b#|#scene15c#|#scene15d#"],
    "scene15a": ["Julia's parents take the next plane from Australia. They tell you Julia is coming to live with them."],
    "scene15b": ["You don't argue. You say you'll visit soon."],
    "scene15c": ["#time.capitalize# goes by."],
    "scene15d": ["Summer is coming and you see an ad in the paper for a job."]
  }
  let scene16 = {
    "origin": ["You take it."]
  }
  let scene17 = {
    "origin": ["The end|..."]
  }

  firewatch.add(["You see Julia."]);
  firewatch.add(gen(scene1));
  firewatch.add(gen(scene2));
  firewatch.add(gen(scene3));
  firewatch.add(["img", "firewatch1.jpg"]);
  firewatch.add(gen(scene4));
  firewatch.add(gen(scene5));
  firewatch.add(["img", "firewatch2.webp"]);
  firewatch.add(gen(scene6));
  firewatch.add(gen(scene7));
  firewatch.add(gen(scene8));
  firewatch.add(gen(scene9));
  firewatch.add(["img", "firewatch3.webp"]);
  firewatch.add(gen(scene10));
  firewatch.add(gen(scene11));
  firewatch.add(gen(scene12));
  firewatch.add(gen(scene13));
  firewatch.add(["img", "...", "firewatch4.png"]);
  firewatch.add(gen(scene14));
  firewatch.add(gen(scene15));
  firewatch.add(gen(scene16));
  firewatch.add(gen(scene17));
  firewatch.add(["img", "Restart", "firewatch5.png"]);

  let intro = new Scene(["Boulder, Colorado", "<strong>1975</strong>"]);
  document.getElementById('next').setAttribute('onclick', '');
  document.getElementById('next2').setAttribute('onclick', '');
  intro.load();
  await new Promise(r => setTimeout(r, 5000));
  firewatch.load(0);
}