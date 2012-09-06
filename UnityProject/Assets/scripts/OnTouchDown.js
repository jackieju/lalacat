//	OnTouchDown.js
//	Allows "OnMouseDown()" events to work on the iPhone.
//	Attack to the main camera.
 
#pragma strict
#pragma implicit
#pragma downcast

function Update () {
	// Code for OnMouseDown in the iPhone. Unquote to test.
	var hit : RaycastHit;
	for (var i = 0; i < Input.touchCount; ++i) {
	var ray = Camera.main.ScreenPointToRay (Input.GetTouch(i).position);
		if (Input.GetTouch(i).phase == TouchPhase.Began) {
		// Construct a ray from the current touch coordinates
		
	
		if (Physics.Raycast (ray,hit)) {
		//	Debug.Log("hit="+hit);
			if (hit.transform	.gameObject	 != null){
			//Debug.Log("touch "+ hit.transform.gameObject.name );
			hit.transform.gameObject.SendMessage("OnMouseDown");
			}
	      }
	   }else if (Input.GetTouch(i).phase == TouchPhase.Ended) { 
	   
	   if (Physics.Raycast (ray,hit)) {
	//		Debug.Log("hit="+hit);
			if (hit.transform	.gameObject	 != null){
		//	Debug.Log("touch "+ hit.transform.gameObject.name );
			hit.transform.gameObject.SendMessage("OnMouseUp");
			}
	      }
	   }
   }
}