//la fonction la plus simple
var setOrigine = function (planete) {
    console.log("Notre planete d'origine est " + planete + ".");
};
setOrigine("la Terre");

//qu'entends-t-on par "closure"
var setOrigineAndGetVoyage = function (origine) {
    var voyagerVers = function (nouvellePlanete) {
        console.log("Nous vivons desormais sur " + nouvellePlanete);
        console.log("Mais nous venons de " + origine);
    };  
    return voyagerVers;
};
var demenager = setOrigineAndGetVoyage("la Terre");
demenager("Mars");


//pourquoi "fermeture"
var creerBouton = function (label) {
    btn = document.createElement("BUTTON");
    btn.appendChild(document.createTextNode(label));
    document.body.appendChild(btn);
    return btn;
};
var planetes = ["la Terre", "Mars", "Venus", "Pluton"];
for (var i = 0; i <= 2; i++) {  
    var btn = creerBouton(planetes[i]);
    btn.onclick = function () {
        console.log("Cette planete est", planetes[i]);
    };
}

//le contexte d'execution
var planete4 = "Pluton"; 
var logPlanetes = function (planete2, planete3) {
    var planete1 = "la Terre";
    console.log(planete1, planete2, planete3, planete4, typeof planete5);
};
logPlanetes("Mars", "Venus");

/*
var ExecutionContext = {
    localeVars: {"planete1": planete1}, // variables déclarées à même la fonction
    arguments:  {"planete2": planete2, "planete3": planete3, length:2, callee:logPlanetes}, //variables passée en paramètres
    contextVars: {"planete4": planete4}, //variables découvertes dans les fonctions parentes au moment l'excution de la fille, 
    allVarsUsed: ["planete1", "planete2", "planete3", "planete4", "planete5"], //variables découvertes en parsant la fonction

    //pour chaque variables utilisée dans la fonction (allVarsUsed), déterminer sa valeur à l'exécution:
    chosingVariables: function () {
        var self = this;
        this.allVarsUsed.forEach(function (varName) {
            return  self.localeVars[varName] || self["arguments"][varName] || self.parentVars[varName] || undefined;
        });
    },

    finalVariables: { //et finalement...    
        planete1: undefined, // en attendant l'assignation, puis "la Terre"
        planete2: "Mars",//grace aux paramètres
        planete3: "Venus",//grace aux paramètres
        planete4: "Pluton",//grace au parent (ici la globale "window")
        planete5: undefined, //indefini car trouvé nulle part: ni dedans, ni dans les arguments, ni dans les parents
        this: window//d'autres choses sont déterminées ici, comme "this"
    }
};
*/

var planetes = ["la Terre", "Mars", "Venus", "Pluton"];
var memorisePlanete = function (index) {
    return function () {//l'"index" donné restera stocké en mémoire en attendant l'exécution de cette fonction
        console.log("Cette planete est", planetes[index]);
    };
};
for (var i = 0; i <= 2; i++) {  
    var btn = creerBouton(planetes[i]);
    var logPlaneteMemorisee = memorisePlanete(i);//CETTE valeur de i est enfermée dans CE contexte d'execution unique, et persistant pour les fonctions filles
    btn.onclick = logPlaneteMemorisee;//attention, on veut que la fonction retournée s'execute au click, donc pas de ().
}


var planetes = ["la Terre", "Mars", "Venus", "Pluton"];
for (var i = 0; i <= 2; i++) {  
    var btn = creerBouton(planetes[i]);
    btn.onclick = (function (i) { //declaration de fonction dans une boucle = mauvaise pratique
        return function () {
            console.log("Cette planete est", planetes[i]);
        };
    })(i);
}

//partiales 1/2
var maFonction = function (maFonctionAnonyme) {
    maFonctionAnonyme();
};
maFonction(function () {
    console.log("Je suis une fonction lambda.");
});

var partiale = function (functionFinale, argument1) {
  return function(){//la fonction pourra rester sans arguments :
    return functionFinale(argument1);
  };
};

var rappelOrigine = function (origine, planeteActuelle) {
    console.log("Nous vivons sur " + planeteActuelle + ", mais notre planete d'origine est " + origine + ".");
};
rappelOrigine("la Terre", "Mars");
rappelOrigine.call(null, "la Terre", "Venus");
rappelOrigine.apply(null, ["la Terre", "Pluton"]);


var transformerArgsEnArray = function(args, nombreAIgnorer) {
    var resultat = [];
    for (var i = nombreAIgnorer; i < args.length; i++) {
        resultat.push(args[i]);
    }
    return resultat;
};
