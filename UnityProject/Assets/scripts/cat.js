
//class cat extends MonoBehaviour{
public static var  speed:float=50; // distance = speed * Time.deltaTime;
private var status:int; // 0: initial status 1: free drop 2: fixed 3: draging 4: blocked when draging
public var catType:int;
public static var matrix:Object[,] = new Object[20,20];

// position in matrix
public var mi_x:int;
public var mi_y:int;

// standarized real position
public var mf_x:float;
public var mf_y:float;

public static var aniPlayer: AnimationPlayer;


public var ani:Texture[] = new Texture[3];

//var rand_t:float = 10;

public var time_connected:float = 0;
public var time_offset:float = 0;

public var firstDropHit = true;

function setStatus(s:int){
	status = s;
}
function Start(){
//	status = 0; // before drop
	time_connected = time_offset = 0;
	renderer.material.mainTexture = ani[0];
	if (ani[1] != null)
		StartCoroutine("playani");
}

function playani(){

	for (var i = 0; i< ani.Length; i++) {
		if (ani[i] == null)
			break;
	}
	if ( i < 2 ) // only one texture
		return;
	
	var playTime = 0.25 + i*0.1f; 
	if (i > 3){
		playTime = 0.25 + i*0.25f;
	}
	while (true){
		//rand_t = rand_t - Time.deltaTime;
		//Debug.Log("======>play cat1-"+this.name+" ani, "+rand_t + "-" +Time.deltaTime);
		//if ( rand_t	< 0){
							yield WaitForSeconds( Random.Range(5, 20));
								var index : int;
	var startTime = 0.0f;
	
	while(startTime <= playTime)
	{
		index = (startTime * ani.Length / playTime +1) % ani.Length;
		renderer.material.mainTexture = ani[index];
		startTime = startTime + Time.deltaTime;
		yield;
	}
		/*	if (ani[1] != null)
				renderer.material.mainTexture = ani[1];
			yield;
	
			if (ani[2] != null)
				renderer.material.mainTexture = ani[2];
			yield;
					
			renderer.material.mainTexture = ani[0];
			yield;
		
			rand_t = Random.Range(1, 10);
	
			//Debug.Log("======>rand_t="+rand_t);*/
			
	//	}
	
	
	}

}

