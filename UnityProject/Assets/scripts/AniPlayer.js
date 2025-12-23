enum AniPlayMode {PlayOnce,PlayCycle,FadeIn,FadeOut,Magnify,Minify,Up,Down};
class ANIPLAYER {
	var aniTexture : Texture[];
	@HideInInspector var startTime : float;
	var playTime : float;
	var frequency : int;
	var playMode : AniPlayMode;
	var waitTime : float;
	var offset : float;
	var sync : boolean;
}

var aniplayers : ANIPLAYER[];
var destroy : boolean;

@script RequireComponent (GUITexture)

function OnEnable () {
	Play();
}

function Play () {
	for(var aniplayer : ANIPLAYER in aniplayers)
	{
		if(aniplayer.playMode == AniPlayMode.PlayOnce)
		{
			if(aniplayer.sync)
				PlayOnce(aniplayer);
			else
				yield PlayOnce(aniplayer);
		}
		else if(aniplayer.playMode == AniPlayMode.PlayCycle)
		{
			if(aniplayer.sync)
				PlayCycle(aniplayer);
			else
				yield PlayCycle(aniplayer);
		}
		else if(aniplayer.playMode == AniPlayMode.FadeIn)
		{
			if(aniplayer.sync)
				FadeIn(aniplayer);
			else
				yield FadeIn(aniplayer);
		}
		else if(aniplayer.playMode == AniPlayMode.FadeOut)
		{
			if(aniplayer.sync)
				FadeOut(aniplayer);
			else
				yield FadeOut(aniplayer);
		}
		else if(aniplayer.playMode == AniPlayMode.Magnify)
		{
			if(aniplayer.sync)
				Magnify(aniplayer);
			else
				yield Magnify(aniplayer);
		}
		else if(aniplayer.playMode == AniPlayMode.Minify)
		{
			if(aniplayer.sync)
				Minify(aniplayer);
			else
				yield Minify(aniplayer);
		}
		else if(aniplayer.playMode == AniPlayMode.Up)
		{
			if(aniplayer.sync)
				Up(aniplayer);
			else
				yield Up(aniplayer);
		}
		else if(aniplayer.playMode == AniPlayMode.Down)
		{
			if(aniplayer.sync)
				Down(aniplayer);
			else
				yield Down(aniplayer);
		}
	}
	if(destroy)
	{
		Destroy(gameObject);
	}
}

function PlayOnce (aniplayer : ANIPLAYER) {
	var index : int;
	aniplayer.startTime = 0.0f;
	while(aniplayer.startTime <= aniplayer.playTime)
	{
		index = (aniplayer.startTime * (aniplayer.aniTexture.Length / aniplayer.playTime) * aniplayer.frequency) % aniplayer.aniTexture.Length;
		GetComponent.<GUITexture>().texture = aniplayer.aniTexture[index];
		aniplayer.startTime = aniplayer.startTime + Time.deltaTime;
		yield;
	}
	yield WaitForSeconds(aniplayer.waitTime);
}

function PlayCycle (aniplayer : ANIPLAYER) {
	var index : int;
	aniplayer.startTime = 0.0f;
	while(true)
	{
		while(aniplayer.startTime <= aniplayer.playTime)
		{
			index = (aniplayer.startTime * (aniplayer.aniTexture.Length / aniplayer.playTime) * aniplayer.frequency) % aniplayer.aniTexture.Length;
			GetComponent.<GUITexture>().texture = aniplayer.aniTexture[index];
			aniplayer.startTime = aniplayer.startTime + Time.deltaTime;
			yield;
		}
		yield WaitForSeconds(aniplayer.waitTime);
		aniplayer.startTime = 0.0f;
	}
}

function FadeIn (aniplayer : ANIPLAYER) {
	aniplayer.startTime = 0.0f;
	GetComponent.<GUITexture>().color.a = 0;
	while(aniplayer.startTime <= aniplayer.playTime)
	{
		aniplayer.startTime = aniplayer.startTime + Time.deltaTime;
		GetComponent.<GUITexture>().color.a = GetComponent.<GUITexture>().color.a + (Time.deltaTime / aniplayer.playTime);
		yield;
	}
	yield WaitForSeconds(aniplayer.waitTime);
}

