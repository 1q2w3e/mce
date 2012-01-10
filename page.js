function write( str )
{
	if(str === undefined )
		str = " ";
	$("#output")[0].innerHTML += "<pre>"+str + "\n</pre>";
}
function writev( str )
{
	$("#output")[0].innerHTML += "<p class=\"debug\">" + str + "</p>\n";
}

function clear()
{
	clearAll(".chartholder");
	clearAll(".textholder");
}

function clearAll( identifier )
{
	var elems = $(identifier);
	for(var i = 0; i<elems.length; i++)
		elems[i].innerHTML="";
}

function addLevel()
{
	changeLevel(1);
	simulate();
}

function removeLevel()
{
	changeLevel(-1);
	simulate();
}

function getInputData()
{
	var material = $("#material")[0].value;
	var item = $("#item")[0].value;
	var level = parseInt($("#level")[0].value);
	if( level < 0 || level > 50 )
		level = $("#level")[0].value = 30;
	var trials = $("#trials")[0].value.split("/");
	var iters = 1000;
	var sims = 10;
	if( trials.length != 2 )
	{
		$("#trials")[0].value = defaultSimulationValue;
	}
	else
	{
		iters = parseInt(trials[0]);
		sims = parseInt(trials[1]);
	}
	var matId = getMaterialId( material );
	var itemId = getItemId( item );
	return {
		material: material,
		item: item,
		level: level,
		materialId: matId,
		itemId: itemId,
		iterations: iters,
		simulations: sims
	};
}

function changeLevel( l )
{
	var elem = $("#level")[0];
	var level = parseInt(elem.value);
	if( !isNaN( level ) )
	{
		var newlevel = level + l;
		if( newlevel < 0 )
			elem.value = 0;
		else if( newlevel >= 50 )
			elem.value = 50;
		else
			elem.value = newlevel;
	}
	else elem.value = 0;
}
function getItemId( name )
{
	switch(name)
	{
	case 'pickaxe': return 0;
	case 'sword': return 1;
	case 'axe': return 2;
	case 'shovel': return 3;
	case 'helmet': return 4;
	case 'chestplate': return 5;
	case 'leggings': return 6;
	case 'boots': return 7;
	default: return -1;
	}
}

function getMaterialId( name )
{
	switch(name)
	{
	case 'diamond': return 0;
	case 'iron': return 1;
	case 'gold': return 2;
	case 'leather': return 3;
	case 'stone': return 4;
	case 'chain': return 5;
	case 'wood': return 6;
	default: return -1;
	}
}

