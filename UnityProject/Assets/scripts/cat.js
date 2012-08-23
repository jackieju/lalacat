
//class cat extends MonoBehaviour{
public var speed:float=5;
public var status:int; // 0: initial status 1: free drop 2: fixed 3: draging 4: blocked when draging
public var catType:int;
public static var matrix:Object[,] = new Object[20,20];

// position in matrix
private var mi_x:int;
private var mi_y:int;

// standarized position
public var mf_x:float;
public var mf_y:float;

public static var aniPlayer: AnimationPlayer;

function start(){
	status = 0; // before drop
}


function Update () {
	
	//Debug.Log("update cat");
	//var a = Input.GetAxisRaw("Vertical");

	if (status  == 1){
		var distance = speed * Time.deltaTime;
		
		
		var iy:int = transform.position.y - distance -0.5f - 0.5f; // 0.5f: half size, 0.5f: floor is 0.5
		var ix:int = transform.position.x + 3.0f + 0.5f;  // 0.5: ix start from -0.5
		 
		Debug.Log("updat cat "+name+" distance="+distance+ ", pos="+transform.position+ ",ix="+ix+", iy="+iy);
		if (iy <= 0 ){// hit floor
			Debug.Log("hit floor while free dropping");
	        iy = 0;
		
			while (Cat.matrix	[ix,iy] != null && iy < 9)
				iy += 1;
			mf_x = transform.position.x = ix-3;
		//	mf_y = transform.position.y = iy+0.5f+0.5f;
			mf_y = transform.position.y = iy+1.0f;
			status = 2;
			putIntoMatrix();
		}else
		
		if (Cat.matrix	[ix,iy] != null){ // hit cat
			while (Cat.matrix	[ix,iy] != null && iy < 9)
				iy += 1;
			mf_x = transform.position.x = ix-3;
			mf_y = transform.position.y = iy+1.0f;
			//mf_y = transform.position.y = iy+1.5f+0.5f; // 1.0f revert one grid, 0.5f: y start from 0.5f
			status = 2;
			putIntoMatrix();
		}
		else{ // free drop
			transform.Translate(Vector3.down*distance);
	
			mf_x = transform.position.x;
			mf_y = transform.position.y;
		
		}
		/*if (transform.position	.y	<0){
		Debug.Log("hit floor2 while free dropping");
			     transform.position = new Vector3( transform.position.x, 0.5, transform.position.z);
			     putIntoMatrix();
			     status = 2;
		}*/
		
	}
}
function playAnimationOnce(index){
	aniPlayer.playOnce(this, catType, index);
}
/*
function OnCollisionEnter(obj:Collision)
{
	  //  for (var contact : ContactPoint in obj.contacts) {
        //print(contact.thisCollider.name + " hit " + contact.otherCollider.name);
        // Visualize the contact point
        //Debug.DrawRay(contact.point, contact.normal, Color.white);
    //}
      Debug.Log("collide "+obj.gameObject.name + ", normal="+obj.contacts[0].normal+", speed="+obj.relativeVelocity+"," + "position:"+transform.position.x +","+transform.position.y);
	  var i = 0;
	  for (i =0; i< obj.contacts.length;i++)
	//  	Debug.Log("contacts["+i+"]="+obj.contacts[i].normal);
  //   if (obj.relativeVelocity.magnitude > 0)
 	if (obj.contacts.Length>3 && obj.contacts[0].normal.y == 1.0f){
 	Debug.Log("hold");
        status = 2;
        var y:float=0;
        if (obj.transform	.position	.y	 == 0)
        	y = 0.5f;
        else
        	
         y= obj.transform.position.y+1.0f;
        transform.position = new Vector3( transform.position.x, y, transform.position.z);
     }
}*/
/*
function OnTriggerEnter(obj:Collider){

  //    Debug.Log("collide2 "+obj.gameObject.name + ", normal="+obj.contacts[0].normal+", speed="+obj.relativeVelocity+"," + "position:"+transform.position.x +","+transform.position.y);
	Debug.Log("OnTriggerEnter:"+obj.name+", position:"+obj.transform.position);
	
	     // status = 2;
      //  var y:float=0;
       // if (obj.transform	.position	.y	 == 0)
        	//y = 0.5f;
        //else
         //y= obj.transform.position.y+1.0f;
         
      //  transform.position = new Vector3( transform.position.x, y, transform.position.z);
  //    var ray : Ray = Camera.main.ScreenPointToRay (Input.mousePosition);
  	var c:Cat = obj.GetComponent("Cat");
  	if (c != null &&( c.status == 3 && status == 2)){
  		Debug.Log("set status=4");
  		c.status = 4;
  		return;
  	}
  	 // draw one ray from current position down to floor, if hit the clider then fix position
      var ray:Ray = Ray(transform.position, new Vector3(0, -1, 0));
      var hit : RaycastHit;
      if (obj.Raycast (ray, hit, 100.0)) {
      	Debug.Log("hit "+ obj.tag);
        Debug.DrawLine (ray.origin, hit.point);
        if (obj.tag == "cat"){
    	
			if (c.status == 2){ // if hiting fixed cat
		        putIntoMatrix(); // fix current cat
		        status = 2;
		    }else{
		    	if (c.status != 3 && c.status != 4) // if hiting free-droping cat
		       		 transform.position = new Vector3( transform.position.x, transform.position.y+0.5f, transform.position.z);
		    }
        }else{
       	  		putIntoMatrix();
		        status = 2;
        }
    }
    Debug.Log("leave onTriggerEnter");
}
*/

