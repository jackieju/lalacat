#pragma strict

// The ball prefab that will be used to create balls on demand.
var ballPrefab : GameObject;
// The number of balls that will be created but deactivated up front.
var numberOfBallsToPreInstantiate = 5;
// The floor object.
var floor : GameObject;
var mCamera: Camera;
var top=3;
var mt:Texture;
var moving_cat:Cat;
var drag_cat_speed:float = 0.1f;
var texts: Texture[];
static var inst:CentralController;
var interval = 5;
var pf_explorsion:GameObject;
//var  m_timerManager;

// Our handy-dandy pool, which allows us to reuse objects without creating/destroying them.
private var ballPool : GameObjectPool;

// Awake is a built-in unity function that is called called only once during the lifetime of the script instance.
// It is called after all objects are initialized.
// For more info, see:
// http://unity3d.com/support/documentation/ScriptReference/MonoBehaviour.Awake.html
function Awake(){
 //	m_timerManager = gameObject.AddComponent("TimerManager");
 	//m_timerManager1.initTimer(1, 11, new Rect(100, 100, 100, 100), gameObject, mySkin.customStyles[0]); 

	// Instantiate the ball pool, making sure it has capacity for twice as many balls as we're configured
	// to pre-instantiate. That way it won't have to do any array reallocations behind the scenes if
	// we grow.
	inst = this;
	texts = new Texture[4];
	//var a = Resources.Load("cat3");
	//Debug.Log("resource:"+a+"//");
	texts[0] =  Resources.Load("cat3");
	texts[1] =  Resources.Load("cat8");
	texts[2] =  Resources.Load("cat6");
	texts[3] =  Resources.Load("Cat10");
	Debug.Log("t1:"+texts[0]+",t2:"+texts[1]);
	ballPool = GameObjectPool(ballPrefab, numberOfBallsToPreInstantiate*2, InitializeGameObject, false);
	ballPool.PrePopulate(numberOfBallsToPreInstantiate);
	 
	StartCoroutine("onTimer");
}

function onTimer(){

	while (true){
		yield WaitForSeconds (interval);
	}
}
// Tells each ball who we are.
function InitializeGameObject(target : GameObject){
	target.SendMessage ("SetCentralController", this, SendMessageOptions.DontRequireReceiver);

	//target.ndex = i;
	target.tag = "cat";
	

}

