
/**/
function simulateDistr( base, level )
{
	return (1 + X(base) + X(base)+level) * (1 + ((N() + N() - 1) *0.25))+.5;
}

/**/
function X( base )
{
	return parseInt(Math.random() * (base/2));
}

/**/
function N()
{
	return Math.random();
}

/**/
function foreachValidEnchantment( materialId, itemId, callback )
{
	for( var i =0;i<_enchantments.length;i++)
	{
		if( _enchantments[i].canEnchant( materialId, itemId ) )
			for( var v= _enchantments[i].minlevel; v<=_enchantments[i].maxlevel; v++)
				callback( _enchantments[i], v );
	}
}

/**/
function getEnchantments( matId, itemId, level )
{
	var map = {};
	foreachValidEnchantment( matId, itemId, function( ench, enchlevel ) 
	{
		if( ench.minEnchant(enchlevel) <= level && ench.maxEnchant(enchlevel) >= level )
			map[ench.name] = { enchantment: ench, enchantmentLevel: enchlevel };
	});

	var list = [];
	for( var name in map )
	{
		list[list.length] = map[name];
	}
	return list;
}

function stripeIncompatibleEnchantments( enchantment, list )
{
	var arr = [];
	for( var i =0;i<list.length;i++)
	{
		if( list[i].enchantment.applies( enchantment.enchantment.name ) )
			arr[arr.length] = list[i];
	}
	return arr;
}

/**/
function simulateEnchantments( itemId, matId, level )
{
	var applied_enchantments = [];

	var baselevel = getBaseEnchantmentLevel( itemId, matId );
	var moddedLevel = parseInt(simulateDistr( baselevel, level ));
	var enchantmentlist = getEnchantments( matId, itemId, moddedLevel );
	
	var enchantment = selectWeighted( enchantmentlist);
	applied_enchantments[applied_enchantments.length] = enchantment;

	for(var i = moddedLevel / 2; parseInt(Math.random() * 50) <= i && enchantmentlist.length > 0; i /= 2)
	{
		enchantmentlist = stripeIncompatibleEnchantments( enchantment, enchantmentlist );
		if( enchantmentlist.length > 0 )
		{
			enchantment = selectWeighted( enchantmentlist );
			applied_enchantments[applied_enchantments.length] = enchantment;
		}
	}
	
	return applied_enchantments;
}

/**/
function selectWeighted( validEnchantments )
{
	var totalweight = 0;
	for( var i = 0; i<validEnchantments.length; i++)
	{
		if( validEnchantments[i].enchantment == undefined )
		{
			write (validEnchantments[i]);
		}
		totalweight += validEnchantments[i].enchantment.weight;
	}
	var eeniemeenie = parseInt( Math.random() * totalweight );
	for( i = 0; i<validEnchantments.length; i++)
	{
		eeniemeenie -= validEnchantments[i].enchantment.weight;
		if( eeniemeenie < 0 )
		{
			return validEnchantments[i];
		}
	}
	return validEnchantments[validEnchantments.length-1];
}

/**/
function getBaseEnchantmentLevel( itemId, materialId )
{
	var isArmor = itemId >= 4 ? 0 : 1;
	var levels =[[10,9,25,15,-1,12,-1],[10,14,22,-1,5,-1,15]];

	return levels[isArmor][materialId];
}
