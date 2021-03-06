#pragma strict
import System.IO; 
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

var top=10;
var mt:Texture;
var moving_cat:Cat;
//var drag_cat_speed:float = 0.1f;
var texts: Texture[,];
static var inst:CentralController;
private var interval:float = 10.0f;
public static var catrow_size = 7; // 7 cat one line
public static var catcol_size = 9; // 9 cat one col

var pf_explorsion:GameObject;
var pf_feather:GameObject; // animation of cat fur emitting, made by particle system
var top_row:Cat[]=null;

var water:GameObject;
//var  m_timerManager;

// Our handy-dandy pool, which allows us to reuse objects without creating/destroying them.
private var ballPool : GameObjectPool;


public var fish:Fish;
public var current_wave_catrow_number = 0;  // dropped catrow number of current wave 
public var current_wave = 1;
public var current_wave_catrow_count = 10;  // how many row of cats this wave has


public var level_fish:GameObject;
public var level_info:TextMesh ;

public var score:int=0;
public var score_text:TextMesh;

public static var status = 0;
public static var t_scale:float=1;

public  var pauseMenu:GameObject;
public static var HDRatioH:float = 0;
public static var HDRatioW:float = 0;

public var game_over_screen:GameObject;


public var guiSkin :GUISkin;
public var font:Font;

public var game_over_bt_replay:GUITexture;
public var game_over_bt_quit: GUITexture;

public var helpboard:GameObject;
public var mask:GameObject;

// for deubg
public var debug_msg = "";

public var texts_bomber:Texture[];