// OnGUI is a built-in unity function. All our button/label logic goes here.
// For more info, see:
// http://unity3d.com/support/documentation/Components/GUI%20Scripting%20Guide.html
function OnGUI(){
	
	/*for (var l = -3; l < -3; l++)
		Debug.DrawLine (new Vector3(l,0,-5), new Vector3 (l, 10, -5), Color.red);
	for ( l = 0; l < 10; l++)
		Debug.DrawLine (new Vector3(-10,l,-5), new Vector3 (10, l, -5), Color.red);
		*/
//		   DrawLine.DrawLine(new Vectro2(0,0), pointB, color, width);
	// Display a button that allows the user to spawn a ball at a random location.
	if (GUI.Button (Rect (5, 5, 90, 40), "Spawn Ball")) {
		SpawnBall();
		Debug.Log("fire");
	}
	GUI.Label (Rect (Screen.width - 100,0,100,20), "Balls in Pool: " + ballPool.GetAvailableCount());
	GUI.Label (Rect (Screen.width - 98,15,100,20), "Active Balls: " + ballPool.GetActiveCount());
//	GUI.color = Color.red;
	for (var k = 0; k < 7; k ++){
		for (var kk = 0; kk < 7; kk ++){
 			var _c:Cat = Cat.matrix[k,kk];
 			if (_c != null){
	     		var pt:Vector2 = 	mCamera.WorldToScreenPoint(_c.transform.position);
	     	//	Debug.Log("pt="+pt);
         		GUI.Label(Rect(pt.x, Screen.height-pt.y-30, 100, 20), _c.name);
     		}
 		}
     }
	//Debug.Log("on gui");
	
	   for (var i = 0; i < Input.touchCount; ++i) {
	   var t:Touch = Input.GetTouch(i);
        if (Input.GetTouch(i).phase == TouchPhase.Began) {
           Debug.Log("touche began");
  /*         explode(Input.GetTouch(i).position, Quaternion.identity);
           var touch = Input.GetTouch(i);
           var ray:Ray = mCamera.ScreenPointToRay (new Vector3 (touch.position.x, touch.position.y,0));
           var hits:RaycastHit[];
           hits = Physics.RaycastAll (ray, 50);
           if (hits.Length	> 0){
           		for (var j = hits.Length-1; j >=0;j++){
           		 var c = hits[j].collider;
  			 	 Debug.Log("touching "+c.tag);
  			  
	  			   if (c.tag == "cat"){
	  			 	 moving_cat = c.GetComponent("Cat");
	  			  	 moving_cat.status = 3;
	  			  }
  			   }
  			}*/
  			    var tp_w1:Vector3 = mCamera.ScreenToWorldPoint(t.position);
			     var x1:int = tp_w1.x;
				var y1:int = tp_w1.y;
				x1+=2;
         	Debug.Log("touche move(x="+x1+", y="+y1+", cat="+Cat.matrix[x1,y1]);
         /*	if (Cat.matrix[x1,y1] == null){
         		for (var ll = 0; ll < 7; ll ++){
         			for (var lll = 0; lll < 7; lll ++)
         				
         				Debug.Log("matrix["+ll+"]["+lll+"]="+Cat.matrix[ll,lll]);
         		}
         	}*/
        }else
         if (Input.GetTouch(i).phase == TouchPhase.Moved ){
         		
			         // Get movement of the finger since last frame
			        var touchDeltaPosition:Vector2 = Input.GetTouch(i).deltaPosition;
			        var tp_w:Vector3 = mCamera.ScreenToWorldPoint(t.position);
			        var x:int;
			    if (tp_w.x <0)
			   	 	x = tp_w.x-0.5f;
			    else  
			    	x = tp_w.x+0.5f;
				var y:int = tp_w.y;
				x+=2;
         //	Debug.Log("touche("+tp_w+") move(x="+x+", y="+y+", moving_cat="+moving_cat);
     
				
				if (moving_cat != null){
				
					if (Cat.matrix[x,y]  != null){ // position occupied
						// revert to last position
						  	moving_cat.transform.position = new Vector3(moving_cat.mf_x, moving_cat.mf_y, 0);
					
					}else{ 
				
			        Debug.Log("Moved "+touchDeltaPosition +", to "+t.position+"("+tp_w+")");
			        // Move object across XY plane
			      //  moving_cat.transform.Translate (touchDeltaPosition.x * drag_cat_speed, touchDeltaPosition.y * drag_cat_speed, 0);
					
						if (moving_cat.status != 4)
							moving_cat.transform.position = new Vector3(tp_w.x, tp_w.y, 0);  
						else{
							moving_cat.transform.position = new Vector3(x, y+0.5f, 0);
							moving_cat.status = 3;
						}
						moving_cat.mf_x = x;
						moving_cat.mf_y = y + 0.5f;
					}
					
				}
				else { // moving_cat == null
					if ((x -1 < 0 || Cat.matrix[x-1, y] != null) && (x+1>7 ||  Cat.matrix[x+1,y] != null) && ( y<1 || Cat.matrix[x, y-1] != null) && (y>6 || Cat.matrix[x, y+1] != null) ){
					
					}else{
						if (Cat.matrix[x,y] != null){
							moving_cat = Cat.matrix[x,y];
							Cat.matrix[x,y] = null;
							moving_cat.status = 3;
						}
					}
				 
				}
		//		Debug.Log("touch moved");
			
				break;
          } else if (Input.GetTouch(i).phase == TouchPhase.Ended || Input.GetTouch(i).phase == TouchPhase.Canceled){
          Debug.Log("touche end");
       		 if (moving_cat	 != null){
        		// put into grid
        		Debug.Log("moving_cat="+moving_cat);
        		var ix:int;
        		if (moving_cat.transform.position.x >= 0)
        			ix = moving_cat.transform.position.x+0.5;
        			else
        			ix = moving_cat.transform.position.x -0.5;
        		
        		//if (moving_cat.transform.position.x - ix > 0.5f)
        			//ix ++;
        			
        		moving_cat.transform.position = new Vector3(ix, moving_cat.transform.position.y, moving_cat.transform.position.z);
        		moving_cat.status = 1;
        		moving_cat = null;
        	}
        	break;
        }
        
    }
}

function SpawnBall(){
	// Pick a random location
	var x:float = Random.Range(-2.9, 2.9);
	var ix:int = x;
	var spawnPoint = Vector3(ix, top, 0.0);
	// Place a ball there and activate it
	var o:GameObject = ballPool.Spawn(spawnPoint, Quaternion.identity);
	var c:Cat = o.GetComponent("Cat");
	c.status = 0;
		var i =Random.Range(0, texts.Length);
	var t:Texture =  texts[i];
	if (t == null)
		t = mt;
	o.renderer.material.mainTexture = t;
//	var s:cat= target.GetComponent("Cat");
	c.catType = i;
}


function UnspawnBall(ball : GameObject){
	ballPool.Unspawn(ball);
}

function update(){
Debug.Log("update1");
   for (var i = 0; i < Input.touchCount; ++i) {
        if (Input.GetTouch(i).phase == TouchPhase.Began) {
           Debug.Log("touched1");
        }
    }
    
    /* for ( i = 0; i < Input.touchCount; ++i) {

        if (Input.GetTouch(i).phase == TouchPhase.Began) {

            // Construct a ray from the current touch coordinates

            var ray = Camera.main.ScreenPointToRay(Input.GetTouch(i).position);

        Debug.Log (ray);

            if (Physics.Raycast(ray)) {

                // Create a particle if hit
explode(transform.position, transform.rotation);
              //  Instantiate(explore, transform.position, transform.rotation);

            }

        }                                          

    }*/
}

function explode(pos:Vector3 , rot:Quaternion ){
	GameObject.Instantiate(pf_explorsion, pos, rot);
}	