function floatToPos(pos:Vector3){
	var ix:int = pos.x + 0.5 +3.0f;// 3: ix start from -3, 0.5: fx start from -0.5
	var iy:int = pos.y -0.5f;
	return new Vector3(ix, iy, 0);
}


function playAni(index){
	
	Cat.aniPlayer.playOnce(this, catType, index);
}

function playAniShake(){
	//Cat.aniPlayer.shake(this);
	
	
	//gameObject.guiTexture.pixelInset.y = 	gameObject.guiTexture.pixelInset.x - 10;
	//yield;
	//gameObject.guiTexture.pixelInset.y = 	gameObject.guiTexture.pixelInset.x + 20;
	//yield;
	//gameObject.guiTexture.pixelInset.y = 	gameObject.guiTexture.pixelInset.x - 10;
	while (true){
	renderer.material.mainTextureOffset= new Vector2(-0.03,0);
	yield WaitForSeconds(0.03);
	renderer.material.mainTextureOffset= new Vector2(0.03,0);
	yield WaitForSeconds(0.03);
	renderer.material.mainTextureOffset= new Vector2(-0.03,0);
	yield WaitForSeconds(0.03);
	}
	Debug.Log("shake");
}

function putIntoMatrix(){
	

	var y:int = transform.position.y;
	var x:int;
	var pos = floatToPos(transform.position);
	
	//x = transform.position.x+3.5f; // 3: ix start from -3, 0.5: fx start from -0.5

	Debug.Log("pos="+transform.position);	
	
	Debug.Log("matrix["+x+"]["+y+"]="+ this.name);	
	
	Cat.matrix[pos.x, pos.y] = this;
	
	mi_x = pos.x;
	mi_y = pos.y;
	mf_x = pos.x-3.0f;
	mf_y = pos.y + 1.0f;

	// fix position.y
	transform.position.y = mf_y;
	
	// check explorion
	//if (Cat.matrix[x+1]
	var ary_found = new Array();
	findSame(ary_found, pos.x, pos.y);
	if (ary_found	.length>=3){
		var affected_col = new Array();
		Debug.Log("found "+ary_found.Count + " connected");
		for (var i =0; i< ary_found.length; i++){
			
			// eleminate it
			//	ary_found[i].destroy();
			var o:Cat = ary_found[i];
			o.remove();
		
			o.status = 0;
			Cat.matrix[o.mi_x, o.mi_y] = null;
			
//			// pull down above cat
//			for (var j=o.mi_y+1; j< 10; j++){
//				var c:Cat = Cat.matrix[o.mi_x,j];
//				if (c != null){
//					c.status = 1;
//					Cat.matrix[o.mi_x,j]=null;
//					c.transform.position = new Vector3( c.transform.position.x, c.transform.position.y+0.5f*j, c.transform.position.z); 
//				}
//			}
//			var j = 0;
//			for ( j= 0; j < affected_col.length; j++){
//				if (affected_col	[j] == o.mi_x)
//					break;
//			}
//			if (j == affected_col	.length	){
//				affected_col.push(o.mi_x);
//			}
		}
//		for ( i = 0; i < affected_col.length;i++){
//		
//			
//		
//		}
		
	}

}
function remove(){
	playAniShake();
	yield WaitForSeconds(0.5);
	CentralController.inst.explode(gameObject.transform.position, gameObject.transform.rotation);
	CentralController.inst.UnspawnBall(gameObject);
	// pull down above
	for (var j=mi_y+1; j< 10; j++){
		var c:Cat = Cat.matrix[mi_x,j];
		if (c != null){
			c.status = 1;
			Cat.matrix[mi_x,j]=null;
			c.transform.position = new Vector3( c.transform.position.x, c.transform.position.y+0.5f*j, c.transform.position.z); 
		}
	}
}

function addCatToAry(ary:Array, c:Cat){
	for (var i = 0; i< ary.length; i++){
	var v:Cat = ary[i];
	if (v.name == c.name)
		return false;
	}
	ary.push(c);
	return true;
}
function findSame(ary_found, x:int, y:int){
	var self:Cat = Cat.matrix[x,y];
	var up:Cat = null;
	var down:Cat = null;
	var left:Cat = null;
	var right:Cat = null;
	if (x>0)
		left = Cat.matrix[x-1,y];
	if (y> 0)
		down = Cat.matrix[x, y-1];
	if (x<Cat.matrix.Length	-1)
		right = Cat.matrix[x+1, y];
	if (y<10-1)
		up= Cat.matrix[x,y+1];
		
	var n = left;
	if (n != null && self.catType == n.catType){
		if (addCatToAry(ary_found, n))
		findSame(ary_found, x-1, y);
	}
	 n = right;
	if (n != null && self.catType == n.catType){
		 if (addCatToAry(ary_found, n))
		findSame(ary_found, x+1, y);
	}
		 n = up;
	if (n != null && self.catType == n.catType){
		if (addCatToAry(ary_found, n))
		findSame(ary_found, x, y+1);
	}
		 n = down;
	if (n != null && self.catType == n.catType){
		 if (addCatToAry(ary_found, n))
		findSame(ary_found, x, y-1);
	}
	 return;
	
}




//}


