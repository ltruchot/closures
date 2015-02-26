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
var createButton = function (text) {
	btn = document.createElement("BUTTON");
	btn.appendChild(document.createTextNode(text));
	document.body.appendChild(btn);
	return btn;
};
var planetes = ["la Terre", "Mars", "Venus", "Pluton"];
for (var i = 0; i <= 2; i++) {	
	var btn = createButton(planetes[i]);
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
ExecutionContext = {
	localeVars: [planete1], // variables déclarées à même la fonction
	arguments:  [planete2, planete3],//variables passée en paramètres
	parentVars: [planete4], //variables découvertes dans les fonctions parentes au moment l'excution de la fille, 
	allVarsUsed: [planete1, planete2, planete3, planete4, planete5], //variables découvertes en parsant la fonction
	prepareVariables: function ()  {
		this.allVarsUsed.forEach(function (varName) {
			finalVariables[varName] = localeVars.indexOf(varName) || arguments.indexOf(varName) || parentVars.indexOf(varName) || undefined;
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
var memorisePlanete = function (i) {
	var index = i;
	return function () {
		console.log("Cette planete est", planetes[index]);
	};
};
for (var i = 0; i <= 2; i++) {	
	var btn = createButton(planetes[i]);
	var logPlaneteMemorisee = memorisePlanete(i);//CETTE valeur de i est enfermée dans CE contexte d'execution unique, et persistant pour les fonctions filles
	btn.onclick = logPlaneteMemorisee;//attention, on veut que la fonction retournée s'execute au click, donc pas de ().
}


var planetes = ["la Terre", "Mars", "Venus", "Pluton"];
for (var i = 0; i <= 2; i++) {	
	var btn = createButton(planetes[i]);
	btn.onclick = (function (i) { //declaration de fonction dans une boucle = mauvaise pratique
		return function () {
			console.log("Cette planete est", planetes[i]);
		};
	})(i);
}