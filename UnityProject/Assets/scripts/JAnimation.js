class JAnimation extends MonoBehaviour{
enum AniPlayMode1 {PlayOnce,PlayCycle,FadeIn,FadeOut,Magnify,Minify,Up,Down};

	var aniTexture : Array = new Array();
	@HideInInspector var startTime : float;
	var playTime : float=10;
	var frequency : int=1;
	var playMode : AniPlayMode1;
	var waitTime : float=0;
	var offset : float;
	var sync : boolean;

var destroy : boolean;

//@script RequireComponent (GUITexture)




function addTexture(texturePath){
	var t = Resources.Load(texturePath);
	aniTexture.push(t);
}


function PlayOnce (cat:Cat) {

	var index : int;
	startTime = 0.0f;
	Debug.Log("play once");
	while(startTime <= playTime)
	{
		index = (startTime * (aniTexture.length / playTime) * frequency) % aniTexture.length;
		Debug.Log("play frame "+index+",starttime ="+ startTime+ ", deltime="+Time.deltaTime);
		cat.renderer.material.mainTexture = aniTexture[index];
		startTime = startTime + Time.deltaTime;
		yield;
		//yield WaitForSeconds(1);
	}
	Debug.Log("waittime="+waitTime);
	WaitForSeconds(waitTime);
	//yield WaitForSeconds(waitTime);
}
/*
function PlayCycle (aniplayer : ANIPLAYER) {
	var index : int;
	startTime = 0.0f;
	while(true)
	{
		while(startTime <= playTime)
		{
			index = (startTime * (aniTexture.length / playTime) * frequency) % aniTexture.length;
			guiTexture.texture = aniTexture[index];
			startTime = startTime + Time.deltaTime;
			yield;
		}
		yield WaitForSeconds(waitTime);
		startTime = 0.0f;
	}
}

*/
}