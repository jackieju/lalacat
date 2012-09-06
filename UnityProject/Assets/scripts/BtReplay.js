public var texture_up:Texture;
public var texture_down:Texture;
function Update () {
}

//function OnGUI(){
//
//}
function OnTouchDown(){

	//Debug.Log("mouse down");
	//gameObject.renderer.material.mainTexture = texture_down;
}
function OnTouchUp(){
	//gameObject.renderer.material.mainTexture = texture_up;
	CentralController.inst.onReplay();
}