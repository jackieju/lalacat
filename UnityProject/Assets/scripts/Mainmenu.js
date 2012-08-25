public var bgTexture:Texture;
function OnGUI(){
	GUI.DrawTexture(new Rect(0, 0, Screen.width, Screen.height), bgTexture);
	
	if (Input.touchCount>0 || Input.anyKeyDown){
		Application.LoadLevel("main");
	}	
	
}