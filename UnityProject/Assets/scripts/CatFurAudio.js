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
	gameObject.GetComponent.<AudioSource>().clip = src[i];
	gameObject.GetComponent.<AudioSource>().PlayOneShot(gameObject.GetComponent.<AudioSource>().clip );
	yield WaitForSeconds(0.5);
	gameObject.GetComponent.<AudioSource>().Stop();
}