#pragma strict

// The ball prefab that will be used to create balls on demand.
var ballPrefab : GameObject;
// The number of balls that will be created but deactivated up front.
var numberOfBallsToPreInstantiate = 7;
// The floor object.
var floor : GameObject;
var mCamera: Camera;
var board: GameObject;
var board_high_pos_y:float;
var board_low_pos_y:float;

var top=3;
var mt:Texture;
var moving_cat:Cat;
var drag_cat_speed:float = 0.1f;
var texts: Texture[];
static var inst:CentralController;
var interval = 5;
public static var catrow_size = 7; // 7 cat one line
public static var catcol_size = 9; // 9 cat one col

var pf_explorsion:GameObject;
var pf_feather:GameObject; // animation of cat fur emitting, made by particle system
var top_row:Cat[]=null;
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
	texts = new Texture[8];
	//var a = Resources.Load("cat3");
	//Debug.Log("resource:"+a+"//");
//	texts[0] =  Resources.Load("cat3");
//	texts[1] =  Resources.Load("cat8");
//	texts[2] =  Resources.Load("cat6");
//	texts[3] =  Resources.Load("Cat10");
	texts[0] =  Resources.Load("cat16");
	texts[1] =  Resources.Load("cat12");
	texts[2] =  Resources.Load("cat13");
	texts[3] =  Resources.Load("Cat15");
	texts[4] = Resources.Load("Cat11");
	texts[5] = Resources.Load("Cat12");
	texts[6] = Resources.Load("Cat13");
	texts[7] = Resources.Load("Cat15");
	Debug.Log("t1:"+texts[0]+",t2:"+texts[1]);
	ballPool = GameObjectPool(ballPrefab, numberOfBallsToPreInstantiate*2, InitializeGameObject, false);
	ballPool.PrePopulate(numberOfBallsToPreInstantiate);
	
	top_row = new Cat[catrow_size];
	
	// init animation
	Cat.aniPlayer = gameObject.AddComponent("AnimationPlayer");
	
	var ani:JAnimation = gameObject.AddComponent("JAnimation");
	ani.addTexture("cat8");
	ani.addTexture("cat6");
	ani.addTexture("cat10");
	ani.addTexture("cat3");
	Cat.aniPlayer.addAnimationForCat(0, ani);
	
	
	StartCoroutine("onTimer");
	//InvokeRepeating("handleTouch", 0, 0.2);
}

function onTimer(){
	//return;
	Debug.Log("onTimer");
	
	// show animation sliding down board
	while (true){
		//yield WaitForSeconds (0.1);
		board.transform.position.y = board.transform.position.y-1;
		if (board.transform.position.y <= board_low_pos_y){
			board.transform.position.y = board_low_pos_y-0.5f;
			yield WaitForSeconds (0.1);
		//yield;
			board.transform.position.y = board_low_pos_y+0.2f;
			yield WaitForSeconds (0.1);
			//yield;
			board.transform.position.y = board_low_pos_y;
			break;
		}
		yield;
	}

	
	
	CreateCatRow();
	var gameover = true;
	while (true){
		yield WaitForSeconds (interval);
		gameover = true;
		if (top_row != null && top_row.length==catrow_size){
			for (var i = 0; i< catrow_size; i++){
				if (top_row[i] != null && Cat.matrix[i,catcol_size-1] == null){
			//		top_row[i].transform.position = new Vector3(i-3, catcol_size-1, catrow_size-i);
					top_row[i].status = 1;
					top_row[i] = null;
					gameover = false;
				}
			}
		}
		if (!gameover)
			CreateCatRow();
		else{
			break;
		}

	}
}

function CreateCatRow(){
 	//top_row = new Cat[catrow_size];
	for (var i = 0; i < catrow_size; i++){
		if (top_row[i] == null){
			var spawnPoint = Vector3(i-3, 10.5, catrow_size-i);
			top_row[i] = createCat(spawnPoint);
		}
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
		//Debug.Log("fire");
	}
	GUI.Label (Rect (Screen.width - 100,0,100,20), "Balls in Pool: " + ballPool.GetAvailableCount());
	GUI.Label (Rect (Screen.width - 98,15,100,20), "Active Balls: " + ballPool.GetActiveCount());
//	GUI.color = Color.red;
/*	for (var k = 0; k < catrow_size; k ++){
		for (var kk = 0; kk < catcol_size; kk ++){
 			var _c:Cat = Cat.matrix[k,kk];
 			if (_c != null){
	     		var pt:Vector2 = 	mCamera.WorldToScreenPoint(_c.transform.position);
	     	//	Debug.Log("pt="+pt);
         		GUI.Label(Rect(pt.x, Screen.height-pt.y-30, 100, 20), _c.name+"("+k+","+kk+")");
     		}
 		}
     }*/
	//Debug.Log("on gui");
	
	  
}

/*function catchCat(tp_w:Vector3){
			        var x:int;
			 
			   	 	x = tp_w.x+3.5f;
			
				var y:int = tp_w.y;
	if ((x -1 < 0 || Cat.matrix[x-1, y] != null) && (x+1>catrow_size ||  Cat.matrix[x+1,y] != null) && ( y<1 || Cat.matrix[x, y-1] != null) && (y>6 || Cat.matrix[x, y+1] != null) ){
					
	}else{
		if (Cat.matrix[x,y] != null){
			
			moving_cat = Cat.matrix[x,y];
			Debug.Log("moving cat = " + moving_cat.name +", "+x+", "+y);
			Cat.matrix[x,y] = null;
			moving_cat.status = 3;
			
			// pull down above cat
			for (var j=y+1; j< 10; j++){
				var c:Cat = Cat.matrix[x,j];
				if (c != null){
					c.status = 1;
					Cat.matrix[x,j]=null;
					//c.transform.position = new Vector3( c.transform.position.x, c.transform.position.y+0.5f*j, c.transform.position.z); 
				}
			}
		}
	}
}*/


function createCat(spawnPoint:Vector3){
// Place a ball there and activate it
	var o:GameObject = ballPool.Spawn(spawnPoint, Quaternion.identity);
	var c:Cat = o.GetComponent("Cat");
	
	// put texture
	var i =Random.Range(0, texts.Length);
	var t:Texture =  texts[i];
	if (t == null)
		t = mt;
	o.renderer.material.mainTexture = t;
	o.renderer.material.mainTexture.wrapMode =  TextureWrapMode.Clamp;
//	var s:cat= target.GetComponent("Cat");
	c.catType = i;
	
	c.status = 0;
	c.mf_x = spawnPoint.x;
	c.mf_y = spawnPoint.y;
	Debug.Log("create cat at "+ spawnPoint);
	return c;
}

function SpawnBall(){
	// Pick a random location
	var x:float = Random.Range(-2.9, 2.9);
	var ix:int = x;
	var spawnPoint = Vector3(ix, top, 0.0);
	
	var c:Cat = createCat(spawnPoint);
	c.status = 1;
	
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

function splashFur(pos:Vector3 , rot:Quaternion ){
	GameObject.Instantiate(pf_feather, pos, rot);
}	