public var bgTexture:Texture;
public var catTexture:Texture;
public var menu:GameObject;
var index = 1;
var d = 0;
var starttime = 0;
function Start(){
Awake();

}
function Awake(){
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
}
function OnGUI(){
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
	if (Input.touchCount>0 || Input.anyKeyDown){
		Application.LoadLevel("main");
	}	
	
}