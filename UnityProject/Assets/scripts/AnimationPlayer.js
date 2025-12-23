class AnimationPlayer extends MonoBehaviour{

public static var _animations:Hashtable = new Hashtable();

function addAnimationForCat( catType,  animation:JAnimation){
	var ar:Array = _animations[catType];
	if (ar == null){
		ar = new Array();
		_animations.Add(catType, ar);
	}
	ar.push(animation);
	Debug.Log(_animations[0]);
}

function findAnimation( catType,  animationIndex){
	var ret = null;
	var ar:Array = _animations[catType];
	Debug.Log("findAnimation "+catType+":"+ ar+ ":"+ ar[0]);
	if (ar != null)
		ret = ar[animationIndex];
	return ret;
		
}

function playOnce(cat:Cat ,catType, animationIndex){
	Debug.Log("playone: "+catType+", "+ animationIndex);
	var a:JAnimation = findAnimation(catType, animationIndex);
	Debug.Log("animation="+a);
	if (a != null){
		Debug.Log("animation1="+a);
		
		a.PlayOnce(cat);
		
	}else{
		Debug.Log("animation is null");
	}
}



}