function CentralContrller(){
Debug.Log("cc construct");
}
// Awake is a built-in unity function that is called called only once during the lifetime of the script instance.
// It is called after all objects are initialized.
// For more info, see:
// http://unity3d.com/support/documentation/ScriptReference/MonoBehaviour.Awake.html
function Awake(){
	//Debug.Log("cc awake");
	HDRatioH = Screen.height/480.0f;
	HDRatioW = Screen.width/320.0f;
	t_scale = Time.timeScale;
 //	m_timerManager = gameObject.AddComponent("TimerManager");
 	//m_timerManager1.initTimer(1, 11, new Rect(100, 100, 100, 100), gameObject, mySkin.customStyles[0]); 

	// Instantiate the ball pool, making sure it has capacity for twice as many balls as we're configured
	// to pre-instantiate. That way it won't have to do any array reallocations behind the scenes if
	// we grow.
	inst = this;
	texts = new Texture[20,8];
	//var a = Resources.Load("cat3");
	//Debug.Log("resource:"+a+"//");
//	texts[0] =  Resources.Load("cat3");
//	texts[1] =  Resources.Load("cat8");
//	texts[2] =  Resources.Load("cat6");
//	texts[3] =  Resources.Load("Cat10");
//	texts[0] =  Resources.Load("cat16");

//	texts[1] =  Resources.Load("cat12");
//	texts[2] =  Resources.Load("cat4");
//
//	texts[3] =  Resources.Load("Cat7");
//	texts[4] = Resources.Load("Cat11");
//	texts[5] = Resources.Load("Cat12");
//	texts[6] = Resources.Load("Cat13");
//	texts[7] = Resources.Load("Cat15");
	
//	texts[0] =  Resources.Load("c1");
//	texts[1] =  Resources.Load("c2");
//	texts[2] =  Resources.Load("c3");
//	texts[3] =  Resources.Load("c4");
//	texts[4] = Resources.Load("c5");
//	texts[5] = Resources.Load("c6");
//	texts[6] = Resources.Load("c7");
//	texts[7] = Resources.Load("c7");
	
		
//	texts[0,0] =  Resources.Load("c11");
//	texts[1,0] =  Resources.Load("c21");
//	texts[2,0] =  Resources.Load("c31");
//	texts[3,0] =  Resources.Load("c41");
//	texts[4,0] = Resources.Load("c51");
//	texts[5,0] = Resources.Load("c61");
//	texts[6,0] = Resources.Load("c71");
//	texts[7,0] = Resources.Load("c71");
	
	texts[0,0] = Resources.Load("c10psd");
	texts[1,0] = Resources.Load("c20psd");
	texts[2,0] = Resources.Load("c30psd");
	texts[3,0] = Resources.Load("c40psd");
	texts[4,0] = Resources.Load("c50psd");
	texts[5,0] = Resources.Load("c60psd");
	texts[6,0] = Resources.Load("c70psd");
//	texts[7,0] = Resources.Load("c80");
//	texts[8,0] = Resources.Load("c90");
//	texts[9,0] = Resources.Load("c100");
	texts[7,0] = Resources.Load("cb0psd");
	texts[8,0] = Resources.Load("cc0psd");
	texts[9,0] = Resources.Load("cd0psd");
	
	// above 9 is used by items
//	texts[10,0] = Resources.Load("c80");
	texts[10,0] = Resources.Load("bomber00");
	
	texts[0,1] =  Resources.Load("c11psd");
	texts[1,1] =  Resources.Load("c21psd");
	texts[2,1] =  Resources.Load("c31psd");
	texts[3,1] =  Resources.Load("c41psd");
	texts[4,1] =  Resources.Load("c51psd");
	texts[5,1] =  Resources.Load("c61psd");
//	texts[6,1] =  Resources.Load("c71psd");
	//texts[7,1] =  Resources.Load("c71");
	       
	texts[0,2] = Resources.Load("c12psd");
	texts[1,2] = Resources.Load("c22psd");
	texts[2,2] = Resources.Load("c32psd");
	texts[3,2] = Resources.Load("c42psd");
	texts[4,2] = Resources.Load("c52psd");
	texts[5,2] = Resources.Load("c62psd");
//	texts[6,2] = Resources.Load("c72psd");
	//texts[7,2] = Resources.Load("c72");
	
	texts[5,3] =  Resources.Load("c63psd");
	texts[5,4] =  Resources.Load("c64psd");
	texts[5,5] =  Resources.Load("c65psd");
	
//	Debug.Log("t1:"+texts[0]+",t2:"+texts[1]);
	ballPool = GameObjectPool(ballPrefab, numberOfBallsToPreInstantiate*2, InitializeGameObject, false);
	ballPool.PrePopulate(numberOfBallsToPreInstantiate);
	
	top_row = new Cat[catrow_size];
	
	level_fish.transform.position.y = 15;
	
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

function getPath(){
	return Application.persistentDataPath+"/";
 	var path="";
  if(Application.platform==RuntimePlatform.IPhonePlayer) {
   	path= Application.dataPath.Substring (0, Application.dataPath.Length - 5);
    path = path.Substring(0, path.LastIndexOf('/'))+"/Documents/"; 
   }
   else {
      path=Application.dataPath+"/Resource/GameData/"; 
      }
   return path; 
   
}

function  LoadDataFromFile(txtName) {
var ret = "";
 var path=getPath()+txtName; 
 if(File.Exists(path)) {
/*  	var fs =new FileStream(path,FileMode.Open); 
	var sr:StreamReader =new StreamReader(fs); 
  	FileData = JsonMapper.ToObject(sr.ReadToEnd());
  	 sr.Close();
    fs.Close();*/
    var sr =  new File.OpenText(path);
var    input = ""; 
 
		  while (true) { 
		 
		    input = sr.ReadLine(); 
		 
		    if (input == null) { break; } 
		 
		 //   Debug.Log("line="+input); 
		 	ret += input;
		  } 
		 
		  sr.Close(); 
	}
    else {
  	 //    Debug.Log("No json "); 
     }  	      
     return ret; 
}
function WriteDataToFile( txtName:String, content:String) { 
	var path=getPath()+txtName;
 /*	//FileStream fs;
 	 if(!File.Exists(path)) { 
 		 fs=new FileStream(path,FileMode.Create); 
 	 } else { 
 	 	fs=new FileStream(path,FileMode.Truncate);
 	 }
 //	 StreamWriter sw=new StreamWriter(fs); 
 	// sw.Write(content); sw.Close(); fs.Close();*/
 	 
  var fileWriter = File.CreateText(path); 
  fileWriter.Write(content, content.Length);
 
  fileWriter.Close(); 
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

//	water.renderer.material.color.a = 0.1f;
	// create first cat row
	var i = 0;

//
//	if (PlayerPrefs.GetString("firtrun", "") == ""){
//		onHelp();
//	 	PlayerPrefs.SetString("firstrun", "1"); 
//	}
//		
	debug_msg = getPath()+"usersettings";
	var data = "";
	try{
//		var data:SaveDeck = SaveNLoad.Load(Application.persistentDataPath+"/usersettings");
//		var data:SaveDeck = SaveNLoad.Load(getPath()+"usersettings");
		data = LoadDataFromFile("usersettings");
	}
	catch (ae){
	debug_msg += ae;
	//	data = null;
	}

//	Debug.Log("user data:"+ data.intValue1);
	if (data == null || data == ""){
		onHelp();
//		var localData = new SaveDeck();
//		localData.intValue1 = 1;
		try{
//		SaveNLoad.Save(Application.persistentDataPath+"/usersettings", localData);
//		SaveNLoad.Save(getPath()+"usersettings", localData);
		WriteDataToFile("usersettings", "1");
		}catch(ae){
		debug_msg += ae;
		}
	}
	


//	localData.boolValue1 = dead;
//
//	localData.stringValue1 = name;
//
//	localData.stringArray1 = array;

	var ret_cat = CreateCatRowAtPos(5);
	current_wave_catrow_number++;
	fish.playAni(10);
//	yield WaitForSeconds(0.1f); // give chance to cat to run Start(), in which the status will be set to 0
//	for ( i = 0; i< catrow_size; i++){
//		ret_cat[i].setStatus(1);
//	}
	ret_cat =CreateCatRowAtPos(3);
	current_wave_catrow_number++;
	fish.playAni(10);
//	yield WaitForSeconds(1); // give chance to cat to run Start(), in which the status will be set to 0
//	for ( i = 0; i< catrow_size; i++){
//		ret_cat[i].setStatus(0.1f);
//	}
	while (status != 0){
		yield WaitForSeconds(1);
	}
	  
	playani_level();
	CreateCatRow();
	current_wave_catrow_number++;
	fish.playAni(10);
	yield WaitForSeconds(1); // give chance to cat to run Start(), in which the status will be set to 0
	for ( i = 0; i< catrow_size; i++){
		top_row[i].setStatus(1);
		top_row[i] = null;
	}


	CreateCatRow();
	current_wave_catrow_number++;
	fish.playAni(10);
	//Debug.Log("time scale "+ Time.timeScale + ", status " + status);

	
	var gameover = true;
//	while (current_wave_catrow_number < current_wave_catrow_count){
	while (true){
		yield WaitForSeconds (interval);
		gameover = true;
		if (top_row != null && top_row.length==catrow_size){
			for ( i = 0; i< catrow_size; i++){
				if (top_row[i] != null && Cat.matrix[i,catcol_size-1] == null){ //  the 9th position is empty
			//		top_row[i].transform.position = new Vector3(i-3, catcol_size-1, catrow_size-i);
					
					// releaae the cat in top row
					top_row[i].ShakeAndDrop();
		
					top_row[i] = null;
					gameover = false;
				}
			}
		}
		yield WaitForSeconds(2);
		if (!gameover){
			CreateCatRow();
			fish.playAni(10); // show progress
			current_wave_catrow_number++;
			if (current_wave_catrow_number >= 10){ // next level
				current_wave_catrow_number = 0;
				current_wave += 1;
				//Cat.speed += 2;
//				if (interval > 5)
//					interval -= interval/8.0f;
				interval = 5.0f;
				
				StartCoroutine("playani_level");
				fish.reset();
			}
		}
		else{
			game_over();
			break;
		}

	}
	

}

function game_over(){
	fish.active = false;
	status = 2;
	while (game_over_screen.transform.position.y > 10.0f){
		game_over_screen.transform.position.y -= 2;
		yield;
	}
	game_over_screen.transform.position.y = 10.0f;
}

function playani_level(){

	//level_fish.renderer.guiText.text = "afasdf";
	//var li:TextMesh = GameObject.Find("levelinfo");
	var level_number = current_wave + 1;
//	Debug.Log("level "+ level_number);
	level_info.renderer.material.color= new Color(0.9f, 0.3f, 0.3f, 1.0f);

	if (level_number < 10)
		level_info.text = "         "+ level_number;
	else
		level_info.text = "        "+ level_number;
//	level_info.text = "        49";
		while (true){
			level_fish.transform.position.y -= 2;
			if (level_fish.transform	.position	.y	 <=5.5f){
				level_fish.transform.position.y = 5.5f;
				break;
			}
			yield WaitForSeconds(0.1f);
		}
		yield WaitForSeconds(2);
		level_fish.transform.position.y = 15;
}

function CreateCatRowAtPos(y:int){
	var ret = new Cat[catrow_size];
	for (var i = 0; i < catrow_size; i++){
			var spawnPoint = Vector3(i-3, y, 1+catrow_size-i);
	 		var cat = createRandomCat(spawnPoint);
	 		cat.setStatus(1);
	 		ret[i] = cat;
		
	}
	return ret;
}

function CreateCatRow(){
 	//top_row = new Cat[catrow_size];s
	for (var i = 0; i < catrow_size; i++){
		if (top_row[i] == null){
			var spawnPoint = Vector3(i-3, 10.5, 1+catrow_size-i);
			top_row[i] = createRandomCat(spawnPoint);
		}
	}
}




// Tells each ball who we are.
function InitializeGameObject(target : GameObject){
	target.SendMessage ("SetCentralController", this, SendMessageOptions.DontRequireReceiver);

	//target.ndex = i;
	target.tag = "cat";
	

}

static function HDRect(x:float,y:float,w:float,h:float){
	if (HDRatioH == 0)
			HDRatioH = Screen.height/480.0f;
	if (HDRatioW == 0)
		HDRatioW = Screen.width/320.0f;
	return Rect(x*HDRatioW, y*HDRatioH, w*HDRatioW, h*HDRatioH);

}
// OnGUI is a built-in unity function. All our button/label logic goes here.
// For more info, see:
// http://unity3d.com/support/documentation/Components/GUI%20Scripting%20Guide.html
function OnGUI(){
	GUI.skin = guiSkin;

	GUI.depth = 0;
	var bMask = false;
//		GUI.Label (Rect (0,0,Screen.width,Screen.height), debug_msg);
	/*for (var l = -3; l < -3; l++)
		Debug.DrawLine (new Vector3(l,0,-5), new Vector3 (l, 10, -5), Color.red);
	for ( l = 0; l < 10; l++)
		Debug.DrawLine (new Vector3(-10,l,-5), new Vector3 (10, l, -5), Color.red);
		*/
//		   DrawLine.DrawLine(new Vectro2(0,0), pointB, color, width);
	// Display a button that allows the user to spawn a ball at a random location.
/*	if (GUI.Button (Rect (5, 5, 90, 40), "Spawn Ball")) {
		SpawnBall();
		//Debug.Log("fire");
	}
	GUI.Label (Rect (Screen.width - 100,0,100,20), "Balls in Pool: " + ballPool.GetAvailableCount());
	GUI.Label (Rect (Screen.width - 98,15,100,20), "Active Balls: " + ballPool.GetActiveCount());*/
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
	
	
	// Level and Score
	var color = Color (0.7, 0.7, 0.1, 1); // text color
	var pcolor = Color (0, 0, 0, 1); // strike color
	//GUI.Label(HDRect(15, 449, 100, 20), "Level "+ current_wave);
	  MakeStroke(HDRect(15, 448, 100, 20), "Level ", color, pcolor, 1);  
	  
	 color = Color (1.0, 1.0, 0.7, 1); // text color 
	 MakeStroke(HDRect(55, 448, 100, 30), ""+ (current_wave+1), color, pcolor, 1); 
	
	
	color = Color (0.7, 0.7, 0.1, 1); // text color	
	//GUI.Label(HDRect(230, 445, 100, 20), "Score ");
	 MakeStroke(HDRect(230, 444, 100, 20), "Score ", color, pcolor, 1);  
	
	
	//GUI.Label(HDRect(275, 445, 100, 20), ""+score);
	GUI.skin.label.alignment = TextAnchor.UpperRight;
	 color = Color (1.0, 1.0, 0.7, 1); // text color
	MakeStroke(HDRect(260, 442, 50, 30),  ""+score, color, pcolor, 1); 
	
	GUI.skin.label.alignment = TextAnchor.UpperLeft;
	
		 
		 
	var blankStyle = new GUIStyle();
	if (status == 0) {// playing
		if (GUI.Button (HDRect (0, 90, 30, 30), "", blankStyle)) {
//			t_scale = Time.timeScale;
//			Time.timeScale = 0;
//			status = 1; // paused
//			StartCoroutine("showPauseMenu");
			pause();
		}
	
			//GUI.skin.label.fontSize = 0;
	}else if (status == 1){ // paused
		if (GUI.Button (HDRect (65, 183, 170, 45), "" , blankStyle )){ // resume
			onResume();
		}
		if (GUI.Button (HDRect (65, 233, 170, 45), "", blankStyle) ){ // replay
			onReplay();
		}
	
		if (GUI.Button (HDRect (65, 283, 170, 45), "",blankStyle ) ){ // help
			onHelp();
		}
	
		if (GUI.Button (HDRect (65, 333, 170, 45), "",  blankStyle) ){ // quit
			onQuit();
		}
	
	}else if (status == 2){ // game just over
	
		bMask = true;
		game_over_bt_replay.active = true;
		game_over_bt_quit.active = true;
		
		game_over_bt_replay.transform.localScale.x = 0.08;
		game_over_bt_replay.transform.localScale.y = 0.034;
		game_over_bt_replay.transform.localScale.z = 0.05;
		
		game_over_bt_quit.transform.localScale.x = 0.08;
		game_over_bt_quit.transform.localScale.y = 0.034;
		game_over_bt_quit.transform.localScale.z = 0.05;
		
		//GUI.skin.font = font;
		//GUI.skin.label.font = font;
		//GUI.skin.label.fontSize = 50;
		var style : GUIStyle = new GUIStyle();
		style.font = font;
		style.normal.textColor = Color.red;
		//style.fontSize = 20;
		//GUI.Box(Rect(0, 0, Screen.width, Screen.height), "");
		
		var f = GUI.skin.label.font ;
		GUI.skin.label.font = font;
		 color = Color (0.9, 0.9, 0.1, 1); // text color
		 pcolor = Color (0, 0, 0, 1); // strike color
		MakeStroke(HDRect(80, 250, 100, 50), "Level ", color, pcolor, 1); 
	//	GUI.Label(HDRect(80, 250, 100, 50), "Level", style);
		MakeStroke(HDRect(200, 250, 100, 50), ""+(current_wave+1), color, pcolor, 1); 
	//	GUI.Label(HDRect(200, 250, 100, 50), ""+current_wave, style);
		
		MakeStroke(HDRect(80, 300, 100, 50), "Score ", color, pcolor, 1); 
//		GUI.Label(HDRect(80, 300, 100, 50), "Score", style);
		MakeStroke(HDRect(200, 300, 100, 50), ""+score, color, pcolor, 1); 
//		GUI.Label(HDRect(200, 300, 100, 50), ""+score, style);

		GUI.skin.label.font  = f;

		if (GUI.Button(HDRect(60, 360, 70, 55), "", blankStyle)){
			onReplay();
		}
		if (GUI.Button(HDRect(170, 360, 70, 55), "", blankStyle)){
			onQuit();	
		}

	}else if (status == 3){ // on help view
		  if ( Input.anyKeyDown ){
//		  	status = 0;
		  	helpboard.transform.position.x = -50;
		  	onResume();
		  }
	  }
	  mask.active = bMask;
}
function MakeStroke(position : Rect, txt:String, txtColor, outlineColor, outlineWidth:float ){ 
	var x = position.x;
	var y = position.y;
	   GUI.color=outlineColor;  
	
    // top
//    position.y-=outlineWidth;  
// 
//    GUI.Label(position, txt);  
    
    // down
    position.y = y+outlineWidth;  
    GUI.Label(position, txt); 
    
     // left
//    position.y-=outlineWidth;  
//    position.x-=outlineWidth;  
//    GUI.Label(position, txt);  
    
    // right
    position.x=x+outlineWidth;  
    GUI.Label(position, txt);
      
	position.x = x;  
	position.y = y;
    GUI.color=txtColor;  
    GUI.Label(position, txt);  
  

}  
 function pause(){
	if (status == 0) {// playing
	
			t_scale = Time.timeScale;
			Time.timeScale = 0;
			status = 1; // paused
			StartCoroutine("showPauseMenu");
		
	}

}
function onHelp(){
		//Time.timeScale = t_scale;
	//	status = 0;
		//yield hidePauseMenu();
//			StartCoroutine("hidePauseMenu");
	helpboard.transform.position.x = 0;
	status = 3; 
}

function onResume(){
	Time.timeScale = t_scale;
	

	//StartCoroutine("hidePauseMenu");
	yield hidePauseMenu();
	status = 0; 
}

function onReplay(){
	
	
	Time.timeScale = t_scale;
	

	//StartCoroutine("hidePauseMenu");
	yield hidePauseMenu();
	status = 0; 
	Debug.Log("load  level 1");
 
	Application.LoadLevel(1);
}
function onQuit(){
	
	Time.timeScale = t_scale;
	

	//StartCoroutine("hidePauseMenu");
	yield hidePauseMenu();
	status = 0; 
	Debug.Log("load  level 1");
 
	Application.LoadLevel(0);
}
function showPauseMenu(){
	while (pauseMenu.renderer.transform.position.x <-0.36f){
		pauseMenu.renderer.transform.position.x += 1.5f;
		yield;
	}

	pauseMenu.renderer.transform.position.x = -0.36f;

}

function hidePauseMenu(){
//Debug.Log("hidepausemenu");
	while (pauseMenu.renderer.transform.position.x > -10.0f){
		pauseMenu.renderer.transform.position.x -= 1.5f;
		yield;
	}

	pauseMenu.renderer.transform.position.x = -10.0f;
//Debug.Log("leave hidepausemenu");
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

function createRandomCat(spawnPoint:Vector3){
	// selet cat type
	var i = 0;
	var l = 6;
	
	if (current_wave > 9){
		l = 10;
	}else
	if (current_wave > 8){
		l = 9;
	}else
	if ( current_wave > 5){
		l = 8;
	}else if (current_wave > 2){
		l = 7;
	}
	
//	l =10;

	i = Random.Range(0, l);
	return createCat(i, spawnPoint);
}
function createCat(type:int, spawnPoint:Vector3){
	
	
	var i = type;
	
	// Place a ball there and activate it
	var o:GameObject = ballPool.Spawn(spawnPoint, Quaternion.identity);
//	o.transform.Rotate(new Vector3(270, 0, 0));
	var c:Cat = o.GetComponent("Cat");
	var t:Texture =  texts[i,0];
	if (t == null)
		t = mt;
	o.renderer.material.mainTexture = t;
	o.renderer.material.mainTexture.wrapMode =  TextureWrapMode.Clamp;
	
	c.ani = [texts[i,0],texts[i,1],texts[i,2]];
//	var s:cat= target.GetComponent("Cat");
	c.catType = i;
	
	c.setStatus(0);
	c.mf_x = spawnPoint.x;
	c.mf_y = spawnPoint.y;
	c.time_connected = 0;
	c.time_offset = 0;
	c. firstDropHit = true;
	
	Debug.Log("create cat at "+ spawnPoint);
	return c;
}

function SpawnBall(){
	// Pick a random location
	var x:float = Random.Range(-2.9, 2.9);
	var ix:int = x;
	var spawnPoint = Vector3(ix, top, 0.0);
	
	var c:Cat = createRandomCat(spawnPoint);
//	c.setStatus(1);
	
}



function UnspawnBall(ball : GameObject){
	ballPool.Unspawn(ball);
}

function explodeBlack(pos:Vector3, rot:Quaternion){
	var i:GameObject = GameObject.Instantiate(pf_explorsion, pos, rot);
	
	var particleAnimator : ParticleAnimator = i.GetComponent(ParticleAnimator);
	 var modifiedColors : Color[] = particleAnimator.colorAnimation;
	 modifiedColors[0] = Color.black;
	 modifiedColors[1] = Color.black;
    modifiedColors[2] = Color.black;
    	particleAnimator.colorAnimation = modifiedColors;
    i.particleEmitter.renderer.material.color= Color.red;
    i.particleEmitter.Emit();
}

function explode(pos:Vector3 , rot:Quaternion ){
	var i:GameObject = GameObject.Instantiate(pf_explorsion, pos, rot);
	

    i.particleEmitter.Emit();


}	

function splashFur(pos:Vector3 , rot:Quaternion, play_audio ){
	var i:GameObject = GameObject.Instantiate(pf_feather, pos, rot);
	if (play_audio && Random.Range(0, 10) > 5){
		
		var c:CatFurAudio = i.GetComponent("CatFurAudio");
		c.playAudio();
	}
}	