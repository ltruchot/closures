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
var maFonction = function () {
    return function (x) { console.log(x); };
};
var nouvelleFonction = maFonction();//stocke la nouvelle fonction
nouvelleFonction("y");//execute la fonction (affiche "y" dans la console)


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
    var btn = document.createElement("BUTTON");
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

//Ah ouais, en fait c’est génial !
var planetes = ["la Terre", "Mars", "Venus", "Pluton"];
for (var i = 0; i <= 2; i++) {  
    var btn = creerBouton(planetes[i]);
    btn.onclick = (function (i) { //declaration de fonction dans une boucle = mauvaise pratique
        return function () {
            console.log("Cette planete est", planetes[i]);
        };
    })(i);
}

//un autre ecueil, le setTimeout
for (var i = 0; i <=3; i++) {
    var millisecondes = i*1000;
    setTimeout(function ()  {
        if (i < 3) {
            console.log(i + 1);
        }
        else {
            console.log("Go to Mars !");
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
var planete5 = "Neptune";
var playWithPlanete = (function () {
    var planete4 = "Pluton"; 
    var logPlanetes = function (planete2, planete3) {
        var planete1 = "la Terre";
        console.log(planete1,planete2,planete3,planete4,planete5, typeof planete6);
    };
    logPlanetes("Mars", "Venus");
})();
var ExecutionContext = {
    Variable: [planete1, planete2, planete3, planete4, planete5, planete6], // découvertes en parsant  
    Activation: {
        locales: [planete1], //déclarées à même la fonction
        arguments: [planete2, planete3],//passées en paramètres
        contexte: [planete4, planetes5] //découvertes dans le Scope 
    },
    Scope: [self.Activation, self.parent.Activation, self.parent.parent.Activation, "etc… jusqu’à window"],
    finalValues: { //et finalement...   
        planete1: undefined, //en attendant l'assignation, puis "la Terre"
        planete2: "Mars",//grace aux paramètres
        planete3: "Venus",//grace aux paramètres
        planete4: "Pluton",//grace au parent
        planete5: "Neptune", //grace au global "window"
        planete6: undefined, //indéfini car trouvé nulle part: ni dedans, ni dans args, ni dans parents
        this: window//d'autres choses sont déterminées dans ce contexte, comme la valeur de "this"
    }
};

//partiales 1/3
var fonctionPartielle = function (func, arg) { 
    return function () {
        func(arg);//execute la fonction donnée en paramètres, avec son argument
    };
};
var partirSurMars = fonctionPartielle(function (planete) {
    console.log("Nous partons sur " + planete + " !");
}, "Mars");
partirSurMars();


//partiale 2/3
var rappelOrigine = function (origine, planeteActuelle) {
    console.log("Nous vivons sur " + planeteActuelle + ", mais notre planete d'origine est " + origine + ".");
};
rappelOrigine("la Terre", "Mars");
rappelOrigine.apply(null, ["la Terre", "Pluton"]);


var mettreArgumentsDansTableau = function (args, debut) {
    var tab = [];
    for (var i = debut; i < args.length; i++) { tab.push(args[i]); }
    return tab;
};
var logArguments = function (args) {
    console.log(mettreArgumentsDansTableau(args, 0).join(", "));
};
var fonctionExecutee = (function (p1, p2, p3) {
    logArguments(arguments);
})("Uranus", "Jupiter", "Saturne");

//partiale 3/3
var mettreArgumentsDansTableau = function (args, debut) {
    var tab = [];
    for (var i = debut; i < args.length; i++) { tab.push(args[i]); }
    return tab;
};
function partiale(func) {
  var argumentsMemorises = mettreArgumentsDansTableau(arguments, 1);
  return function(){
    return func.apply(null, argumentsMemorises.concat(mettreArgumentsDansTableau(arguments, 0)));
  };
}
var parcourirPlanetes = function (p1, p2, p3, p4, p5) {
    console.log("Notre berceau est " + p1);
    console.log("Nous avons vécu sur " + p2 + ", puis sur " + p3);
    console.log("La guerre contre les reptiliens a eu lieu sur " + p4);
    console.log("Nous avons fui sur  " + p5);
};
var finirParcours = partiale(parcourirPlanetes, "la Terre", "Venus", "Mars");
finirParcours("Jupiter", "Neptune");