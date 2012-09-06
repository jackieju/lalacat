public var textures:Texture[];
public var progress:int; // 0 to 100
public var tripLength:float = 6.0f;
private var reset_pos:Vector3;
function Start(){

	reset_pos = gameObject.transform.position;
	Debug.Log("reset_pos "+reset_pos);
}
function Update () {
}

function reset(){
	gameObject.transform.position = reset_pos;
}
function playAni(progress:int){
	
	//var step:float = progress*tripLength /(100.0f*textures.Length);
	for (var i = 0; i< textures.Length; i++){
		gameObject.renderer.material.mainTexture = textures[i];
		yield WaitForSeconds(0.1f);
		//yield WaitForEndOfFrame;
	//	gameObject.transform.position.x += step;
		Debug.Log("fish"+i);
	}
	gameObject.transform.position.x += progress*tripLength /100.0f;
	gameObject.renderer.material.mainTexture = textures[0];
}