function Update () {
	
	//Debug.Log("update cat "+ name+", status="+status);
	//var a = Input.GetAxisRaw("Vertical");

	if (status  == 1){
		var distance = speed * Time.deltaTime;
		
		
		var iy:int = transform.position.y - distance -0.5f - 0.5f; // 0.5f: half size, 0.5f: floor is 0.5
		var ix:int = transform.position.x + 3.0f + 0.5f;  // 0.5: pos of ix range from n-0.5 to n+0.5
		 if (ix > 6)
		  	ix = 6;
		//Debug.Log("updat cat "+name+" distance="+distance+ ", position="+transform.position+ ",ix="+ix+", iy="+iy);
		if (iy <= 0 ){// hit floor
//			Debug.Log("hit floor while free dropping");
	        iy = 0;
		
			if (Cat.matrix	[ix,iy] != this){
				while (Cat.matrix	[ix,iy] != null && iy < 9)
					iy += 1;
			}
			mf_x = transform.position.x = ix-3;
		//	mf_y = transform.position.y = iy+0.5f+0.5f;
			mf_y = transform.position.y = iy+1.0f;
			status = 2;
			putIntoMatrix();
		}else
		
		if (Cat.matrix	[ix,iy] != null){ // hit cat
//			Debug.Log("this cat "+ this+" hit cat "+ix+","+iy+":"+Cat.matrix	[ix,iy]);
			if (Cat.matrix	[ix,iy] != this){
				while (Cat.matrix	[ix,iy] != null && iy < 9)
					iy += 1;
			}
			mf_x = transform.position.x = ix-3;
			mf_y = transform.position.y = iy+1.0f;
			//mf_y = transform.position.y = iy+1.5f+0.5f; // 1.0f revert one grid, 0.5f: y start from 0.5f
			status = 2;
			putIntoMatrix();
		}
		else{ // free drop
			//Debug.Log("free drop "+Vector3.down*distance);
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
function playAniOnce(texts:Texture[], playTime:float){
	var index : int;
	var startTime = 0.0f;
	while(startTime <= playTime)
	{
		index = (startTime * (texts.Length / playTime) ) % texts.Length;
		gameObject.renderer.material.mainTexture = texts[index];
		startTime = startTime + Time.deltaTime;
		yield;
	}
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

static function floatToPos(pos:Vector3){
	var ix:int = pos.x + 0.5 +3.0f;// 3: ix start from -3, 0.5: fx start from -0.5
	var iy:int = pos.y - 0.5f;
	return new Vector3(ix, iy, pos.z);
}

static function posToFloat(pos:Vector3){
	return new Vector3(pos.x-3.0f, pos.y +1.0f, pos.z);	
}


function playAni(index){
	
	Cat.aniPlayer.playOnce(this, catType, index);
}
function ShakeAndDrop(){
	yield playAniShake(1);
	

	status = 1;

}

function shakeAndExplode(span:float){
	playAniShake(span);
	explode();
}
function playAniShake(span:float){
	//Cat.aniPlayer.shake(this);
	
	var t:float = 0;
	
	//gameObject.guiTexture.pixelInset.y = 	gameObject.guiTexture.pixelInset.x - 10;
	//yield;
	//gameObject.guiTexture.pixelInset.y = 	gameObject.guiTexture.pixelInset.x + 20;
	//yield;
	//gameObject.guiTexture.pixelInset.y = 	gameObject.guiTexture.pixelInset.x - 10;
	while (true){
		renderer.material.mainTextureOffset= new Vector2(-0.03,0);
		yield WaitForSeconds(0.01);
		t += Time.deltaTime;
		renderer.material.mainTextureOffset= new Vector2(0.03,0);
		yield WaitForSeconds(0.01);
			t += Time.deltaTime;
		renderer.material.mainTextureOffset= new Vector2(-0.03,0);
		yield WaitForSeconds(0.01);
			t += Time.deltaTime;
		if (span >0){
		
			if (t > span){
				break;
			}
		}
	}
//	Debug.Log("shake");
}

function putIntoMatrix(){
	


	var pos = floatToPos(transform.position);
	var x:int = pos.x;
	var y:int = pos.y;
	//x = transform.position.x+3.5f; // 3: ix start from -3, 0.5: fx start from -0.5

	//Debug.Log("pos="+transform.position);	
	
	//Debug.Log("matrix["+x+"]["+y+"]="+ this.name);	
	
	Cat.matrix[pos.x, pos.y] = this;
	
	mi_x = pos.x;
	mi_y = pos.y;
	mf_x = pos.x-3.0f;
	mf_y = pos.y + 1.0f;

	// fix position.y
	transform.position.y = mf_y;
	
	// set position.z
	transform.position.z = (7-pos.x)*1.0f + 0.1f*pos.y;
	if (catType < 10){
	
		CentralController.inst.splashFur(gameObject.transform.position, gameObject.transform.rotation, !firstDropHit);
		firstDropHit = false;
		
		// check explorion
		//if (Cat.matrix[x+1]
		var ary_found = new Array();
		findSame(ary_found, pos.x, pos.y);
		if (ary_found	.length>=3){
	//		var affected_col = new Array();
	//		Debug.Log("found "+ary_found.Count + " connected");
			var t:float = 0; 
			for (var i =0; i< ary_found.length; i++){
				
				// eleminate it
				//	ary_found[i].destroy();
				var o:Cat = ary_found[i];
	//			Debug.Log("cat "+ o.name+"["+o.mi_x+","+o.mi_y+"],time "+ o.time_connected+", t "+t+", now "+Time.time);	
				if (o.time_connected == 0){
					
					o.time_connected = Time.time;
					if (t != 0){
						
						o.time_offset = o.time_connected -t;
					}
	//				Debug.Log("time_offset="+o.time_offset+", time_connected="+o.time_connected);
					o.shakeAndExplode(3);
					
				}else{
	//				Debug.Log("t=o.time_connected= "+ o.time_connected);
					t = o.time_connected;
				}
				
		
				
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
			if (ary_found.length == 3)  // only the 3rd one trigger the explosion
				explode();
			else{
			
			}
			
		}
	}else{
		//explodeRow(mi_y);
	}

}
function explodeRow(y:int){
playAniOnce(CentralController.inst.texts_bomber, 1);
	playAniShake(3);
	yield WaitForSeconds(0.6*2);
	for (var i=0;i < CentralController.catrow_size;i++){
		var c:Cat = Cat.matrix[i, y];
		if (c != null){
		Debug.Log("blow  " +i);
			CentralController.inst.explodeBlack(c.gameObject.transform.position, c.gameObject.transform.rotation);
			c.removeByBomber();
		}
	}

}
function explode(){

	//yield WaitForSeconds(0.6*2-time_offset-(Time.time - time_connected));
	yield WaitForSeconds(0.6*2);
	
	// rescan and explode
	var ary_found = new Array();
	findSame(ary_found, mi_x, mi_y);
	if (ary_found	.length>=3){
		var x_sum = 0;
		var y_sum = 0;
		for (var i =0; i< ary_found.length; i++){
			var o:Cat = ary_found[i];
			x_sum += o.mi_x;
			y_sum += o.mi_y;
			CentralController.inst.explode(o.gameObject.transform.position, o.gameObject.transform.rotation);
			o.remove();
		}
		if (ary_found	.length	 > 3){
			var x = x_sum / ary_found.length;
			var y = y_sum /ary_found.length;
			var c:Cat = CentralController.inst.createCat(10, new Vector3(x-3, y+1, 1+CentralController.catrow_size-x));
			c.setStatus(1);
		}
	}else{
		time_connected = 0;
		time_offset = 0;
	}
	
	
}

function removeByBomber(){
	remove();
	blowAbove(0.5f);
}
function remove(){

	
	// show ani
//	var wt = 0.6*10-time_offset-(Time.time - time_connected);
//	Debug.Log("time offset " + time_offset+", wait time " + wt);
//	playAniShake(0);

	
	// do destroy
	status = 0;
	Cat.matrix[mi_x, mi_y] = null;
	CentralController.inst.UnspawnBall(gameObject);


	// update score
	CentralController.inst.score += 1;
	//Debug.Log("score "+ CentralController.inst.score);
	CentralController.inst.score_text.text = ""+CentralController.inst.score;
	// pull down above
	blowAbove(0);
	
}

function blowAbove(height:float){
	for (var j=mi_y+1; j< 10; j++){
		var c:Cat = Cat.matrix[mi_x,j];
		if (c != null){
			c.status = 1;
			Cat.matrix[mi_x,j]=null;
			c.transform.position = new Vector3( c.transform.position.x, c.transform.position.y+0.5f*j+height, c.transform.position.z); 
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
	if (self == null)
		return;
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


