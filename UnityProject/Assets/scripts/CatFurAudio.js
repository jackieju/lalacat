public var src:AudioClip[];
//function Awake(){
//	var i:int = Random.Range(0, src.Length);
//	gameObject.audio.clip = src[i];
//	Debug.Log("audio awake");
//
//}
function Update () {
}
function playAudio(){
	var i:int = Random.Range(0, src.Length);
	gameObject.audio.clip = src[i];
	gameObject.audio.PlayOneShot(gameObject.audio.clip );
	yield WaitForSeconds(0.5);
	gameObject.audio.Stop();
}