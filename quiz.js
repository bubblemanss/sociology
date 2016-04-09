var json;
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var asker = function(question, ans, callback){
	rl.question(question, function(answer){
   		if(answer == ans){
   			callback(true, "CORRECT");
	   	} else {
	   		callback(false, "INCORRECT");
	   	}
	});
}

var main = function(num){
	var ans = json[num].answer;
	var q = json[num].question.q;
	var a = json[num].question.a;
	var b = json[num].question.b;
	var c = json[num].question.c;
	var d = json[num].question.d;

	var question = 
	num+1+") "+q+
	"\n\tA) "+a+
	"\n\tB) "+b+
	"\n\tC) "+c+
	"\n\tD) "+d+
	"\n";

	asker(question, ans, function(success, msg){
		console.log("\n"+msg+"\n");

		if(success){
			if(num+1 < json.length){
				main(num+1);
			} else {
				rl.close();
				return;
			}
		} else {
			main(num);
		}
	});
}

var start = function(){
	var s = "Pick Quiz (Enter 1, 2, or 3): ";
	rl.question(s, function(answer){
		json = require("./quiz"+answer+".json");
		main(0);
	});
}

start();