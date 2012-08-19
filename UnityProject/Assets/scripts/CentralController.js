#pragma strict

// The ball prefab that will be used to create balls on demand.
var ballPrefab : GameObject;
// The number of balls that will be created but deactivated up front.
var numberOfBallsToPreInstantiate = 5;
// The floor object.
var floor : GameObject;

var top=3;

// Our handy-dandy pool, which allows us to reuse objects without creating/destroying them.
private var ballPool : GameObjectPool;

// Awake is a built-in unity function that is called called only once during the lifetime of the script instance.
// It is called after all objects are initialized.
// For more info, see:
// http://unity3d.com/support/documentation/ScriptReference/MonoBehaviour.Awake.html
function Awake(){
	// Instantiate the ball pool, making sure it has capacity for twice as many balls as we're configured
	// to pre-instantiate. That way it won't have to do any array reallocations behind the scenes if
	// we grow.
	ballPool = GameObjectPool(ballPrefab, numberOfBallsToPreInstantiate*2, InitializeGameObject, false);
	ballPool.PrePopulate(numberOfBallsToPreInstantiate);
}

// Tells each ball who we are.
function InitializeGameObject(target : GameObject){
	target.SendMessage ("SetCentralController", this, SendMessageOptions.DontRequireReceiver);
}

// OnGUI is a built-in unity function. All our button/label logic goes here.
// For more info, see:
// http://unity3d.com/support/documentation/Components/GUI%20Scripting%20Guide.html
function OnGUI(){
	// Display a button that allows the user to spawn a ball at a random location.
	if (GUI.Button (Rect (5, 5, 90, 40), "Spawn Ball")) {
		SpawnBall();
	}
	GUI.Label (Rect (Screen.width - 100,0,100,20), "Balls in Pool: " + ballPool.GetAvailableCount());
	GUI.Label (Rect (Screen.width - 98,15,100,20), "Active Balls: " + ballPool.GetActiveCount());
	//Debug.Log("on gui");
	   for (var i = 0; i < Input.touchCount; ++i) {
        if (Input.GetTouch(i).phase == TouchPhase.Began) {
           Debug.Log("touched");
        }
    }
}

function SpawnBall(){
	// Pick a random location
	var x:float = Random.Range(-2.9, 2.9);
	var ix:int = x;
	var spawnPoint = Vector3(ix, top, 0.0);
	// Place a ball there and activate it
	ballPool.Spawn(spawnPoint, Quaternion.identity);
}

function UnspawnBall(ball : GameObject){
	ballPool.Unspawn(ball);
}

function update(){
Debug.Log("update");
   for (var i = 0; i < Input.touchCount; ++i) {
        if (Input.GetTouch(i).phase == TouchPhase.Began) {
           Debug.Log("touched");
        }
    }
}