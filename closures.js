//prérequis
var maVariable = "Je suis une variable saine";

//fonctions, variables et portée
var destination = "Mars";
var setOrigine = function (planete) {
	var satellite = "la Lune";
    console.log("Nous venons de la " + planete + ". Et nous allons sur " + destination);
};
setOrigine("la Terre");
console.log("type des variables:", typeof destination, typeof planete, typeof satellite);

//une derniere subtilié
var maFonction1 = function () {
    return function (x) { console.log(x); };
};
var nouvelleFonction = maFonction();//stocke la nouvelle fonction
nouvelleFonction("y");//execute la fonction (affiche "y" dans la console)

var maFonction2 = function (func, arg) { 
    func(arg);//excute la fonction donnée en param, en lui donnant l'argument donné en param
};
maFonction2(function (a) { console.log(a); }, "bonjour");//affiche "bonjour"

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

//parceque fermerture
var planetes = ["la Terre", "Mars", "Venus", "Pluton"];
var memorisePlanete = function (index) {
    return function () {//l'"index" donné restera stocké en mémoire
        console.log("Cette planete est", planetes[index]);
    };
};
for (var i = 0; i <= 2; i++) {  
    var btn = creerBouton(planetes[i]);
    var logPlaneteMemorisee = memorisePlanete(i);//CETTE valeur de i est enfermée dans CE contexte
    btn.onclick = logPlaneteMemorisee;//la fonction retournée s'execute au click, donc pas de ().
}

//un autre ecueil, le setTimeout
for (var i = 0; i <=3; i++) {
    var millisecondes = i*1000;
    setTimeout(function ()  {
        if (i < 3) {
            console.log(i + 1);
        }
        else {
            console.log("Décollage vers Mars !");
        }
    }, millisecondes);
}
var memoriserCompteur = function (compteur)  {
    return function () {
        if (compteur <= 3) {
            console.log(compteur);
        }
        else {
            console.log("Décollage vers Mars !");
        }
    };
};
for (var i = 1; i <= 4; i++) {
    var millisecondes = i*1000;
    setTimeout(memoriserCompteur(i), millisecondes);
}


//le contexte d'execution
var planete4 = "Pluton"; 
var logPlanetes = function (planete2, planete3) {
    var planete1 = "la Terre";
    console.log(planete1, planete2, planete3, planete4, typeof planete5);
};
logPlanetes("Mars", "Venus");


var ExecutionContext = {
    Variables: ["planete1", "planete2", "planete3", "planete4", "planete5"], // découvertes en parsant   
    Activation: {
        locales: {"planete1": planete1}, // variables déclarées à même la fonction
        arguments:  { //passées en paramètres
            "planete2": planete2,
            "planete3": planete3, 
            length:2, 
            callee: "logPlanetes"
        }, 
        contexte: {"planete4": planete4} //découvertes dans le Scope  
    }, 
    Scope: [this.Activation, this.parent.Activation, this.parent.parent.Activation, "etc..."],   

    finalVariables: { //et finalement...    
        planete1: undefined, //en attendant l'assignation, puis "la Terre"
        planete2: "Mars",//grace aux paramètres
        planete3: "Venus",//grace aux paramètres
        planete4: "Pluton",//grace au parent (ici la globale "window")
        planete5: undefined, //indefini car trouvé nulle part: ni dedans, ni dans args, ni dans parents
        this: window//d'autres choses sont déterminées dans ce contexte, comme la valeur de "this"
    }
};



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
    return function () {
        maFonctionAnonyme();
    };
};
var partirSurMars = maFonction(function () {
    console.log("Nous partons sur Mars !");
});
partirSurMars();

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
