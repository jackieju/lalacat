public var texture_up:Texture;
public var texture_down:Texture;

function Start(){

	//handle_input();
}
function handle_input(){
/*
	while (true && CentralController.status == 0){
		for (var i = 0; i < Input.touchCount; ++i) {
		 	var touchObj  : Touch;
		 	touchObj = Input.GetTouch(i);
		 	if(touchObj.phase == TouchPhase.Began)
			 {
				 if(gameObject.guiTexture.HitTest(touchObj.position, CentralController.inst.mCamera))
			 	{
			 		Debug.Log("touch down");
			 	}
		 	}
    	}
    	yield;
	}*/
	
	
}
	
	
	
	

function Update () {


}

function OnMouseDown(){

OnTouchDown();
}

function OnMouseUp(){

OnTouchUp();
}

function OnTouchDown(){

Debug.Log("mouse down");
	gameObject.renderer.material.mainTexture = texture_down;
}
function OnTouchUp(){
	gameObject.renderer.material.mainTexture = texture_up;
	CentralController.inst.pause();
}

/*
function OnGUI()
{
  if(Event.current.type == EventType.MouseDown)
  {
  
  		Debug.Log("mouse down1");
      // your code here, since mouse down event will be called when a touch phase begins. 
      // This works even in ios!!.
  }
  
	if(Event.current.type == EventType.MouseUp)
  {
  
  		Debug.Log("mouse up1");
      // your code here, since mouse down event will be called when a touch phase begins. 
      // This works even in ios!!.
  }
}

*/