public var bgTexture:Texture;
public var catTexture:Texture;
public var menu:GameObject;
public var logo_cat:GameObject;
var index = 1;
var d = 0;
var starttime = 0;
var mc:Camera;
public var pf_explorsion:GameObject;
public var pf_feather:GameObject; // animation of cat fur emitting, made by particle systems
public var btTexture:Texture;
function explode(pos:Vector3 , rot:Quaternion ){
	GameObject.Instantiate(pf_explorsion, pos, rot);
}	

function splashFur(pos:Vector3 , rot:Quaternion ){
	GameObject.Instantiate(pf_feather, pos, rot);
}	
function Start(){
	index = 0;
	d = 0;
	starttime= Time.time;
	
	// show up the logo cat
	yield WaitForSeconds(1);
	//menu.renderer.transform.position.x = -6f;
	while (logo_cat.renderer.transform.position.y > 11f){
		logo_cat.renderer.transform.position.y -= 1.1f;
		yield;
	}
//explode(logo_cat.transform.position, logo_cat.transform.rotation);
	logo_cat.renderer.transform.position.y= 11f;
splashFur(logo_cat.transform.position, logo_cat.transform.rotation);

		//yield WaitForSeconds(1.5);
		
	//menu.renderer.transform.position.x = 0.5f;
//	yield;
	menu.renderer.transform.position.x = -1.1f;
	// move menu 
//	menu.renderer.transform.position.x = -6f;

	//menu.renderer.transform.position.x = -6f;
	while (menu.renderer.transform.position.x <-1.1f){
		menu.renderer.transform.position.x += 1.2f;
		yield;
	}
	//menu.renderer.transform.position.x = 0.5f;
//	yield;
	menu.renderer.transform.position.x = -1.1f;

}
/*function Awake(){
	index = 0;
	d = 0;
	starttime= Time.time;
//	menu.renderer.transform.position.x = -6f;
	yield WaitForSeconds(1);
	//menu.renderer.transform.position.x = -6f;
	while (menu.renderer.transform.position.x <-1.1f){
		menu.renderer.transform.position.x += 1.5f;
		yield;
	}
	//menu.renderer.transform.position.x = 0.5f;
//	yield;
	menu.renderer.transform.position.x = -1.1f;
}*/


function OnGUI(){
	var blankStyle : GUIStyle=new GUIStyle();; // the blank style make button transparent
	// GUI.Button(new Rect(100, 210, 112, 66), "test position");
		 if (GUI.Button(CentralController.HDRect(100, 210, 112, 66), "", blankStyle)){
	 	Application.LoadLevel("main");
	 	
	 	}
	//catTexture.wrapMode =  TextureWrapMode.Repeat;
  /* 	GUI.DrawTexture(new Rect(0, 0, Screen.width, Screen.height), bgTexture);
	
	
	 var textureCrop:Rect = new Rect( 0.0f, 0.0f, 0.33f, 1.0f ); // width and height is the ration of part will dislayed

	 var position:Vector2 = new Vector2( 265, 300 );  // window poistion

	 
 	GUI.BeginGroup( new Rect( position.x, position.y, catTexture.width*textureCrop.width /3, catTexture.height*textureCrop.height/3 ) );
    
    // draw texture in widown defined by begin group, rect.x is position of texture relative to the window
  //  var i = 0-catTexture.width*textureCrop.width*index;
    //Debug.Log("texture width="+catTexture.width+", i="+i+", index="+index);
    GUI.DrawTexture( new Rect(0-catTexture.width*textureCrop.width*1/3, 0, catTexture.width*textureCrop.width , catTexture.height*textureCrop.height/3), catTexture );
    GUI.EndGroup();
    
	
    //Debug.Log("spantime = " + spantime+", time="+ Time.time);
   
 if (Time.time - starttime > 0.8f){
	if (d == 0){
		index ++;
		if (index == 2)
			d = 1;
	}else{
		index --;
		if (index == 0)
			d = 0;
	}
	starttime = Time.time;
    }
    */
/*	if (Input.touchCount>0 || Input.anyKeyDown){
		Application.LoadLevel("main");
	}	
*/	

/*
 for (var i = 0; i < Input.touchCount; ++i) {
	    var touch = Input.GetTouch(i);
	    
           var ray:Ray = mc.ScreenPointToRay (new Vector3 (touch.position.x, touch.position.y,0));
           var hits:RaycastHit[];
           hits = Physics.RaycastAll (ray, 50);
           if (hits.Length	> 0){
           		for (var j = hits.Length-1; j >=0;j++){
           		 var c = hits[j].collider;
  			 	 Debug.Log("touching "+c.tag);
  			  
	  			   if (c.tag == "start_button"){
	  				Application.LoadLevel("main");
	  			  }
  			   }
  			}
  	}
	*/
}