function FadeOut (aniplayer : ANIPLAYER) {
	aniplayer.startTime = 0.0f;
	while(aniplayer.startTime <= aniplayer.playTime)
	{
		aniplayer.startTime = aniplayer.startTime + Time.deltaTime;
		GetComponent.<GUITexture>().color.a = GetComponent.<GUITexture>().color.a - (Time.deltaTime / aniplayer.playTime);
		yield;
	}
	yield WaitForSeconds(aniplayer.waitTime);
}

function Magnify (aniplayer : ANIPLAYER) {
	var scale : float = GetComponent.<GUITexture>().pixelInset.width / GetComponent.<GUITexture>().pixelInset.height;
	aniplayer.startTime = 0.0f;
	while(aniplayer.startTime <= aniplayer.playTime)
	{
		aniplayer.startTime = aniplayer.startTime + Time.deltaTime;
		GetComponent.<GUITexture>().pixelInset.width = GetComponent.<GUITexture>().pixelInset.width + Time.deltaTime * aniplayer.offset * scale;
		GetComponent.<GUITexture>().pixelInset.height = GetComponent.<GUITexture>().pixelInset.height + Time.deltaTime * aniplayer.offset;
		GetComponent.<GUITexture>().pixelInset.x = GetComponent.<GUITexture>().pixelInset.x - Time.deltaTime * aniplayer.offset * scale / 2;
		GetComponent.<GUITexture>().pixelInset.y = GetComponent.<GUITexture>().pixelInset.y - Time.deltaTime * aniplayer.offset / 2;
		yield;
	}
	yield WaitForSeconds(aniplayer.waitTime);
}

function Minify (aniplayer : ANIPLAYER) {
	var scale : float = GetComponent.<GUITexture>().pixelInset.width / GetComponent.<GUITexture>().pixelInset.height;
	aniplayer.startTime = 0.0f;
	while(aniplayer.startTime <= aniplayer.playTime)
	{
		aniplayer.startTime = aniplayer.startTime + Time.deltaTime;
		GetComponent.<GUITexture>().pixelInset.width = GetComponent.<GUITexture>().pixelInset.width - Time.deltaTime * aniplayer.offset * scale;
		GetComponent.<GUITexture>().pixelInset.height = GetComponent.<GUITexture>().pixelInset.height - Time.deltaTime * aniplayer.offset;
		GetComponent.<GUITexture>().pixelInset.x = GetComponent.<GUITexture>().pixelInset.x + Time.deltaTime * aniplayer.offset * scale / 2;
		GetComponent.<GUITexture>().pixelInset.y = GetComponent.<GUITexture>().pixelInset.y + Time.deltaTime * aniplayer.offset / 2;
		yield;
	}
	yield WaitForSeconds(aniplayer.waitTime);
}

function Up (aniplayer : ANIPLAYER) {
	aniplayer.startTime = 0.0f;
	while(aniplayer.startTime <= aniplayer.playTime)
	{
		aniplayer.startTime = aniplayer.startTime + Time.deltaTime;
		GetComponent.<GUITexture>().pixelInset.y = GetComponent.<GUITexture>().pixelInset.y + Time.deltaTime * aniplayer.offset;
		yield;
	}
	yield WaitForSeconds(aniplayer.waitTime);
}

function Down (aniplayer : ANIPLAYER) {
	aniplayer.startTime = 0.0f;
	while(aniplayer.startTime <= aniplayer.playTime)
	{
		aniplayer.startTime = aniplayer.startTime + Time.deltaTime;
		GetComponent.<GUITexture>().pixelInset.y = GetComponent.<GUITexture>().pixelInset.y - Time.deltaTime * aniplayer.offset;
		yield;
	}
	yield WaitForSeconds(aniplayer.waitTime);
}